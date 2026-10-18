import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { markFontsReady } from './lib/utils/fontsReady.js'

markFontsReady()

// scripts/prerender.mjs leaves a snapshot for crawlers without JavaScript; React starts from an empty root
const root = document.getElementById('root')
if (root.hasAttribute('data-prerendered')) {
  root.replaceChildren()
  root.removeAttribute('data-prerendered')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
