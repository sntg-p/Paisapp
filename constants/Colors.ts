const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  shadow: '#000',
  light: {
    text: 'hsla(215, 24%, 26%, 1)',
    secondaryText: 'hsla(211, 12%, 43%, 1)',
    baseText: 'hsla(0, 0%, 67%, 1)',
    divider: 'hsla(0, 0%, 67%, .12)',
    background: 'hsl(220, 33%, 98%)',
    foreground: '#fff',
    headerBackground: 'hsla(220, 33%, 98%, 0.84)',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    brand: 'hsla(217, 100%, 47%, 1)',
    accent: 'hsla(225, 91%, 70%, 1)',
  },
  dark: {
    text: '#fff',
    secondaryText: 'hsla(0, 0%, 80%, 1)',
    baseText: 'hsla(0, 0%, 67%, 1)',
    divider: 'hsla(0, 0%, 67%, .12)',
    background: 'hsl(0, 0%, 6%)',
    foreground: 'hsl(0, 0%, 8%)',
    headerBackground: 'hsla(0, 0%, 6%, 0.84)',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    brand: 'hsla(217, 100%, 47%, 1)',
    accent: 'hsla(225, 91%, 70%, 1)',
  },
};
