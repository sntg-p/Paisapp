import { forwardRef, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  Pressable,
  TextInputProps,
} from "react-native";
import Shadow from '../components/Shadow';

import { Text, useThemeColor } from '../components/Themed';

interface InputProps {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  textInputStyle?: StyleProp<TextStyle>;
  left?: JSX.Element;
  value?: TextInputProps['value'];
  defaultValue?: TextInputProps['defaultValue'];
  onChangeText?: TextInputProps['onChangeText'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  onFocus?: TextInputProps['onFocus'];
  onBlur?: TextInputProps['onBlur'];
}

const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const {
    label,
    placeholder,
    secureTextEntry,
    textInputStyle,
    left,
    value,
    defaultValue,
    onChangeText,
    onSubmitEditing,
    onFocus,
    onBlur,
  } = props;

  const cardColor = useThemeColor({ name: 'foreground' });
  const textColor = useThemeColor({ name: 'text' });

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={styles.label}>
          {label}
        </Text>
      ): null}

      <Shadow>
        <Pressable
          style={({ pressed }) => ({
            flexDirection: "row",
            backgroundColor: cardColor,
            alignItems: "center",
            width: "100%",
            borderRadius: 16,
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <TextInput
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor={'#AAAAAA'}
            secureTextEntry={secureTextEntry}
            style={[
              styles.input,
              {
                paddingLeft: left ? 52 : 24,
                backgroundColor: cardColor,
                color: textColor,
              },
              textInputStyle
            ]}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            onFocus={onFocus}
            onBlur={onBlur}
            defaultValue={defaultValue}
            value={value}
          ></TextInput>

          {left ? (
            <View style={styles.left}>
              {left}
            </View>
          ) : null}
        </Pressable>
      </Shadow>
    </View>
  );
});

export default Input;

const styles = StyleSheet.create({
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
    width: '100%',
  },
  left: {
    position: 'absolute',
    marginLeft: 16,
    width: 28,
  }
});
