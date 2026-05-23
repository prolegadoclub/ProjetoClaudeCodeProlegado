import React, { forwardRef, useState } from 'react';
import { View, Text, TextInput, TextInputProps, Pressable, StyleSheet } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { colors, radius, spacing, fontFamilies } from '../theme/tokens';

interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const FormInput = forwardRef<TextInput, FormInputProps>(
  ({ label, error, secureTextEntry, style, ...props }, ref) => {
    const [hidden, setHidden] = useState(secureTextEntry ?? false);

    return (
      <View style={styles.wrapper}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <View style={[styles.inputRow, error ? styles.inputError : null]}>
          <TextInput
            ref={ref}
            secureTextEntry={hidden}
            placeholderTextColor={`${colors.constancia}4d`}
            style={[styles.input, style]}
            {...props}
          />
          {secureTextEntry ? (
            <Pressable onPress={() => setHidden(v => !v)} style={styles.eyeBtn} hitSlop={8}>
              {hidden
                ? <EyeOff size={18} color={`${colors.constancia}66`} strokeWidth={2} />
                : <Eye size={18} color={`${colors.constancia}66`} strokeWidth={2} />
              }
            </Pressable>
          ) : null}
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    );
  },
);

FormInput.displayName = 'FormInput';
export default FormInput;

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.s1,
  },
  label: {
    fontSize: 12,
    fontFamily: fontFamilies.bodyMedium,
    color: `${colors.constancia}99`,
    letterSpacing: 0.3,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: `${colors.constancia}26`,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceLight,
  },
  inputError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.s3,
    paddingHorizontal: spacing.s4,
    fontSize: 16,
    fontFamily: fontFamilies.bodyRegular,
    color: colors.constancia,
  },
  eyeBtn: {
    paddingHorizontal: spacing.s3,
  },
  errorText: {
    fontSize: 12,
    fontFamily: fontFamilies.bodyRegular,
    color: colors.error,
  },
});
