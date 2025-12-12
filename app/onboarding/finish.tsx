import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/theme/colors";
import PaginationDots from "@/components/PaginationDots";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/utils/authStore";

export default function FinishScreen() {
  const { completeOnboarding } = useAuthStore();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ marginTop: 80, alignItems: "center" }}>
        <Ionicons name="checkmark-circle" size={140} color={colors.accent} />
        <Text
          style={{
            color: colors.text,
            fontSize: 32,
            fontWeight: "700",
            marginTop: 20,
          }}
        >
          All Set!
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 8,
            textAlign: "center",
            width: "80%",
          }}
        >
          Your profile is ready. You can now start exploring.
        </Text>
      </View>

      <PaginationDots total={6} current={5} />

      <TouchableOpacity
        onPress={completeOnboarding}
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 18,
          borderRadius: 14,
          width: "100%",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors.text,
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Start Using App
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
