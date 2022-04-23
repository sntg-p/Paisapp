/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: {
    light?: string;
    dark?: string;
    name?: keyof typeof Colors.light & keyof typeof Colors.dark,
  },
) {
  const theme = useColorScheme();
  const colorFromProps = props && props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else if (props.name) {
    return Colors[theme][props.name];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ name: 'text', light: lightColor, dark: darkColor });

  return <DefaultText style={[{ color, fontFamily: 'Poppins_400Regular' }, style]} {...otherProps} />;
}
