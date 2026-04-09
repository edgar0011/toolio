import './nav'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { NAV_LINKS } from './nav.helpers'

describe('SiteNav', () => {
  let el: HTMLElement

  beforeEach(() => {
    el = document.createElement('site-nav')
  })

  afterEach(() => {
    el.remove()
  })

  it('renders a nav element with logo', () => {
    document.body.appendChild(el)

    const nav = el.querySelector('nav')
    expect(nav).toBeTruthy()

    const logo = el.querySelector('[data-logo]')
    expect(logo).toBeTruthy()
    expect(logo!.textContent).toBe('Toolio')
    expect(logo!.getAttribute('href')).toBe('/')
  })

  it('renders all nav links', () => {
    document.body.appendChild(el)

    const links = el.querySelectorAll('ul a')
    expect(links.length).toBe(NAV_LINKS.length)

    NAV_LINKS.forEach((navLink, i) => {
      expect(links[i].getAttribute('href')).toBe(navLink.href)
      expect(links[i].textContent).toContain(navLink.label)
    })
  })

  it('highlights the current path link', () => {
    el.setAttribute('current', '/tools')
    document.body.appendChild(el)

    const links = el.querySelectorAll('ul a')
    const toolsLink = Array.from(links).find((a) => a.getAttribute('href') === '/tools')
    const homeLink = Array.from(links).find((a) => a.getAttribute('href') === '/')

    // Active link uses text-t-text, inactive uses text-t-text-secondary
    expect(toolsLink!.className).toContain('text-t-text')
    expect(homeLink!.className).toContain('text-t-text-secondary')
  })

  it('defaults current path to / when not set', () => {
    document.body.appendChild(el)

    const links = el.querySelectorAll('ul a')
    const homeLink = Array.from(links).find((a) => a.getAttribute('href') === '/')

    expect(homeLink!.className).not.toContain('text-t-text-secondary')
  })

  it('sets sticky positioning styles', () => {
    document.body.appendChild(el)

    expect(el.style.position).toBe('sticky')
    expect(el.style.top).toBe('0px')
    expect(el.style.zIndex).toBe('50')
    expect(el.style.display).toBe('block')
  })

  it('registers a scroll listener', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    document.body.appendChild(el)

    const scrollCall = addSpy.mock.calls.find(([event]) => event === 'scroll')
    expect(scrollCall).toBeTruthy()
    expect(scrollCall![2]).toEqual({ passive: true })

    addSpy.mockRestore()
  })

  it('does not render a theme toggle button', () => {
    document.body.appendChild(el)

    const toggleBtn = el.querySelector('[data-theme-toggle]')
    expect(toggleBtn).toBeNull()
  })
})

describe('NAV_LINKS', () => {
  it('contains 4 links with required properties', () => {
    expect(NAV_LINKS).toHaveLength(4)

    for (const link of NAV_LINKS) {
      expect(link.href).toBeTruthy()
      expect(link.label).toBeTruthy()
      expect(link.icon).toContain('<svg')
    }
  })

  it('includes Home, Tools, Docs, About', () => {
    const labels = NAV_LINKS.map((l) => l.label)
    expect(labels).toEqual(['Home', 'Tools', 'Docs', 'About'])
  })
})
