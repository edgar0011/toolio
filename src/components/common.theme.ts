/**
 * Theme management — mirrors @e1011/es-kit/hooks theme API
 * (setThemeClassNames, observeThemePreference, switchColorTheme)
 * without the React dependency.
 */

type ThemeMap = { dark: string; light: string }

let themeClassNames: ThemeMap = { dark: 'theme-dark', light: 'theme-light' }

/** Configure the CSS class names used for dark/light theme. */
export const setThemeClassNames = (themes: ThemeMap): void => {
  themeClassNames = themes
}

/** Get the current theme class configuration. */
export const getBaseThemes = (): ThemeMap => themeClassNames

/**
 * Apply theme class to an element — removes the opposite class, adds the correct one.
 */
export const switchColorTheme = (isDark: boolean, htmlElement?: HTMLElement): void => {
  const el = htmlElement ?? document.body
  const addClass = isDark ? themeClassNames.dark : themeClassNames.light
  const removeClass = isDark ? themeClassNames.light : themeClassNames.dark

  el.classList.remove(removeClass)
  el.classList.add(addClass)
}

/**
 * Observe system theme preference via matchMedia and apply theme classes.
 * Returns cleanup function to remove listeners.
 */
export const observeThemePreference = (
  getHtmlElement: () => HTMLElement = () => document.body,
  switchCallback: (isDark: boolean) => void = () => {},
): (() => void) => {
  const apply = (isDark: boolean): void => {
    const el = getHtmlElement()
    switchColorTheme(isDark, el)
    switchCallback(isDark)
  }

  const onDarkChange = (e: MediaQueryListEvent): void => apply(e.matches)
  const onLightChange = (e: MediaQueryListEvent): void => apply(!e.matches)

  const darkMq = window.matchMedia('(prefers-color-scheme: dark)')
  const lightMq = window.matchMedia('(prefers-color-scheme: light)')

  // Remove any stale listeners
  try {
    darkMq.removeEventListener('change', onDarkChange)
    lightMq.removeEventListener('change', onLightChange)
  } catch {
    // ignore
  }

  // Apply initial state
  apply(darkMq.matches)

  // Listen for changes
  darkMq.addEventListener('change', onDarkChange)
  lightMq.addEventListener('change', onLightChange)

  return () => {
    darkMq.removeEventListener('change', onDarkChange)
    lightMq.removeEventListener('change', onLightChange)
  }
}
