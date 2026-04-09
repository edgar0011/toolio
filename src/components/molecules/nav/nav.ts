import { NAV_LINKS } from './nav.helpers'

const SUN_ICON = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
const MOON_ICON = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`

class SiteNav extends HTMLElement {
  connectedCallback() {
    const currentPath = this.getAttribute('current') ?? '/'

    this.style.position = 'sticky'
    this.style.top = '0'
    this.style.zIndex = '50'
    this.style.display = 'block'

    this.innerHTML = `
      <nav class="text-t-text px-6 flex items-center justify-between bg-[var(--t-nav-bg)] backdrop-blur-md border-b border-[var(--t-border-nav)] py-[1.1rem] transition-[padding,background-color] duration-300 ease-out" data-nav>
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
          <button class="flex items-center justify-center w-8 h-8 rounded-lg text-t-text-secondary hover:text-t-text transition-colors duration-200 border border-transparent hover:border-[var(--t-border)]" data-theme-toggle aria-label="Toggle theme">
            ${this._isDark() ? SUN_ICON : MOON_ICON}
          </button>
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

    // Theme toggle
    const toggleBtn = this.querySelector('[data-theme-toggle]') as HTMLElement
    toggleBtn.addEventListener('click', () => {
      const isDark = this._isDark()
      const newTheme = isDark ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', newTheme)
      localStorage.setItem('theme', newTheme)
      toggleBtn.innerHTML = newTheme === 'dark' ? SUN_ICON : MOON_ICON
    })

    // Sync toggle icon when system theme changes (no stored preference)
    window.addEventListener('system-theme-change', ((e: CustomEvent) => {
      toggleBtn.innerHTML = e.detail.theme === 'dark' ? SUN_ICON : MOON_ICON
    }) as EventListener)
  }

  private _isDark(): boolean {
    const stored = localStorage.getItem('theme')
    if (stored) {
      return stored === 'dark'
    }
    return !window.matchMedia('(prefers-color-scheme: light)').matches
  }
}

customElements.define('site-nav', SiteNav)
