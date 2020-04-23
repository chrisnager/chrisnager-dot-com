export default {
  useColorSchemeMediaQuery: true,
  colors: {
    text: `rgba(0, 0, 0, 0.9)`,
    background: `#d2f1f9`,
    action: `#c50808`,
    tag: `rgba(0, 0, 0, 0.05)`,
    modes: {
      dark: {
        text: `#d2f1f9`,
        background: `rgba(0, 0, 0, 0.9)`,
        action: `#e42e2e`,
        tag: `rgba(255, 255, 255, 0.05)`,
      },
    },
  },
  fonts: {
    body: `system-ui, sans-serif`,
    heading: `system-ui, sans-serif`,
    monospace: `Menlo, monospace`,
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
}
