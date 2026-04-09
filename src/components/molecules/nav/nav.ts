// Deep import to avoid pulling in React via the es-kit/utils barrel
import {
  observeThemePreference,
  setThemeClassNames,
} from '@e1011/es-kit/dist/utils/esm/src/core/utils/helpers/ui.js'

import { NAV_LINKS } from './nav.helpers'

// Configure theme class names on documentElement (must match the element passed to observeThemePreference)
setThemeClassNames({ dark: 'dark', light: 'light' }, document.documentElement)

class SiteNav extends HTMLElement {
  private _cleanupObserver: (() => void) | null = null

  connectedCallback() {
    const currentPath = this.getAttribute('current') ?? '/'

    this.style.position = 'sticky'
    this.style.top = '0'
    this.style.zIndex = '50'
    this.style.display = 'block'

    this.innerHTML = `
      <nav class="text-t-text px-6 flex items-center justify-between bg-[var(--t-nav-bg)] backdrop-blur-md border-b border-[var(--t-border-nav)] py-[1.1rem] transition-[padding,background-color] duration-300 ease-out shadow-[var(--t-shadow-nav)]" data-nav>
        <a href="/" class="font-medium tracking-[-0.5px] text-[1.5rem] transition-[font-size] duration-300 ease-out text-t-text" data-logo>Toolio</a>
        <div class="flex items-center gap-6">
          <ul class="flex gap-6 list-none m-0 p-0">
            ${NAV_LINKS.map(
              (l) => `
              <li>
                <a href="${l.href}"
                   class="flex items-center gap-1.5 text-sm font-normal tracking-[-0.16px] transition-colors hover:text-t-text ${
                     currentPath === l.href ? 'text-t-text' : 'text-t-text-secondary'
                   }">
                  ${l.icon}
                  ${l.label}
                </a>
              </li>
            `,
            ).join('')}
          </ul>
        </div>
      </nav>
    `

    const logo = this.querySelector('[data-logo]') as HTMLElement
    const nav = this.querySelector('[data-nav]') as HTMLElement
    let scrolled = false

    const onScroll = () => {
      const isScrolled = window.scrollY > 100
      if (isScrolled !== scrolled) {
        scrolled = isScrolled
        logo.style.fontSize = scrolled ? '1.25rem' : '1.5rem'
        nav.style.paddingTop = scrolled ? '0.65rem' : '1.1rem'
        nav.style.paddingBottom = scrolled ? '0.65rem' : '1.1rem'
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // Observe system preference and apply theme automatically
    this._cleanupObserver = observeThemePreference(() => document.documentElement)
  }

  disconnectedCallback() {
    this._cleanupObserver?.()
  }
}

customElements.define('site-nav', SiteNav)
