// Type mapping for deep import (avoids React pulled in by barrel)
declare module '@e1011/es-kit/dist/utils/esm/src/core/utils/helpers/ui.js' {
  export type ThemeMap = { dark: string; light: string }
  export const getBaseThemes: (element?: HTMLElement) => ThemeMap
  export const setThemeClassNames: (themes: ThemeMap, element?: HTMLElement) => void
  export const updateColorTheme: (isDark?: boolean, htmlElement?: HTMLElement) => void
  export const observeThemePreference: (
    getHtmlElement?: () => HTMLElement,
    switchCallback?: (isDark: boolean) => void,
  ) => () => void
}
