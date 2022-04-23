import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from '@react-navigation/native';
import { useThemeColor } from "./Themed";

interface CheckboxProps {
  size?: number;
  text?: string;
  onPress?: (isChecked: boolean) => void;
}

export default function Checkbox(props: CheckboxProps) {
  const theme = useTheme();
  const { size = 18, text, onPress } = props;
  
  const cardColor = useThemeColor({
    light: 'hsla(0, 0%, 86%, 1)',
    dark: 'hsl(0, 0%, 10%)',
  });

  return (
    <BouncyCheckbox
      size={size}
      text={text}
      unfillColor={cardColor}
      fillColor={theme.colors.primary}
      iconStyle={{
        borderColor: 'transparent',
        borderRadius: 4,
      }}
      textStyle={{
        textDecorationLine: "none",
        fontFamily: "Poppins_500Medium",
        fontSize: 14,
        lineHeight: 20,
        color: "hsla(0, 0%, 67%, 1)",
      }}
      textContainerStyle={{
        marginLeft: 8,
      }}
      onPress={onPress}
    />
  );
}