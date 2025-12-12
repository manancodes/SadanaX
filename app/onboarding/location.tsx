import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import colors from "@/theme/colors";
import PaginationDots from "@/components/PaginationDots";
import { Ionicons } from "@expo/vector-icons";

export default function LocationScreen() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      setGranted(status === "granted");
    })();
  }, []);

  async function requestPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setGranted(status === "granted");
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
        justifyContent: "space-between",
      }}
    >
      <View style={{ marginTop: 60, alignItems: "center" }}>
        <Text style={{ color: colors.text, fontSize: 28, fontWeight: "700" }}>
          Share Location
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 8,
            width: "85%",
            textAlign: "center",
          }}
        >
          Your location helps us show people near you. It will be visible on
          your profile.
        </Text>

        <View style={{ marginTop: 40 }}>
          {granted ? (
            <Ionicons
              name="checkmark-circle"
              size={120}
              color={colors.accent}
            />
          ) : (
            <Ionicons name="location" size={120} color={colors.primary} />
          )}
        </View>

        {!granted && (
          <TouchableOpacity
            onPress={requestPermission}
            style={{
              marginTop: 30,
              backgroundColor: colors.primary,
              paddingVertical: 14,
              paddingHorizontal: 24,
              borderRadius: 14,
            }}
          >
            <Text style={{ color: colors.text, fontSize: 16 }}>
              Enable Location
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <PaginationDots total={6} current={3} />

      <TouchableOpacity
        onPress={() => router.push("/onboarding/photos")}
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
            color: colors.text,
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
