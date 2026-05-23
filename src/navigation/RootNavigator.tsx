import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const ONBOARDING_KEY = 'prolegado_onboarding_done';

export default function RootNavigator() {
  const { session, loading } = useAuth();
  const [splashDone, setSplashDone] = useState(false);
  const [onboardingDone, setOnboardingDone] = useState(true);
  const [checkingOnboarding, setCheckingOnboarding] = useState(false);

  useEffect(() => {
    if (session && !loading) {
      setCheckingOnboarding(true);
      AsyncStorage.getItem(ONBOARDING_KEY).then(value => {
        setOnboardingDone(value === 'true');
        setCheckingOnboarding(false);
      });
    }
  }, [session, loading]);

  const handleOnboardingDone = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setOnboardingDone(true);
  };

  const isReady = splashDone && !loading && !checkingOnboarding;

  if (!isReady) {
    return <SplashScreen onDone={() => setSplashDone(true)} />;
  }

  if (!session) {
    return <AuthNavigator />;
  }

  if (!onboardingDone) {
    return <OnboardingScreen onComplete={handleOnboardingDone} />;
  }

  return <MainNavigator />;
}
