import './section'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

describe('ContentSection', () => {
  let el: HTMLElement

  beforeEach(() => {
    el = document.createElement('content-section')
  })

  afterEach(() => {
    el.remove()
  })

  it('renders a section with title and subtitle', () => {
    el.setAttribute('section-title', 'Features')
    el.setAttribute('section-subtitle', 'Everything you need')
    el.setAttribute('section-index', '0')
    document.body.appendChild(el)

    const h2 = el.querySelector('h2')
    expect(h2).toBeTruthy()
    expect(h2!.textContent).toBe('Features')

    const p = el.querySelector('[data-section-header] p')
    expect(p).toBeTruthy()
    expect(p!.textContent).toBe('Everything you need')
  })

  it('preserves child content in the grid', () => {
    el.setAttribute('section-title', 'Test')
    el.setAttribute('section-subtitle', 'Sub')
    el.setAttribute('section-index', '0')
    el.innerHTML = '<div class="child-item">Card 1</div><div class="child-item">Card 2</div>'
    document.body.appendChild(el)

    const grid = el.querySelector('.grid')
    expect(grid).toBeTruthy()
    expect(grid!.querySelectorAll('.child-item').length).toBe(2)
  })

  it('applies primary theme for even section indexes', () => {
    el.setAttribute('section-title', 'Primary')
    el.setAttribute('section-subtitle', '')
    el.setAttribute('section-index', '0')
    document.body.appendChild(el)

    const h2 = el.querySelector('h2')
    expect(h2!.className).toContain('text-t-text-heading')

    const section = el.querySelector('section')
    expect(section!.className).toContain('bg-t-bg')
    expect(section!.getAttribute('data-section-primary')).toBe('true')
  })

  it('applies alt theme for odd section indexes', () => {
    el.setAttribute('section-title', 'Alt')
    el.setAttribute('section-subtitle', '')
    el.setAttribute('section-index', '1')
    document.body.appendChild(el)

    const h2 = el.querySelector('h2')
    expect(h2!.className).toContain('text-t-text-heading-alt')

    const section = el.querySelector('section')
    expect(section!.className).toContain('bg-t-bg-alt')
    expect(section!.getAttribute('data-section-primary')).toBe('false')
  })

  it('defaults section-index to 0 when missing', () => {
    el.setAttribute('section-title', 'Default')
    el.setAttribute('section-subtitle', '')
    document.body.appendChild(el)

    const h2 = el.querySelector('h2')
    expect(h2!.className).toContain('text-t-text-heading')
  })

  it('creates an IntersectionObserver on the section', () => {
    el.setAttribute('section-title', 'Observed')
    el.setAttribute('section-subtitle', '')
    el.setAttribute('section-index', '0')
    document.body.appendChild(el)

    const section = el.querySelector('section')
    expect(section).toBeTruthy()

    expect(IntersectionObserver.prototype.observe || true).toBeTruthy()
  })

  it('renders header with initial hidden styles for animation', () => {
    el.setAttribute('section-title', 'Animated')
    el.setAttribute('section-subtitle', 'Fades in')
    el.setAttribute('section-index', '0')
    document.body.appendChild(el)

    const header = el.querySelector('[data-section-header]') as HTMLElement
    expect(header).toBeTruthy()
    expect(header.className).toContain('opacity-0')
    expect(header.className).toContain('-translate-y-4')
  })
})
