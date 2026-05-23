import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors, radius, spacing, fontFamilies, shadows } from '../theme/tokens';

type Variant = 'primary' | 'secondary' | 'ghost';

interface PrimaryButtonProps extends PressableProps {
  label: string;
  loading?: boolean;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
}

export default function PrimaryButton({
  label,
  loading = false,
  variant = 'primary',
  style,
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <Pressable
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        variantBase[variant],
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.clareza : colors.constancia}
        />
      ) : (
        <Text style={[styles.label, variantLabel[variant]]}>{label}</Text>
      )}
    </Pressable>
  );
}

const variantBase: Record<Variant, object> = {
  primary: { backgroundColor: colors.criatividade, ...shadows.orangeGlow },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: `${colors.constancia}33`,
  },
  ghost: { backgroundColor: 'transparent' },
};

const variantLabel: Record<Variant, object> = {
  primary: { color: colors.clareza },
  secondary: { color: colors.constancia },
  ghost: { color: `${colors.constancia}99` },
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    paddingVertical: 16,
    paddingHorizontal: spacing.s5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  label: {
    fontSize: 16,
    fontFamily: fontFamilies.display,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
