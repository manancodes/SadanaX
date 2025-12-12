// app/onboarding/interests.tsx
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import COLORS from "@/theme/colors";
import OnboardingFooter from "@/components/OnboardingFooter";
import { router } from "expo-router";

const INTERESTS = [
  "Music",
  "Travel",
  "Foodie",
  "Fitness",
  "Movies",
  "Photography",
  "Reading",
  "Cooking",
  "Tech",
  "Gaming",
  "Art",
  "Dancing",
  "Sports",
  "Nature",
  "Podcasts",
  "Startups",
  "Fashion",
  "Pets",
  "Meditation",
  "Writing",
];

export default function InterestsScreen() {
  const total = 6;
  const current = 2;
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  function toggle(i: string) {
    setError(null);
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  }

  function handleNext() {
    if (selected.length < 3) {
      setError("Choose at least 3 interests to improve matches.");
      return;
    }
    // save selections to store later
    router.push("/onboarding/photos");
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
          Your interests
        </Text>
        <Text style={{ color: COLORS.subtext, marginTop: 8 }}>
          Pick at least 3 — we'll surface people who like similar things.
        </Text>

        <FlatList
          data={INTERESTS}
          keyExtractor={(i) => i}
          numColumns={2}
          style={{ marginTop: 20 }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 12,
          }}
          renderItem={({ item }) => {
            const active = selected.includes(item);
            return (
              <TouchableOpacity
                onPress={() => toggle(item)}
                style={{
                  backgroundColor: active ? COLORS.accent : COLORS.card,
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  borderRadius: 12,
                  width: "48%",
                }}
              >
                <Text
                  style={{
                    color: active ? "#000" : COLORS.text,
                    textAlign: "center",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
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
