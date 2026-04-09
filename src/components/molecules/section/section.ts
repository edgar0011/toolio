class ContentSection extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('section-title') ?? ''
    const subtitle = this.getAttribute('section-subtitle') ?? ''
    const sectionIndex = parseInt(this.getAttribute('section-index') ?? '0')

    // Even = primary (page bg), Odd = alt (contrast bg)
    const isPrimary = sectionIndex % 2 === 0
    const sectionBg = isPrimary ? 'bg-t-bg' : 'bg-t-bg-alt'
    const titleColor = isPrimary ? 'text-t-text-heading' : 'text-t-text-heading-alt'
    const subtitleColor = 'text-t-text-secondary'

    const children = this.innerHTML
    this.innerHTML = `
      <section class="flex items-center justify-center px-[4dvw] min-h-dvh pt-[6dvh] pb-[6dvh] snap-start ${sectionBg}" data-section-primary="${isPrimary}">
        <div class="w-full max-w-7xl mx-auto">
          <div class="text-center mb-[5dvh] opacity-0 -translate-y-4 transition-all duration-600 ease-out" data-section-header>
            <h2 class="${titleColor} text-[clamp(2rem,4dvw,3rem)] font-normal leading-[1.0] tracking-[-1px] mb-[1.5dvh]">${title}</h2>
            <p class="${subtitleColor} max-w-2xl mx-auto text-[clamp(0.95rem,1.8dvw,1.25rem)] leading-[1.4] tracking-[-0.16px]">${subtitle}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2dvw,2rem)]">
            ${children}
          </div>
        </div>
      </section>
    `

    const section = this.querySelector('section')!
    const header = this.querySelector('[data-section-header]') as HTMLElement
    const cards = this.querySelectorAll('content-square')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            header.style.opacity = '1'
            header.style.transform = 'translateY(0)'

            cards.forEach((card, i) => {
              setTimeout(
                () => {
                  const inner = card.querySelector('div') as HTMLElement
                  if (inner) {
                    inner.style.opacity = '1'
                    inner.style.transform = 'translateY(0)'
                  }
                },
                150 + i * 100,
              )
            })

            observer.disconnect()
          }
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(section)
  }
}

customElements.define('content-section', ContentSection)
