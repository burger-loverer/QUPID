import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
// 커밋 테스트 
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="+not-found" 
          options={{ title: 'Not Found' }}
        />
        <Stack.Screen
          name="appdetailsheet/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    // <PrivyProvider appId="cm9y0il7g04zfju0nispi3x4n" clientId="client-WY5ixjQ1HAoVfbcgkVnwip6QSno1VtG8AttpyVyNfKnbT">
    //   <Slot />
    // </PrivyProvider>
  );
}
