# Legal Notes

This Phase 1 app does not bundle commercial id Software DOOM IWAD files.

## Why commercial IWADs are excluded

- Original DOOM and DOOM II IWADs are proprietary game data.
- Redistributing those IWADs in this repository or in a public web build would require rights this project does not claim.
- `cloudflare/doom-wasm` is an engine/runtime layer, not a license grant for commercial game assets.

## What Phase 1 uses instead

- The default playable content is Freedoom Phase 1.
- Freedoom is a free/libre replacement IWAD designed to work with DOOM-compatible engines.
- This repository includes `freedoom1.wad` extracted from the official Freedoom 0.13.0 release so the Phase 1 browser app can boot without depending on a remote content fetch at play time.

## Future commercial support

If a later phase supports user-supplied or account-linked commercial IWADs, it should:

- require the user or platform to provide licensed content
- keep commercial IWAD delivery outside the public repo
- validate entitlement server-side before issuing any signed launch URL
