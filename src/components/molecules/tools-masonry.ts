class ToolsMasonry extends HTMLElement {
  private _resizeObserver: ResizeObserver | null = null
  private _allCards: HTMLElement[] = []
  private _categories: string[] = []
  private _activeCategory = ''
  private _searchQuery = ''

  connectedCallback() {
    const title = this.getAttribute('section-title') ?? ''
    const subtitle = this.getAttribute('section-subtitle') ?? ''

    const children = this.innerHTML
    this.innerHTML = `
      <section class="px-[4dvw] pt-[clamp(5rem,10dvh,8rem)] pb-[6dvh] bg-[linear-gradient(135deg,#ffffff_0%,#e8eef5_50%,#dbe2e9_100%)] min-h-dvh">
        <div class="w-full max-w-[90rem] mx-auto">
          <div class="text-center mb-[3dvh] opacity-0 -translate-y-4 transition-all duration-600 ease-out" data-section-header>
            <h2 class="font-bold text-toolio-dark text-[clamp(1.75rem,4dvw,3rem)] mb-[1dvh]">${title}</h2>
            <p class="text-toolio-500 max-w-2xl mx-auto text-[clamp(0.95rem,1.8dvw,1.25rem)]">${subtitle}</p>
          </div>

          <div class="max-w-xl mx-auto mb-[1.5dvh] relative" data-search-wrap>
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-toolio-400 pointer-events-none transition-colors duration-200" data-search-icon fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              type="text"
              placeholder="Search 120 tools…"
              class="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white/80 backdrop-blur border border-toolio-100 text-toolio-dark placeholder-toolio-400 text-[clamp(0.85rem,1.4dvw,1rem)] shadow-[0_2px_8px_rgba(0,51,102,0.06)] outline-none transition-all duration-200 focus:border-toolio-500 focus:shadow-[0_4px_16px_rgba(0,51,102,0.12)] focus:bg-white"
              data-search
            />
            <button class="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center text-toolio-400 hover:text-toolio-600 hover:bg-toolio-100 transition-all duration-150 opacity-0 pointer-events-none" data-clear>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            <kbd class="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-toolio-100/80 text-toolio-400 text-[0.65rem] font-mono pointer-events-none" data-kbd>/</kbd>
          </div>

          <div class="flex flex-wrap justify-center gap-2 mb-[3dvh]" data-filters></div>

          <div class="flex items-center justify-between mb-5">
            <span class="text-toolio-400 text-[clamp(0.75rem,1.2dvw,0.85rem)]" data-count></span>
          </div>

          <div class="relative" data-masonry>
            ${children}
          </div>
        </div>
      </section>
    `

    const header = this.querySelector('[data-section-header]') as HTMLElement
    requestAnimationFrame(() => {
      header.style.opacity = '1'
      header.style.transform = 'translateY(0)'
    })

    this._allCards = Array.from(this.querySelectorAll<HTMLElement>('tool-card'))

    // Collect unique categories
    const catSet = new Set<string>()
    for (const card of this._allCards) {
      const cat = card.getAttribute('category') ?? ''
      if (cat) {
        catSet.add(cat)
      }
    }
    this._categories = Array.from(catSet).sort()
    this._renderFilters()

    // Search input
    const input = this.querySelector('[data-search]') as HTMLInputElement
    const clearBtn = this.querySelector('[data-clear]') as HTMLElement
    const kbd = this.querySelector('[data-kbd]') as HTMLElement
    const searchIcon = this.querySelector('[data-search-icon]') as HTMLElement

    input.addEventListener('input', () => {
      this._searchQuery = input.value.trim().toLowerCase()
      const hasValue = input.value.length > 0
      clearBtn.style.opacity = hasValue ? '1' : '0'
      clearBtn.style.pointerEvents = hasValue ? 'auto' : 'none'
      if (kbd) {
        kbd.style.display = hasValue ? 'none' : ''
      }
      searchIcon.style.color = hasValue ? 'var(--color-toolio-600)' : ''
      this._filter()
    })

    clearBtn.addEventListener('click', () => {
      input.value = ''
      this._searchQuery = ''
      clearBtn.style.opacity = '0'
      clearBtn.style.pointerEvents = 'none'
      if (kbd) {
        kbd.style.display = ''
      }
      searchIcon.style.color = ''
      input.focus()
      this._filter()
    })

    // Keyboard shortcut: "/" to focus search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== input) {
        e.preventDefault()
        input.focus()
      }
      if (e.key === 'Escape' && document.activeElement === input) {
        input.blur()
      }
    })

    // Run layout after cards have rendered
    requestAnimationFrame(() => {
      requestAnimationFrame(() => this._filter())
    })

    // Re-layout on resize
    this._resizeObserver = new ResizeObserver(() => this._layout())
    this._resizeObserver.observe(this.querySelector('[data-masonry]')!)
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect()
  }

  private _renderFilters() {
    const container = this.querySelector('[data-filters]') as HTMLElement
    const pills = [
      { label: 'All', value: '' },
      ...this._categories.map((c) => ({
        label: c.charAt(0).toUpperCase() + c.slice(1),
        value: c,
      })),
    ]

    container.innerHTML = pills
      .map(
        (p) => `
      <button
        class="px-4 py-1.5 rounded-full text-[clamp(0.7rem,1.1dvw,0.8rem)] font-medium transition-all duration-200 border"
        data-filter="${p.value}"
      >${p.label}</button>
    `,
      )
      .join('')

    this._updateFilterStyles()

    container.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('[data-filter]') as HTMLElement
      if (!btn) {
        return
      }
      this._activeCategory = btn.dataset.filter ?? ''
      this._updateFilterStyles()
      this._filter()
    })
  }

  private _updateFilterStyles() {
    const buttons = this.querySelectorAll<HTMLElement>('[data-filter]')
    for (const btn of buttons) {
      const isActive = btn.dataset.filter === this._activeCategory
      if (isActive) {
        btn.className =
          'px-4 py-1.5 rounded-full text-[clamp(0.7rem,1.1dvw,0.8rem)] font-medium transition-all duration-200 border border-toolio-600 bg-toolio-dark text-white shadow-[0_2px_8px_rgba(0,51,102,0.2)]'
      } else {
        btn.className =
          'px-4 py-1.5 rounded-full text-[clamp(0.7rem,1.1dvw,0.8rem)] font-medium transition-all duration-200 border border-toolio-100 bg-white/60 text-toolio-500 hover:border-toolio-300 hover:text-toolio-dark hover:bg-white'
      }
    }
  }

  private _filter() {
    const query = this._searchQuery
    const category = this._activeCategory
    let visible = 0

    for (const card of this._allCards) {
      const heading = (card.getAttribute('heading') ?? '').toLowerCase()
      const cat = card.getAttribute('category') ?? ''

      const matchesSearch = !query || heading.includes(query)
      const matchesCategory = !category || cat === category
      const show = matchesSearch && matchesCategory

      card.style.display = show ? '' : 'none'
      if (show) {
        visible++
      }
    }

    // Update count
    const countEl = this.querySelector('[data-count]') as HTMLElement
    if (countEl) {
      const total = this._allCards.length
      countEl.textContent = visible === total ? `${total} tools` : `${visible} of ${total} tools`
    }

    this._layout()
  }

  private _layout() {
    const container = this.querySelector('[data-masonry]') as HTMLElement
    if (!container) {
      return
    }

    const cards = this._allCards.filter((c) => c.style.display !== 'none')

    if (cards.length === 0) {
      container.style.height = '0px'
      return
    }

    const containerWidth = container.offsetWidth
    const gap = Math.min(Math.max(containerWidth * 0.015, 12), 16)

    let cols = 1
    if (containerWidth >= 1280) {
      cols = 5
    } else if (containerWidth >= 1024) {
      cols = 4
    } else if (containerWidth >= 768) {
      cols = 3
    } else if (containerWidth >= 640) {
      cols = 2
    }

    const colWidth = (containerWidth - gap * (cols - 1)) / cols
    const colHeights = Array.from({ length: cols }, () => 0)

    // Prepare for measurement
    for (const card of cards) {
      card.style.position = 'absolute'
      card.style.width = `${colWidth}px`
      card.style.visibility = 'hidden'
      card.style.left = '0'
      card.style.top = '0'
    }

    const heights = cards.map((card) => card.offsetHeight)

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      const shortestCol = colHeights.indexOf(Math.min(...colHeights))
      const x = shortestCol * (colWidth + gap)
      const y = colHeights[shortestCol]

      card.style.left = `${x}px`
      card.style.top = `${y}px`
      card.style.visibility = ''

      colHeights[shortestCol] = y + heights[i] + gap
    }

    const maxH = Math.max(...colHeights)
    container.style.height = `${maxH > gap ? maxH - gap : 0}px`

    // Fade-in with IntersectionObserver (only once per card)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const inner = entry.target.querySelector('[data-card]') as HTMLElement
            if (inner) {
              inner.style.opacity = '1'
              inner.style.transform = 'translateY(0)'
            }
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '50px' },
    )

    for (const card of cards) {
      const inner = card.querySelector('[data-card]') as HTMLElement
      if (inner && inner.style.opacity !== '1') {
        observer.observe(card)
      }
    }
  }
}

customElements.define('tools-masonry', ToolsMasonry)
