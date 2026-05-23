import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { supabase } from '../../lib/supabase';
import { AuthStackParamList } from '../../types/navigation';
import FormInput from '../../components/FormInput';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, spacing, radius } from '../../theme/tokens';

WebBrowser.maybeCompleteAuthSession();

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'apple' | null>(null);

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = 'Preenche esse campo para continuar.';
    if (!password) e.password = 'Preenche esse campo para continuar.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) {
      const msg =
        error.code === 'invalid_credentials'
          ? 'Email ou senha incorretos. Tenta de novo.'
          : error.code === 'email_not_confirmed'
          ? 'Confirma seu email antes de entrar. Confere a caixa de entrada.'
          : 'Ih, travou aqui. Da um toque e tenta novamente.';
      Alert.alert(msg);
    }
    // onAuthStateChange in AuthContext handles redirect on success
  };

  const handleOAuth = async (provider: 'google' | 'apple') => {
    setOauthLoading(provider);
    try {
      const redirectTo = Linking.createURL('auth/callback');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo, skipBrowserRedirect: true },
      });
      if (error || !data.url) throw error;
      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
      if (result.type === 'success') {
        await supabase.auth.exchangeCodeForSession(result.url);
      }
    } catch {
      Alert.alert('Ih, travou aqui. Da um toque e tenta novamente.');
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.s8, paddingBottom: insets.bottom + spacing.s6 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar style="dark" />

        {/* Logo */}
        <Text style={styles.logoMark}>P</Text>
        <View style={{ height: spacing.s7 }} />

        {/* Title */}
        <Text style={styles.title}>Bem-vindo a Prolegado.</Text>
        <View style={{ height: spacing.s7 }} />

        {/* Form */}
        <View style={styles.form}>
          <FormInput
            label="Email"
            value={email}
            onChangeText={t => { setEmail(t); setErrors(e => ({ ...e, email: undefined })); }}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            placeholder="seu@email.com"
          />
          <FormInput
            label="Senha"
            value={password}
            onChangeText={t => { setPassword(t); setErrors(e => ({ ...e, password: undefined })); }}
            error={errors.password}
            secureTextEntry
            placeholder="Minimo 8 caracteres"
          />
          <Pressable
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotLink}
          >
            <Text style={styles.linkText}>Esqueci a senha</Text>
          </Pressable>
        </View>

        <View style={{ height: spacing.s5 }} />

        {/* Primary CTA */}
        <PrimaryButton label="Entrar" loading={loading} onPress={handleLogin} />

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* OAuth */}
        <PrimaryButton
          label="Continuar com Google"
          variant="secondary"
          loading={oauthLoading === 'google'}
          onPress={() => handleOAuth('google')}
          style={styles.oauthBtn}
        />
        <View style={{ height: spacing.s3 }} />
        <PrimaryButton
          label="Continuar com Apple"
          variant="secondary"
          loading={oauthLoading === 'apple'}
          onPress={() => handleOAuth('apple')}
        />

        {/* Register link */}
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Nao tem conta? </Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.registerText, styles.registerLink]}>Criar conta</Text>
          </Pressable>
        </View>
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
  logoMark: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.criatividade,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.constancia,
    lineHeight: 34,
  },
  form: {
    gap: spacing.s4,
  },
  forgotLink: {
    alignSelf: 'flex-end',
    paddingVertical: spacing.s1,
  },
  linkText: {
    fontSize: 14,
    color: colors.criatividade,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.s5,
    gap: spacing.s3,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: `${colors.constancia}1a`,
  },
  dividerText: {
    fontSize: 12,
    color: `${colors.constancia}66`,
  },
  oauthBtn: {
    marginBottom: 0,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.s6,
  },
  registerText: {
    fontSize: 14,
    color: `${colors.constancia}99`,
  },
  registerLink: {
    color: colors.criatividade,
  },
});
