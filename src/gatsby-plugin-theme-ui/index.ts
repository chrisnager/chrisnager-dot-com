const tagLight = `rgb(255 255 255 / 3.75%)`
const tagDark = `rgb(0 0 0 / 3.75%)`
const dividerLight = `rgb(255 255 255 / 12.5%)`
const dividerDark = `rgb(0 0 0 / 12.5%)`
const tileLight = `rgb(255 255 255 / 2.5%)`
const tileDark = `rgb(0 0 0 / 2.5%)`

export default {
  colors: {
    text: `#1d2021`,
    background: `#dfeff3`,
    action: `#9e0d0d`,
    selection: `#c1e0ff`,
    tag: tagDark,
    divider: dividerDark,
    tile: tileDark,

    modes: {
      soft: {
        text: `#211d21`,
        background: `#f3dfee`,
        action: `#0d6b9e`,
        selection: `#ffc1d6`,
        tag: tagDark,
        divider: dividerDark,
        tile: tileDark,
      },

      dark: {
        text: `#dfeff3`,
        background: `#0e1010`,
        action: `#6bb1da`,
        selection: `#7d8585`,
        tag: tagLight,
        divider: dividerLight,
        tile: tileLight,
      },

      minted: {
        text: `#000`,
        background: `#0eb`,
        action: `rebeccapurple`,
        selection: `#7d8585`,
        tag: tagDark,
        divider: dividerDark,
        tile: tileDark,
      },

      sunny: {
        text: `navy`,
        background: `gold`,
        action: `orangered`,
        selection: `#7d8585`,
        tag: tagDark,
        divider: dividerDark,
        tile: tileDark,
      },

      contrast: {
        text: `#000`,
        background: `#fff`,
        action: `#00f`,
        selection: `rgb(255 205 0 / 40%)`,
        tag: tagDark,
        divider: dividerDark,
        tile: tileDark,
      },
    },
  },

  fonts: {
    body: 'system-ui, sans-serif',
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

  styles: {
    p: {
      fontFamily: `Georgia, serif`,
    },

    ul: {
      fontFamily: `Georgia, serif`,
    },
  },
}
