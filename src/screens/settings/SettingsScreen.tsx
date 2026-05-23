import React from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogOut } from 'lucide-react-native';

import { supabase } from '../../lib/supabase';
import { PerfilStackParamList } from '../../types/navigation';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, fontFamilies, spacing, radius, shadows } from '../../theme/tokens';

type Props = NativeStackScreenProps<PerfilStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que quer sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut();
            // onAuthStateChange no AuthContext cuida do redirect para LoginScreen
          },
        },
      ],
    );
  };

  return (
    <View style={[styles.safe, { paddingBottom: insets.bottom }]}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Configuracoes</Text>

        <View style={{ height: spacing.s6 }} />

        {/* Plano */}
        <Text style={styles.sectionLabel}>CONTA</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Plano atual</Text>
            <Text style={styles.rowValue}>Gratuito</Text>
          </View>
        </View>

        <View style={{ height: spacing.s7 }} />

        {/* Logout */}
        <Pressable
          style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.8 }]}
          onPress={handleLogout}
        >
          <LogOut size={18} color={colors.error} strokeWidth={2} />
          <Text style={styles.logoutText}>Sair</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.clareza,
  },
  content: {
    paddingHorizontal: spacing.s5,
    paddingTop: spacing.s5,
    paddingBottom: spacing.s8,
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: fontFamilies.display,
    fontWeight: '700',
    color: colors.constancia,
    lineHeight: 34,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: fontFamilies.bodyMedium,
    color: `${colors.constancia}66`,
    letterSpacing: 1.2,
    marginBottom: spacing.s3,
  },
  card: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.s4,
    ...shadows.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.s4,
  },
  rowLabel: {
    fontSize: 15,
    fontFamily: fontFamilies.bodyRegular,
    color: colors.constancia,
  },
  rowValue: {
    fontSize: 14,
    fontFamily: fontFamilies.bodyMedium,
    color: `${colors.constancia}66`,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s3,
    paddingVertical: spacing.s4,
    paddingHorizontal: spacing.s2,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: fontFamilies.bodyMedium,
    color: colors.error,
  },
});
