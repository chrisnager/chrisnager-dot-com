export function renderLandingPage(root: HTMLDivElement, options: { playUrl: string }) {
  window.location.replace(options.playUrl)
  root.innerHTML = ''
}
