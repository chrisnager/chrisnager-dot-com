function readUint16(bytes: Uint8Array, offset: number) {
  return bytes[offset] | (bytes[offset + 1] << 8)
}

function readUint32(bytes: Uint8Array, offset: number) {
  return readUint16(bytes, offset) | (readUint16(bytes, offset + 2) << 16)
}

function decodeText(bytes: Uint8Array) {
  return new TextDecoder().decode(bytes)
}

async function inflateDeflateRaw(bytes: Uint8Array) {
  const normalizedBytes = new Uint8Array(bytes.byteLength)
  normalizedBytes.set(bytes)
  const stream = new Blob([normalizedBytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

function findEndOfCentralDirectory(bytes: Uint8Array) {
  for (let offset = bytes.length - 22; offset >= 0; offset -= 1) {
    if (
      bytes[offset] === 0x50 &&
      bytes[offset + 1] === 0x4b &&
      bytes[offset + 2] === 0x05 &&
      bytes[offset + 3] === 0x06
    ) {
      return offset
    }
  }

  throw new Error('ZIP end of central directory not found')
}

export async function extractZipEntry(archiveBytes: Uint8Array, fileName: string) {
  const endOfCentralDirectory = findEndOfCentralDirectory(archiveBytes)
  const entryCount = readUint16(archiveBytes, endOfCentralDirectory + 10)
  let cursor = readUint32(archiveBytes, endOfCentralDirectory + 16)

  for (let index = 0; index < entryCount; index += 1) {
    const signature = readUint32(archiveBytes, cursor)

    if (signature !== 0x02014b50) {
      throw new Error('Invalid ZIP central directory entry')
    }

    const compressionMethod = readUint16(archiveBytes, cursor + 10)
    const compressedSize = readUint32(archiveBytes, cursor + 20)
    const fileNameLength = readUint16(archiveBytes, cursor + 28)
    const extraLength = readUint16(archiveBytes, cursor + 30)
    const commentLength = readUint16(archiveBytes, cursor + 32)
    const localHeaderOffset = readUint32(archiveBytes, cursor + 42)
    const entryName = decodeText(archiveBytes.slice(cursor + 46, cursor + 46 + fileNameLength))

    cursor += 46 + fileNameLength + extraLength + commentLength

    if (entryName !== fileName) {
      continue
    }

    const localSignature = readUint32(archiveBytes, localHeaderOffset)

    if (localSignature !== 0x04034b50) {
      throw new Error(`Invalid ZIP local header for ${fileName}`)
    }

    const localFileNameLength = readUint16(archiveBytes, localHeaderOffset + 26)
    const localExtraLength = readUint16(archiveBytes, localHeaderOffset + 28)
    const dataStart = localHeaderOffset + 30 + localFileNameLength + localExtraLength
    const data = archiveBytes.slice(dataStart, dataStart + compressedSize)

    if (compressionMethod === 0) {
      return data
    }

    if (compressionMethod === 8) {
      return inflateDeflateRaw(data)
    }

    throw new Error(`Unsupported ZIP compression method for ${fileName}: ${compressionMethod}`)
  }

  throw new Error(`Could not find ${fileName} in archive`)
}
