const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: 'hsla(215, 24%, 26%, 1)',
    secondaryText: 'hsla(211, 12%, 43%, 1)',
    baseText: 'hsla(0, 0%, 67%, 1)',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    secondaryText: 'hsla(0, 0%, 80%, 1)',
    baseText: 'hsla(0, 0%, 67%, 1)',
    background: '#000',
    foreground: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
