import { StyleSheet, TextInput, View } from 'react-native';
import Shadow from '../components/Shadow';

import { Text } from '../components/Themed';

interface InputProps {
  label?: string;
  placeholder?: string;
}

export default function Input(props: InputProps) {
  const { label, placeholder } = props;

  return (
    <View style={inputStyles.container}>
      {label ? (
        <Text style={inputStyles.label}>
          {label}
        </Text>
      ): null}

      <Shadow>
        <TextInput
          placeholder={placeholder}
          style={inputStyles.input}
        ></TextInput>
      </Shadow>
    </View>
  );
}

const inputStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  label: {
    color: 'hsla(215, 24%, 26%, 1)',
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 18,
  },
  input: {
    fontFamily: "Poppins_400Regular",
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
});
