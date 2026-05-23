import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { supabase } from '../../lib/supabase';
import { AuthStackParamList } from '../../types/navigation';
import FormInput from '../../components/FormInput';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, spacing } from '../../theme/tokens';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

type Errors = {
  full_name?: string;
  username?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
};

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

export default function RegisterScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  const set = (field: keyof typeof form) => (value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.full_name.trim() || form.full_name.trim().length < 2)
      e.full_name = 'Preenche esse campo para continuar.';
    if (!form.username.trim())
      e.username = 'Preenche esse campo para continuar.';
    else if (!USERNAME_REGEX.test(form.username.trim()))
      e.username = 'Use apenas letras, numeros e underscore.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Esse email nao parece certo. Confere ai.';
    if (!form.password || form.password.length < 8)
      e.password = 'A senha precisa ter pelo menos 8 caracteres.';
    if (form.password !== form.confirm_password)
      e.confirm_password = 'As senhas nao sao iguais. Verifica.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        data: {
          full_name: form.full_name.trim(),
          username: form.username.trim().toLowerCase(),
        },
      },
    });
    setLoading(false);
    if (error) {
      const msg =
        error.code === 'user_already_exists'
          ? 'Esse email ja esta cadastrado. Tenta fazer login.'
          : error.code === 'weak_password'
          ? 'A senha precisa ter pelo menos 8 caracteres.'
          : 'Ih, travou aqui. Da um toque e tenta novamente.';
      Alert.alert(msg);
    }
    // onAuthStateChange cuida do redirect
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

        {/* Back */}
        <Pressable onPress={() => navigation.goBack()} style={styles.back} hitSlop={8}>
          <ArrowLeft size={24} color={colors.constancia} strokeWidth={2} />
        </Pressable>

        <View style={{ height: spacing.s5 }} />
        <Text style={styles.title}>Criar conta</Text>
        <View style={{ height: spacing.s6 }} />

        <View style={styles.form}>
          <FormInput
            label="Nome completo"
            value={form.full_name}
            onChangeText={set('full_name')}
            error={errors.full_name}
            autoCapitalize="words"
            autoComplete="name"
            returnKeyType="next"
            onSubmitEditing={() => usernameRef.current?.focus()}
            placeholder="Seu nome"
          />
          <FormInput
            ref={usernameRef}
            label="Nome de usuario"
            value={form.username}
            onChangeText={set('username')}
            error={errors.username}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            placeholder="seu_usuario"
          />
          <FormInput
            ref={emailRef}
            label="Email"
            value={form.email}
            onChangeText={set('email')}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            placeholder="seu@email.com"
          />
          <FormInput
            ref={passwordRef}
            label="Senha"
            value={form.password}
            onChangeText={set('password')}
            error={errors.password}
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => confirmRef.current?.focus()}
            placeholder="Minimo 8 caracteres"
          />
          <FormInput
            ref={confirmRef}
            label="Confirmar senha"
            value={form.confirm_password}
            onChangeText={set('confirm_password')}
            error={errors.confirm_password}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleRegister}
            placeholder="Repita a senha"
          />
        </View>

        <View style={{ height: spacing.s5 }} />
        <PrimaryButton label="Vamos comecar" loading={loading} onPress={handleRegister} />

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Ja tem conta? </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.loginText, styles.loginLink]}>Entrar</Text>
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
  back: {
    padding: spacing.s2,
    alignSelf: 'flex-start',
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
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.s6,
  },
  loginText: {
    fontSize: 14,
    color: `${colors.constancia}99`,
  },
  loginLink: {
    color: colors.criatividade,
  },
});
