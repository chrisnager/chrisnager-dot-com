import { mountApplication } from './ui/app.js'

const root = document.querySelector<HTMLDivElement>('#app')

if (!root) {
  throw new Error('App root element not found')
}

mountApplication(root)
