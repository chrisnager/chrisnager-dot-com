import { buildLaunchUrl } from '../session/launchUrl.js'
import { createRouter } from './router.js'
import { renderLandingPage } from './routes/landingPage.js'
import { renderPlayPage } from './routes/playPage.js'

export function mountApplication(root: HTMLDivElement) {
  const router = createRouter()

  const render = async () => {
    const route = await router.getCurrentRoute()

    if (route.type === 'landing') {
      renderLandingPage(root, {
        playUrl: buildLaunchUrl({
          sessionToken: 'demo123',
        }),
      })
      return
    }

    await renderPlayPage(root, route)
  }

  window.addEventListener('popstate', () => {
    void render()
  })

  void render()
}
