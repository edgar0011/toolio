class SiteNav extends HTMLElement {
  connectedCallback() {
    const currentPath = this.getAttribute('current') ?? '/'
    const links = [
      {
        href: '/',
        label: 'Home',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/></svg>`,
      },
      {
        href: '/tools',
        label: 'Tools',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
      },
      {
        href: '/docs',
        label: 'Docs',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`,
      },
      {
        href: '/about',
        label: 'About',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
      },
    ]

    this.style.position = 'sticky'
    this.style.top = '0'
    this.style.zIndex = '50'
    this.style.display = 'block'

    this.innerHTML = `
      <nav class="text-toolio-white px-6 flex items-center justify-between bg-[linear-gradient(135deg,#002244_0%,#003366_50%,#0a4a7a_100%)] shadow-[0_4px_12px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.1)] py-[1.1rem] transition-[padding] duration-300 ease-out" data-nav>
        <a href="/" class="font-bold tracking-tight text-[1.75rem] transition-[font-size] duration-300 ease-out" data-logo>Toolio</a>
        <ul class="flex gap-6 list-none m-0 p-0">
          ${links
            .map(
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
            )
            .join('')}
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
