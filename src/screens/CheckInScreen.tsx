import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Zap } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import ConfettiCannon from 'react-native-confetti-cannon';
import { colors, spacing, radius, shadows } from '../theme/tokens';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MOCK_CHALLENGE = {
  name: 'Acordar às 6h',
  streak: 12,
  totalDays: 30,
};

export default function CheckInScreen() {
  const insets = useSafeAreaInsets();
  const [checkedIn, setCheckedIn] = useState(false);
  const [streak, setStreak] = useState(MOCK_CHALLENGE.streak);

  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const successOpacity = useRef(new Animated.Value(0)).current;
  const streakScale = useRef(new Animated.Value(1)).current;
  const pointsOpacity = useRef(new Animated.Value(0)).current;
  const pointsTranslateY = useRef(new Animated.Value(16)).current;

  const confettiRef = useRef<any>(null);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handleCheckIn = async () => {
    if (checkedIn) return;

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCheckedIn(true);
    setStreak(s => s + 1);

    Animated.parallel([
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 0.85,
        speed: 20,
        bounciness: 0,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.spring(successOpacity, {
        toValue: 1,
        speed: 12,
        bounciness: 8,
        useNativeDriver: true,
      }).start();
    }, 150);

    setTimeout(() => {
      Animated.sequence([
        Animated.spring(streakScale, {
          toValue: 1.25,
          speed: 30,
          bounciness: 0,
          useNativeDriver: true,
        }),
        Animated.spring(streakScale, {
          toValue: 1,
          speed: 15,
          bounciness: 12,
          useNativeDriver: true,
        }),
      ]).start();
    }, 200);

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(pointsOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(pointsTranslateY, {
          toValue: 0,
          speed: 15,
          bounciness: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 350);

    setTimeout(() => confettiRef.current?.start(), 200);
  };

  const progressPercent = Math.min((streak / MOCK_CHALLENGE.totalDays) * 100, 100);

  return (
    <View
      style={[
        styles.safe,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar style="dark" />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.iconBtn} hitSlop={8}>
            <ArrowLeft size={24} color={colors.constancia} strokeWidth={2} />
          </Pressable>
        </View>

        {/* Challenge info */}
        <Text style={styles.labelCaps}>DESAFIO ATIVO</Text>
        <Text style={styles.challengeTitle}>{MOCK_CHALLENGE.name}</Text>

        <View style={{ height: spacing.s6 }} />

        {/* Streak card */}
        <View style={styles.card}>
          <View style={styles.streakRow}>
            <Zap size={16} color={colors.criatividade} fill={colors.criatividade} />
            <Text style={styles.streakLabel}>Sequencia ativa</Text>
          </View>

          <Animated.Text
            style={[styles.streakNumber, { transform: [{ scale: streakScale }] }]}
          >
            {streak}
          </Animated.Text>
          <Text style={styles.streakCaption}>dias consecutivos</Text>

          <View style={{ height: spacing.s4 }} />

          {/* Progress bar via flex */}
          <View style={styles.progressTrack}>
            <View style={{ flex: progressPercent, backgroundColor: colors.criatividade, borderRadius: radius.full }} />
            <View style={{ flex: Math.max(100 - progressPercent, 0) }} />
          </View>
          <Text style={styles.progressLabel}>
            {streak} de {MOCK_CHALLENGE.totalDays} dias
          </Text>
        </View>

        <View style={{ height: spacing.s5 }} />

        {/* PL Points earned — animated in after check-in */}
        <Animated.View
          style={[
            styles.pointsCard,
            {
              opacity: pointsOpacity,
              transform: [{ translateY: pointsTranslateY }],
            },
          ]}
          pointerEvents="none"
        >
          <Text style={styles.pointsText}>+ A definir  PL Points ganhos hoje</Text>
        </Animated.View>

        <View style={{ flex: 1 }} />

        {/* Button area: primary + success state stacked */}
        <View style={styles.buttonArea}>
          <Animated.View
            style={{ opacity: buttonOpacity, transform: [{ scale: buttonScale }] }}
            pointerEvents={checkedIn ? 'none' : 'auto'}
          >
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCheckIn}
              disabled={checkedIn}
            >
              <View style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>FAZER CHECK-IN</Text>
              </View>
            </Pressable>
          </Animated.View>

          <Animated.View
            style={[StyleSheet.absoluteFill, { opacity: successOpacity }]}
            pointerEvents={checkedIn ? 'auto' : 'none'}
          >
            <View style={styles.successButton}>
              <Text style={styles.successButtonText}>Check-in feito!</Text>
              <Text style={styles.successButtonSub}>Novo começo. Bora?</Text>
            </View>
          </Animated.View>
        </View>

        <View style={{ height: spacing.s5 }} />
      </View>

      <ConfettiCannon
        ref={confettiRef}
        count={80}
        origin={{ x: SCREEN_WIDTH / 2, y: -20 }}
        autoStart={false}
        colors={[colors.criatividade, '#ffb347', '#ffe66d', colors.clareza, colors.constancia]}
        explosionSpeed={350}
        fallSpeed={3000}
        fadeOut
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.clareza,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.s5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.s3,
    paddingBottom: spacing.s7,
  },
  iconBtn: {
    padding: spacing.s2,
  },
  labelCaps: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: `${colors.constancia}80`,
    marginBottom: spacing.s2,
  },
  challengeTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    color: colors.constancia,
  },
  card: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.lg,
    padding: spacing.s5,
    ...shadows.md,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s1,
    marginBottom: spacing.s3,
  },
  streakLabel: {
    fontSize: 12,
    color: `${colors.constancia}80`,
    letterSpacing: 0.5,
  },
  streakNumber: {
    fontSize: 56,
    lineHeight: 56,
    fontWeight: '700',
    color: colors.criatividade,
    marginBottom: spacing.s1,
  },
  streakCaption: {
    fontSize: 14,
    color: `${colors.constancia}99`,
  },
  progressTrack: {
    flexDirection: 'row',
    height: 6,
    backgroundColor: `${colors.constancia}14`,
    borderRadius: radius.full,
    overflow: 'hidden',
    marginBottom: spacing.s2,
  },
  progressLabel: {
    fontSize: 12,
    color: `${colors.constancia}66`,
  },
  pointsCard: {
    backgroundColor: `${colors.criatividade}1a`,
    borderRadius: radius.lg,
    padding: spacing.s4,
    borderWidth: 1,
    borderColor: `${colors.criatividade}33`,
  },
  pointsText: {
    fontSize: 14,
    color: colors.criatividade,
    textAlign: 'center',
  },
  buttonArea: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: colors.criatividade,
    borderRadius: radius.md,
    paddingVertical: 18,
    paddingHorizontal: spacing.s5,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.orangeGlow,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.clareza,
    letterSpacing: 0.5,
  },
  successButton: {
    backgroundColor: colors.success,
    borderRadius: radius.md,
    paddingVertical: 18,
    paddingHorizontal: spacing.s5,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  successButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  successButtonSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
});
