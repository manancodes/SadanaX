import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import colors from "@/theme/colors";
import PaginationDots from "@/components/PaginationDots";

export default function WelcomeScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/wave.png")}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <SafeAreaView
        style={{ flex: 1, padding: 20, justifyContent: "space-between" }}
      >
        <View style={{ marginTop: 80 }}>
          <Text style={{ color: colors.text, fontSize: 36, fontWeight: "700" }}>
            Welcome 👋
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 18,
              marginTop: 10,
              width: "90%",
            }}
          >
            Let's set up your profile. It'll take less than a minute.
          </Text>
        </View>

        <PaginationDots total={6} current={0} />

        <TouchableOpacity
          onPress={() => router.push("/onboarding/profile-photo")}
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 18,
            borderRadius: 14,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}
