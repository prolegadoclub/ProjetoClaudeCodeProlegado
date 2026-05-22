import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CheckInScreen from './src/screens/CheckInScreen';
import { colors } from './src/theme/tokens';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    // Add Parabolica font to assets/fonts/ and uncomment when ready:
    // 'Parabolica-Bold': require('./assets/fonts/Parabolica-Bold.otf'),
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.clareza,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color={colors.criatividade} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <CheckInScreen />
    </SafeAreaProvider>
  );
}
