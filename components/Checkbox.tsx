import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from '@react-navigation/native';

interface CheckboxProps {
  size?: number;
  text?: string;
  onPress?: (isChecked: boolean) => void;
}

export default function Checkbox(props: CheckboxProps) {
  const theme = useTheme();
  const { size = 18, text, onPress } = props;

  return (
    <BouncyCheckbox
      size={size}
      text={text}
      unfillColor='hsla(0, 0%, 86%, 1)'
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