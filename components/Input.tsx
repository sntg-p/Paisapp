import { forwardRef } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputSubmitEditingEventData, View } from 'react-native';
import Shadow from '../components/Shadow';

import { Text, useThemeColor } from '../components/Themed';

interface InputProps {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
}

const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const { label, placeholder, secureTextEntry, onChangeText, onSubmitEditing } = props;
  const cardColor = useThemeColor({ name: 'foreground' });
  const textColor = useThemeColor({ name: 'text' });

  return (
    <View style={inputStyles.container}>
      {label ? (
        <Text style={inputStyles.label}>
          {label}
        </Text>
      ): null}

      <Shadow>
        <TextInput
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor={'#AAAAAA'}
          secureTextEntry={secureTextEntry}
          style={[inputStyles.input, {
            backgroundColor: cardColor,
            color: textColor,
          }]}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        ></TextInput>
      </Shadow>
    </View>
  );
});

export default Input;

const inputStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 18,
  },
  input: {
    fontFamily: "Poppins_400Regular",
    borderRadius: 12,
    padding: 16,
  },
});
