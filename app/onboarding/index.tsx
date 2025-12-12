import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import COLORS from "@/theme/colors";
import OnboardingFooter from "@/components/OnboardingFooter";

export default function WelcomeScreen() {
  const total = 6;
  const current = 0;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        padding: 20,
        justifyContent: "space-between",
      }}
    >
      <View style={{ marginTop: 30 }}>
        <Image
          source={require("@/assets/images/wave.png")}
          style={{ width: "100%", height: 260, resizeMode: "contain" }}
        />
      </View>

      <View>
        <Text style={{ color: COLORS.text, fontSize: 32, fontWeight: "700" }}>
          Welcome 👋
        </Text>
        <Text style={{ color: COLORS.subtext, marginTop: 10, fontSize: 16 }}>
          Quick setup — make your profile discoverable and private. Only the
          info you approve will be visible on your profile.
        </Text>
      </View>

      <OnboardingFooter
        total={total}
        current={current}
        showBack={false}
        onNext={() => router.push("/onboarding/profile-info")}
      />
    </SafeAreaView>
  );
}
