export function getDoomBasePath(pathname: string = window.location.pathname) {
  return pathname === '/doom' || pathname.startsWith('/doom/') ? '/doom' : ''
}

export function buildDoomPath(path: string, pathname?: string) {
  return `${getDoomBasePath(pathname)}${path}`
}
