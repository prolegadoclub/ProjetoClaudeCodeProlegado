import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Settings } from 'lucide-react-native';
import { colors, spacing } from '../../theme/tokens';
import { PerfilStackParamList } from '../../types/navigation';

type Nav = NativeStackNavigationProp<PerfilStackParamList, 'Perfil'>;

export default function PerfilScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Pressable
        style={styles.settingsBtn}
        onPress={() => navigation.navigate('Settings')}
      >
        <Settings size={20} color={`${colors.constancia}99`} strokeWidth={2} />
        <Text style={styles.settingsLabel}>Configuracoes</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.clareza,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.constancia,
  },
  settingsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s2,
    padding: spacing.s3,
  },
  settingsLabel: {
    fontSize: 14,
    color: `${colors.constancia}99`,
  },
});
