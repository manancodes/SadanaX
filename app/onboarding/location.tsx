// app/onboarding/location.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import COLORS from "@/theme/colors";
import OnboardingFooter from "@/components/OnboardingFooter";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LocationScreen() {
  const total = 6;
  const current = 4;
  const [status, setStatus] = useState<"loading" | "granted" | "denied">(
    "loading"
  );
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === "granted") {
        setStatus("granted");
        const pos = await Location.getCurrentPositionAsync({});
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      } else {
        setStatus("denied");
      }
    })();
  }, []);

  async function request() {
    setError(null);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      setStatus("granted");
      const pos = await Location.getCurrentPositionAsync({});
      setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    } else {
      setStatus("denied");
      setError(
        "Location permission denied. You can enable it in settings later."
      );
    }
  }

  function handleNext() {
    // Save coords if needed and continue
    router.push("/onboarding/finish");
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        padding: 20,
        justifyContent: "space-between",
      }}
    >
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text style={{ color: COLORS.text, fontSize: 28, fontWeight: "700" }}>
          Share your location
        </Text>
        <Text
          style={{ color: COLORS.subtext, marginTop: 8, textAlign: "center" }}
        >
          We use approximate location to show people nearby. Your exact address
          is not shown.
        </Text>

        <View style={{ marginTop: 30, alignItems: "center" }}>
          {status === "loading" && (
            <ActivityIndicator color={COLORS.accent} size="large" />
          )}
          {status === "denied" && (
            <Ionicons
              name="location-outline"
              size={110}
              color={COLORS.primary}
            />
          )}
          {status === "granted" && coords && (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                name="checkmark-circle"
                size={110}
                color={COLORS.success}
              />
              <Text style={{ color: COLORS.text, marginTop: 14 }}>
                Location detected
              </Text>
              <Text
                style={{ color: COLORS.subtext, marginTop: 6 }}
              >{`Lat: ${coords.lat.toFixed(4)} • Lon: ${coords.lng.toFixed(
                4
              )}`}</Text>
            </View>
          )}
        </View>

        {error ? (
          <Text style={{ color: COLORS.danger, marginTop: 12 }}>{error}</Text>
        ) : null}
      </View>

      <OnboardingFooter
        total={6}
        current={current}
        onBack={() => router.back()}
        onNext={handleNext}
        disabled={false}
        errorText={null}
      />

      {/* bottom primary button to request permission (if denied) */}
      {status !== "granted" && (
        <View style={{ position: "absolute", left: 20, right: 20, bottom: 90 }}>
          <TouchableOpacity
            onPress={request}
            style={{
              backgroundColor: COLORS.primary,
              paddingVertical: 14,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: COLORS.text,
                fontWeight: "700",
              }}
            >
              Allow Location
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
