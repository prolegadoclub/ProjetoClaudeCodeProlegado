import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontFamilies } from '../../theme/tokens';

export default function CursosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cursos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.clareza,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: fontFamilies.display,
    fontWeight: '700',
    color: colors.constancia,
  },
});
