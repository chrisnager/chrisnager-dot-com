export default {
  useColorSchemeMediaQuery: true,
  colors: {
    text: `#1d2021`,
    background: `#dfeff3`,
    action: `#c50808`,
    tag: `rgba(0, 0, 0, 0.0375)`,
    divider: `rgba(0, 0, 0, 0.125)`,
    selection: `#c1e0ff`,
    modes: {
      dark: {
        text: `#dfeff3`,
        background: `#0e1010`,
        action: `#6bb1da`,
        tag: `rgba(255, 255, 255, 0.0375)`,
        divider: `rgba(255, 255, 255, 0.125)`,
        selection: `#7d8585`,
      },
    },
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: `inherit`,
    monospace: `Menlo, monospace`,
  },
  fontWeights: {
    body: 400,
    heading: 500,
    bold: 600,
  },
  lineHeights: {
    body: 1.7,
    heading: 1.1275,
  },
  filters: {
    emoji: `hue-rotate(150deg) brightness(1.25)`,
  },
}
