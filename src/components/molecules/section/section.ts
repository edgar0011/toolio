class ContentSection extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('section-title') ?? ''
    const subtitle = this.getAttribute('section-subtitle') ?? ''
    const sectionIndex = parseInt(this.getAttribute('section-index') ?? '0')

    // Gradients with specific angles/stops need arbitrary Tailwind values
    const gradients = [
      'bg-[linear-gradient(135deg,#ffffff_0%,#e8eef5_50%,#dbe2e9_100%)]',
      'bg-[linear-gradient(135deg,#003366_0%,#0a4a7a_50%,#145e8e_100%)]',
      'bg-[linear-gradient(160deg,#ffffff_0%,#edf2f7_40%,#d0dce8_100%)]',
      'bg-[linear-gradient(145deg,#002244_0%,#003366_50%,#0d4f7a_100%)]',
      'bg-[linear-gradient(130deg,#fafcfe_0%,#e2eaf3_50%,#d3dfeb_100%)]',
      'bg-[linear-gradient(155deg,#003366_0%,#0a4a7a_40%,#1a6090_100%)]',
    ]
    const isDark = sectionIndex % 2 === 1
    const gradient = gradients[sectionIndex % gradients.length]
    const titleColor = isDark ? 'text-white' : 'text-toolio-dark'
    const subtitleColor = isDark ? 'text-toolio-200' : 'text-toolio-500'

    const children = this.innerHTML
    this.innerHTML = `
      <section class="flex items-center justify-center px-[4dvw] min-h-dvh pt-[6dvh] pb-[6dvh] snap-start ${gradient}">
        <div class="w-full max-w-7xl mx-auto">
          <div class="text-center mb-[5dvh] opacity-0 -translate-y-4 transition-all duration-600 ease-out" data-section-header>
            <h2 class="font-bold ${titleColor} text-[clamp(1.75rem,4dvw,3rem)] mb-[1dvh]">${title}</h2>
            <p class="${subtitleColor} max-w-2xl mx-auto text-[clamp(0.95rem,1.8dvw,1.25rem)]">${subtitle}</p>
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
