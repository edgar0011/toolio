import { NAV_LINKS } from './nav.helpers'

class SiteNav extends HTMLElement {
  connectedCallback() {
    const currentPath = this.getAttribute('current') ?? '/'

    this.style.position = 'sticky'
    this.style.top = '0'
    this.style.zIndex = '50'
    this.style.display = 'block'

    this.innerHTML = `
      <nav class="text-toolio-white px-6 flex items-center justify-between bg-[linear-gradient(135deg,#002244_0%,#003366_50%,#0a4a7a_100%)] shadow-[0_4px_12px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.1)] py-[1.1rem] transition-[padding] duration-300 ease-out" data-nav>
        <a href="/" class="font-bold tracking-tight text-[1.75rem] transition-[font-size] duration-300 ease-out" data-logo>Toolio</a>
        <ul class="flex gap-6 list-none m-0 p-0">
          ${NAV_LINKS.map(
            (l) => `
            <li>
              <a href="${l.href}"
                 class="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-toolio-200 ${
                   currentPath === l.href
                     ? 'text-toolio-100 underline underline-offset-4'
                     : 'text-toolio-white/80'
                 }">
                ${l.icon}
                ${l.label}
              </a>
            </li>
          `,
          ).join('')}
        </ul>
      </nav>
    `

    const logo = this.querySelector('[data-logo]') as HTMLElement
    const nav = this.querySelector('[data-nav]') as HTMLElement
    let scrolled = false

    const onScroll = () => {
      const isScrolled = window.scrollY > 100
      if (isScrolled !== scrolled) {
        scrolled = isScrolled
        logo.style.fontSize = scrolled ? '1.4rem' : '1.75rem'
        nav.style.paddingTop = scrolled ? '0.65rem' : '1.1rem'
        nav.style.paddingBottom = scrolled ? '0.65rem' : '1.1rem'
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
  }
}

customElements.define('site-nav', SiteNav)
