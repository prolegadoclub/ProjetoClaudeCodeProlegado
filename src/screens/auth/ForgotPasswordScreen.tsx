import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { supabase } from '../../lib/supabase';
import { AuthStackParamList } from '../../types/navigation';
import FormInput from '../../components/FormInput';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, fontFamilies, spacing, radius, shadows } from '../../theme/tokens';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Esse email nao parece certo. Confere ai.');
      return;
    }
    setEmailError(undefined);
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: 'prolegado://reset-password',
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.s5, paddingBottom: insets.bottom + spacing.s6 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar style="dark" />

        <Pressable onPress={() => navigation.goBack()} style={styles.back} hitSlop={8}>
          <ArrowLeft size={24} color={colors.constancia} strokeWidth={2} />
        </Pressable>

        <View style={{ height: spacing.s5 }} />
        <Text style={styles.title}>Esqueci a senha</Text>
        <View style={{ height: spacing.s3 }} />
        <Text style={styles.subtitle}>
          Coloca seu email aqui e a gente envia um link para voce redefinir a senha.
        </Text>
        <View style={{ height: spacing.s6 }} />

        {sent ? (
          <View style={styles.successCard}>
            <Text style={styles.successText}>
              Enviamos um link para o seu email. Confere a caixa de entrada.
            </Text>
          </View>
        ) : (
          <FormInput
            label="Email"
            value={email}
            onChangeText={t => { setEmail(t); setEmailError(undefined); }}
            error={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            returnKeyType="done"
            onSubmitEditing={handleSend}
            placeholder="seu@email.com"
          />
        )}

        <View style={{ height: spacing.s5 }} />

        {!sent ? (
          <PrimaryButton label="Enviar link" loading={loading} onPress={handleSend} />
        ) : (
          <PrimaryButton
            label="Voltar para o login"
            variant="secondary"
            onPress={() => navigation.navigate('Login')}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.clareza,
  },
  content: {
    paddingHorizontal: spacing.s5,
  },
  back: {
    padding: spacing.s2,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontFamily: fontFamilies.display,
    fontWeight: '700',
    color: colors.constancia,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fontFamilies.bodyRegular,
    color: `${colors.constancia}99`,
    lineHeight: 24,
  },
  successCard: {
    backgroundColor: `${colors.success}1a`,
    borderRadius: radius.lg,
    padding: spacing.s4,
    borderWidth: 1,
    borderColor: `${colors.success}33`,
    ...shadows.sm,
  },
  successText: {
    fontSize: 15,
    fontFamily: fontFamilies.bodyRegular,
    color: colors.success,
    lineHeight: 22,
  },
});
