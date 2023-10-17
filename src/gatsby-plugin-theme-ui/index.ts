export default {
  useColorSchemeMediaQuery: true,
  colors: {
    text: `#211d21`, // `#1d2021`,
    background: `#f3dfee`, // `#dfeff3`,
    action: `#0d6b9e`, // `#9e0d0d`,
    tag: `rgb(0 0 0 / 3.75%)`,
    divider: `rgb(0 0 0 / 12.5%)`,
    selection: `#ffc1d6`, // `#c1e0ff`,
    tile: `rgb(0 0 0 / 2.5%)`,
    modes: {
      dark: {
        text: `#dfeff3`,
        background: `#0e1010`,
        action: `#6bb1da`,
        tag: `rgb(255 255 255 / 3.75%)`,
        divider: `rgb(255 255 255 / 12.5%)`,
        selection: `#7d8585`,
        tile: `rgb(255 255 255 / 2.5%)`,
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
}
