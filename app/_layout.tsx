import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { colors } from '@/src/shared/theme';

// Customize React Native Paper theme
const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary.main,
    secondary: colors.secondary.main,
    error: colors.status.error,
    background: colors.background.default,
    surface: colors.background.paper,
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={customTheme}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: 'EKG Helper',
              headerBackTitle: 'Home',
            }}
          />
          <Stack.Screen
            name="ecg-data-entry"
            options={{
              presentation: 'card',
              title: 'ECG Data Entry',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="qrs-screening"
            options={{
              presentation: 'card',
              title: 'QRS Screening',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="analysis-workflow"
            options={{
              presentation: 'card',
              title: 'Analysis',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="results"
            options={{
              presentation: 'card',
              title: 'Results',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="case-history"
            options={{
              presentation: 'card',
              title: 'Case History',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
