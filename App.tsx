import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/context/AuthContext';
import { DrawerProvider } from './src/context/DrawerContext';
import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/theme/tokens';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    // Descomente quando adicionar o arquivo em assets/fonts/:
    // 'Parabolica-Bold': require('./assets/fonts/Parabolica-Bold.otf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.criatividade, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.clareza} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <DrawerProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </DrawerProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
