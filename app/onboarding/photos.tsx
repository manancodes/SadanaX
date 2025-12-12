// app/onboarding/photos.tsx
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import COLORS from "@/theme/colors";
import OnboardingFooter from "@/components/OnboardingFooter";
import { router } from "expo-router";

const size = (Dimensions.get("window").width - 60) / 3; // 20 padding each side + gaps

export default function PhotosScreen() {
  const total = 6;
  const current = 3;
  const [photos, setPhotos] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [error, setError] = useState<string | null>(null);
  const minRequired = 1; // change to 6 to require all 6

  async function pick(idx: number) {
    setError(null);
    const res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (!res.canceled) {
      const copy = [...photos];
      copy[idx] = res.assets[0].uri;
      setPhotos(copy);
    }
  }

  function handleNext() {
    const filled = photos.filter(Boolean).length;
    if (filled < minRequired) {
      setError(
        `Add at least ${minRequired} photo${
          minRequired > 1 ? "s" : ""
        } to continue.`
      );
      return;
    }
    router.push("/onboarding/location");
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
      <View>
        <Text style={{ color: COLORS.text, fontSize: 28, fontWeight: "700" }}>
          Add photos
        </Text>
        <Text style={{ color: COLORS.subtext, marginTop: 8 }}>
          Add multiple angles — profiles with more photos get better responses.
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          {photos.map((p, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => pick(i)}
              style={{
                width: size,
                height: size,
                backgroundColor: COLORS.card,
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              {p ? (
                <Image
                  source={{ uri: p }}
                  style={{ width: size, height: size, borderRadius: 12 }}
                />
              ) : (
                <Text style={{ color: COLORS.subtext, fontSize: 28 }}>＋</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {error ? (
          <Text style={{ color: COLORS.danger, marginTop: 8 }}>{error}</Text>
        ) : null}
      </View>

      <OnboardingFooter
        total={6}
        current={current}
        onBack={() => router.back()}
        onNext={handleNext}
        disabled={false}
        errorText={error}
      />
    </SafeAreaView>
  );
}
