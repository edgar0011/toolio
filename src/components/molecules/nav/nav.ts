import { NAV_LINKS } from './nav.helpers'

class SiteNav extends HTMLElement {
  connectedCallback() {
    const currentPath = this.getAttribute('current') ?? '/'

    this.style.position = 'sticky'
    this.style.top = '0'
    this.style.zIndex = '50'
    this.style.display = 'block'

    this.innerHTML = `
      <nav class="text-runway-white px-6 flex items-center justify-between bg-runway-black/80 backdrop-blur-md border-b border-runway-border/50 py-[1.1rem] transition-[padding,background-color] duration-300 ease-out" data-nav>
        <a href="/" class="font-medium tracking-[-0.5px] text-[1.5rem] transition-[font-size] duration-300 ease-out text-runway-white" data-logo>Toolio</a>
        <ul class="flex gap-6 list-none m-0 p-0">
          ${NAV_LINKS.map(
            (l) => `
            <li>
              <a href="${l.href}"
                 class="flex items-center gap-1.5 text-sm font-normal tracking-[-0.16px] transition-colors hover:text-runway-white ${
                   currentPath === l.href ? 'text-runway-white' : 'text-runway-slate'
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
        logo.style.fontSize = scrolled ? '1.25rem' : '1.5rem'
        nav.style.paddingTop = scrolled ? '0.65rem' : '1.1rem'
        nav.style.paddingBottom = scrolled ? '0.65rem' : '1.1rem'
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
  }
}

customElements.define('site-nav', SiteNav)
