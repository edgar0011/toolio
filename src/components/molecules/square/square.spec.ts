import './square'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { COLOR_MAP, ICONS } from './square.helpers'

describe('ContentSquare', () => {
  let el: HTMLElement
  let section: HTMLElement

  beforeEach(() => {
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
    expect(iconSlot!.querySelector('svg')).toBeTruthy()
  })

  it('does not render icon slot when icon is missing', () => {
    el.setAttribute('heading', 'No Icon')
    el.setAttribute('text', 'Desc')
    document.body.appendChild(section)

    const iconSlot = el.querySelector('[data-icon-slot]')
    expect(iconSlot).toBeNull()
  })

  it('uses primary theme for even section index', () => {
    section.setAttribute('section-index', '0')
    el.setAttribute('heading', 'Primary')
    el.setAttribute('text', 'Desc')
    document.body.appendChild(section)

    const card = el.querySelector('[data-card]')
    expect(card!.className).toContain('bg-t-surface')
    expect(card!.className).toContain('border-t-border')

    const h3 = el.querySelector('h3')
    expect(h3!.className).toContain('text-t-text-heading')
  })

  it('uses alt theme for odd section index', () => {
    section.setAttribute('section-index', '1')
    el.setAttribute('heading', 'Alt')
    el.setAttribute('text', 'Desc')
    document.body.appendChild(section)

    const card = el.querySelector('[data-card]')
    expect(card!.className).toContain('bg-t-surface-alt')
  })

  it('renders card with initial hidden styles for animation', () => {
    el.setAttribute('heading', 'Animated')
    el.setAttribute('text', 'Desc')
    document.body.appendChild(section)

    const card = el.querySelector('[data-card]')
    expect(card!.className).toContain('opacity-0')
    expect(card!.className).toContain('-translate-y-8')
  })

  it('applies hover transform on mouseenter and resets on mouseleave', () => {
    el.setAttribute('heading', 'Hover')
    el.setAttribute('text', 'Desc')
    document.body.appendChild(section)

    const card = el.querySelector('[data-card]') as HTMLElement
    card.dispatchEvent(new Event('mouseenter'))
    expect(card.style.transform).toBe('translateY(-6px)')
    expect(card.style.boxShadow).toBe('var(--t-shadow-hover)')

    card.dispatchEvent(new Event('mouseleave'))
    expect(card.style.transform).toBe('translateY(0)')
    expect(card.style.boxShadow).toBe('var(--t-shadow-rest)')
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
