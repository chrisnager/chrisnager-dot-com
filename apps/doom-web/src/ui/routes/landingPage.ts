export function renderLandingPage(root: HTMLDivElement, options: { playUrl: string }) {
  root.innerHTML = `
    <main class="landing-shell">
      <section class="landing-hero panel">
        <p class="eyebrow">DOOM MCP</p>
        <h1>Playable DOOM in a browser page or inline MCP app.</h1>
        <p class="lede">
          This build uses <code>cloudflare/doom-wasm</code> as the runtime layer, defaults to Freedoom Phase 1,
          and signs a launch URL that can open either the standalone <code>/doom/play</code> route or an MCP app view.
        </p>
        <div class="landing-actions">
          <a class="button button-primary" href="${options.playUrl}">Launch Demo Session</a>
          <a class="button button-secondary" href="${options.playUrl}">Open Play Route</a>
        </div>
      </section>
      <section class="landing-grid">
        <article class="panel">
          <h2>What ships now</h2>
          <ul>
            <li>Signed DOOM session creation through MCP</li>
            <li>Inline MCP app canvas for hosts that support it</li>
            <li>Browser fallback at <code>/doom/play?token=...</code></li>
            <li>Freedoom Phase 1 as the default bundled content</li>
          </ul>
        </article>
        <article class="panel">
          <h2>Why Freedoom by default</h2>
          <ul>
            <li>No commercial DOOM IWADs are committed or bundled</li>
            <li>Freedoom keeps the demo legally redistributable</li>
            <li>The content source can later be swapped per signed session</li>
          </ul>
        </article>
      </section>
    </main>
  `
}
