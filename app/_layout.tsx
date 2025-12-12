import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { useAuthStore } from "@/utils/authStore";

export default function RootLayout() {
  const { isLoggedIn, hasCompletedOnboarding } = useAuthStore();
  return (
    <SafeAreaProvider>
      <StatusBar style="light" animated />
      <Stack>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={isLoggedIn && !hasCompletedOnboarding}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={isLoggedIn && hasCompletedOnboarding}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </SafeAreaProvider>
  );
}
