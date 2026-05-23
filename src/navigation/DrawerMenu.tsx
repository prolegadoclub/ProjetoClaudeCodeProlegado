import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDrawer } from '../context/DrawerContext';
import { colors, spacing, radius, fontFamilies, shadows } from '../theme/tokens';

const PANEL_WIDTH = 280;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ITEMS = [
  { label: 'FAQ' },
  { label: 'Suporte' },
  { label: 'Sobre a Prolegado' },
];

export default function DrawerMenu() {
  const { isOpen, closeDrawer } = useDrawer();
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const translateX = useRef(new Animated.Value(PANEL_WIDTH)).current;

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        speed: 18,
        bounciness: 4,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: PANEL_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }
  }, [isOpen]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={closeDrawer}>
      <View style={StyleSheet.absoluteFill}>
        {/* Backdrop */}
        <Pressable
          style={styles.backdrop}
          onPress={closeDrawer}
        />
        {/* Panel */}
        <Animated.View
          style={[
            styles.panel,
            { paddingTop: insets.top + spacing.s4, paddingBottom: insets.bottom + spacing.s4 },
            { transform: [{ translateX }] },
          ]}
        >
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Menu</Text>
            <Pressable onPress={closeDrawer} hitSlop={8} style={styles.closeBtn}>
              <X size={22} color={colors.constancia} strokeWidth={2} />
            </Pressable>
          </View>

          <View style={styles.divider} />

          {ITEMS.map(item => (
            <Pressable
              key={item.label}
              style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
              onPress={closeDrawer}
            >
              <Text style={styles.itemLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: `${colors.constancia}80`,
  },
  panel: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: PANEL_WIDTH,
    backgroundColor: colors.clareza,
    paddingHorizontal: spacing.s5,
    ...shadows.lg,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.s4,
  },
  panelTitle: {
    fontSize: 18,
    fontFamily: fontFamilies.display,
    fontWeight: '700',
    color: colors.constancia,
  },
  closeBtn: {
    padding: spacing.s2,
  },
  divider: {
    height: 1,
    backgroundColor: `${colors.constancia}14`,
    marginBottom: spacing.s4,
  },
  item: {
    paddingVertical: spacing.s4,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.s2,
  },
  itemPressed: {
    backgroundColor: `${colors.constancia}0a`,
  },
  itemLabel: {
    fontSize: 16,
    fontFamily: fontFamilies.bodyRegular,
    color: colors.constancia,
  },
});
