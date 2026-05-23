import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
  ListRenderItemInfo,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../../theme/tokens';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Slide {
  key: string;
  icon: string;
  title: string;
  body: string;
}

const SLIDES: Slide[] = [
  {
    key: '1',
    icon: 'P',
    title: 'Aqui a constancia e identidade.',
    body: 'Desafios diarios, comunidade real e desenvolvimento que transforma habito em estilo de vida.',
  },
  {
    key: '2',
    icon: 'B',
    title: 'Entre num desafio. Faca hoje.',
    body: 'Escolha um desafio, faca check-in todo dia e acompanhe sua evolucao com a comunidade.',
  },
  {
    key: '3',
    icon: 'R',
    title: 'Cada acao vira ponto. Cada ponto vira recompensa.',
    body: 'Ganhe PL Points fazendo check-ins, assistindo aulas e postando. Troque por recompensas reais.',
  },
];

interface Props {
  onComplete: () => Promise<void>;
}

export default function OnboardingScreen({ onComplete }: Props) {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const [completing, setCompleting] = useState(false);
  const flatRef = useRef<FlatList<Slide>>(null);

  const goNext = () => {
    if (index < SLIDES.length - 1) {
      flatRef.current?.scrollToIndex({ index: index + 1, animated: true });
      setIndex(index + 1);
    }
  };

  const handleComplete = async () => {
    setCompleting(true);
    await onComplete();
  };

  const renderSlide = ({ item }: ListRenderItemInfo<Slide>) => (
    <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>{item.icon}</Text>
      </View>
      <View style={{ height: spacing.s7 }} />
      <Text style={styles.slideTitle}>{item.title}</Text>
      <View style={{ height: spacing.s4 }} />
      <Text style={styles.slideBody}>{item.body}</Text>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar style="dark" />

      {/* Skip */}
      <Pressable
        onPress={handleComplete}
        style={[styles.skipBtn, { top: insets.top + spacing.s4 }]}
        hitSlop={8}
      >
        <Text style={styles.skipText}>Agora nao</Text>
      </Pressable>

      {/* Slides */}
      <FlatList
        ref={flatRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'center' }}
      />

      {/* Bottom area */}
      <View style={styles.bottom}>
        {/* Dots */}
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>

        <View style={{ height: spacing.s5 }} />

        {/* CTA */}
        <Pressable
          style={({ pressed }) => [styles.btn, pressed && { opacity: 0.88, transform: [{ scale: 0.97 }] }]}
          onPress={index < SLIDES.length - 1 ? goNext : handleComplete}
          disabled={completing}
        >
          <Text style={styles.btnText}>
            {index < SLIDES.length - 1 ? 'Proximo' : 'Vamos comecar'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.clareza,
  },
  skipBtn: {
    position: 'absolute',
    right: spacing.s5,
    zIndex: 10,
    paddingVertical: spacing.s2,
    paddingHorizontal: spacing.s3,
  },
  skipText: {
    fontSize: 14,
    color: `${colors.constancia}66`,
  },
  slide: {
    flex: 1,
    paddingHorizontal: spacing.s6,
    paddingTop: spacing.s8 + spacing.s7,
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: radius.xl,
    backgroundColor: colors.criatividade,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.clareza,
    lineHeight: 40,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.constancia,
    lineHeight: 34,
  },
  slideBody: {
    fontSize: 16,
    color: `${colors.constancia}99`,
    lineHeight: 24,
  },
  bottom: {
    paddingHorizontal: spacing.s5,
    paddingBottom: spacing.s5,
  },
  dots: {
    flexDirection: 'row',
    gap: spacing.s2,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: `${colors.constancia}26`,
  },
  dotActive: {
    backgroundColor: colors.criatividade,
    width: 24,
  },
  btn: {
    backgroundColor: colors.criatividade,
    borderRadius: radius.md,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.clareza,
    letterSpacing: 0.3,
  },
});
