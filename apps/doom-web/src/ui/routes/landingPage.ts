export function renderLandingPage(root: HTMLDivElement, options: { playUrl: string }) {
  root.innerHTML = `
    <main class="landing-shell">
      <section class="landing-hero panel">
        <p class="eyebrow">DOOM MCP / Phase 1</p>
        <h1>Browser-playable DOOM shell, ready for later MCP session orchestration.</h1>
        <p class="lede">
          This build uses <code>cloudflare/doom-wasm</code> as the runtime layer, defaults to Freedoom Phase 1,
          and keeps the launch/session seams explicit so a future MCP server can mint signed URLs instead of hard-coded demos.
        </p>
        <div class="landing-actions">
          <a class="button button-primary" href="${options.playUrl}">Launch Demo Session</a>
          <a class="button button-secondary" href="${options.playUrl}">Open Play Route</a>
        </div>
      </section>
      <section class="landing-grid">
        <article class="panel">
          <h2>What ships in Phase 1</h2>
          <ul>
            <li>Responsive iframe-friendly play shell</li>
            <li>Stable adapter interface for engine glue</li>
            <li>Fake session bootstrap from the query string</li>
            <li>Placeholder launch and save/load seams for MCP later</li>
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
