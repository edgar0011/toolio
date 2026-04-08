import './square'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { COLOR_MAP, ICONS } from './square.helpers'

describe('ContentSquare', () => {
  let el: HTMLElement
  let section: HTMLElement

  beforeEach(() => {
    // ContentSquare reads section-index from its parent content-section
    section = document.createElement('content-section')
    section.setAttribute('section-index', '0')
    el = document.createElement('content-square')
    section.appendChild(el)
  })

  afterEach(() => {
    section.remove()
  })

  it('renders heading and text', () => {
    el.setAttribute('heading', 'Fast Setup')
    el.setAttribute('text', 'Get started in minutes')
    document.body.appendChild(section)

    const h3 = el.querySelector('h3')
    expect(h3).toBeTruthy()
    expect(h3!.textContent).toBe('Fast Setup')

    const p = el.querySelector('p')
    expect(p).toBeTruthy()
    expect(p!.textContent).toBe('Get started in minutes')
  })

  it('renders icon slot when icon attribute is set', () => {
    el.setAttribute('heading', 'Test')
    el.setAttribute('text', 'Desc')
    el.setAttribute('icon', 'rocket')
    document.body.appendChild(section)

    const iconSlot = el.querySelector('[data-icon-slot]')
    expect(iconSlot).toBeTruthy()
    // Lucide createElement appends an SVG
    expect(iconSlot!.querySelector('svg')).toBeTruthy()
  })

  it('does not render icon slot when icon is missing', () => {
    el.setAttribute('heading', 'No Icon')
    el.setAttribute('text', 'Desc')
    document.body.appendChild(section)

    const iconSlot = el.querySelector('[data-icon-slot]')
    expect(iconSlot).toBeNull()
  })

  it('applies color scheme from COLOR_MAP', () => {
    el.setAttribute('heading', 'Colored')
    el.setAttribute('text', 'Desc')
    el.setAttribute('color', 'violet')
    document.body.appendChild(section)

    const h3 = el.querySelector('h3')
    expect(h3!.getAttribute('style')).toContain(COLOR_MAP.violet.title)

    const iconSlot = el.querySelector('[data-icon-slot]')
    // No icon set, so no icon slot
    expect(iconSlot).toBeNull()
  })

  it('applies color to icon background when both icon and color are set', () => {
    el.setAttribute('heading', 'Both')
    el.setAttribute('text', 'Desc')
    el.setAttribute('icon', 'zap')
    el.setAttribute('color', 'teal')
    document.body.appendChild(section)

    const iconSlot = el.querySelector('[data-icon-slot]') as HTMLElement
    // jsdom sets inline styles via the `style` attribute, check the raw attribute
    const styleAttr = iconSlot.getAttribute('style') ?? ''
    expect(styleAttr).toContain(COLOR_MAP.teal.bg)
    expect(styleAttr).toContain(COLOR_MAP.teal.icon)
  })

  it('uses light theme defaults for even section index', () => {
    section.setAttribute('section-index', '0')
    el.setAttribute('heading', 'Light')
    el.setAttribute('text', 'Desc')
    document.body.appendChild(section)

    const card = el.querySelector('[data-card]')
    expect(card!.className).toContain('bg-white')
    expect(card!.className).not.toContain('bg-white/')

    const p = el.querySelector('p')
    expect(p!.className).toContain('text-toolio-500')
  })

  it('uses dark theme defaults for odd section index', () => {
    section.setAttribute('section-index', '1')
    el.setAttribute('heading', 'Dark')
    el.setAttribute('text', 'Desc')
    document.body.appendChild(section)

    const card = el.querySelector('[data-card]')
    expect(card!.className).toContain('bg-white/[0.08]')

    const p = el.querySelector('p')
    expect(p!.className).toContain('text-toolio-200')
  })

  it('renders card with initial hidden styles for animation', () => {
    el.setAttribute('heading', 'Animated')
    el.setAttribute('text', 'Desc')
    document.body.appendChild(section)

    const card = el.querySelector('[data-card]')
    expect(card!.className).toContain('opacity-0')
    expect(card!.className).toContain('-translate-y-5')
  })

  it('applies hover transform on mouseenter and resets on mouseleave', () => {
    el.setAttribute('heading', 'Hover')
    el.setAttribute('text', 'Desc')
    document.body.appendChild(section)

    const card = el.querySelector('[data-card]') as HTMLElement
    card.dispatchEvent(new Event('mouseenter'))
    expect(card.style.transform).toBe('translateY(-4px)')

    card.dispatchEvent(new Event('mouseleave'))
    expect(card.style.transform).toBe('translateY(0)')
  })
})

describe('square.helpers', () => {
  it('ICONS map contains expected icon keys', () => {
    expect(ICONS.rocket).toBeDefined()
    expect(ICONS.zap).toBeDefined()
    expect(ICONS.shield).toBeDefined()
    expect(ICONS.users).toBeDefined()
  })

  it('COLOR_MAP has all expected colors', () => {
    const expectedColors = ['violet', 'teal', 'blue', 'amber', 'rose', 'gray']
    for (const color of expectedColors) {
      expect(COLOR_MAP[color]).toBeDefined()
      expect(COLOR_MAP[color].icon).toBeTruthy()
      expect(COLOR_MAP[color].bg).toBeTruthy()
      expect(COLOR_MAP[color].title).toBeTruthy()
    }
  })
})
