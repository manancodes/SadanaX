// app/onboarding/finish.tsx
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import COLORS from "@/theme/colors";
import PaginationDots from "@/components/PaginationDots";
import { router } from "expo-router";

export default function FinishScreen() {
  const total = 6;
  const current = 5;

  function complete() {
    // e.g. useAuthStore.getState().setHasCompletedOnboarding(true);
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ marginTop: 60, alignItems: "center" }}>
        <Text style={{ color: COLORS.text, fontSize: 32, fontWeight: "700" }}>
          You're all set 🎉
        </Text>
        <Text
          style={{
            color: COLORS.subtext,
            marginTop: 12,
            textAlign: "center",
            width: "85%",
          }}
        >
          Your profile is ready. You can edit anything later from settings.
        </Text>
      </View>

      <PaginationDots total={6} current={current} />

      <TouchableOpacity
        onPress={complete}
        style={{
          backgroundColor: COLORS.accent,
          paddingVertical: 16,
          borderRadius: 12,
          width: "100%",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#000",
            textAlign: "center",
            fontWeight: "700",
            fontSize: 16,
          }}
        >
          Start Exploring
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
