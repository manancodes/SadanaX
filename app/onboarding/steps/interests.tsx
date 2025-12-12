// app/onboarding/steps/Interests.tsx
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import COLORS from "@/theme/colors";

type StepRef = { validate?: () => boolean | Promise<boolean> };

const LIST = [
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

const Interests = forwardRef<StepRef>((_props, ref) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (selected.length < 3) {
        setError("Select at least 3 interests.");
        return false;
      }
      setError(null);
      return true;
    },
  }));

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        backgroundColor: COLORS.bg,
      }}
    >
      <Text style={{ color: COLORS.text, fontSize: 28, fontWeight: "700" }}>
        Your interests
      </Text>
      <Text style={{ color: COLORS.subtext, marginTop: 8 }}>
        Pick at least 3 — we'll show people who like similar things.
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 20,
          gap: 10,
        }}
      >
        {LIST.map((it) => {
          const active = selected.includes(it);
          return (
            <TouchableOpacity
              key={it}
              onPress={() => toggle(it)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 999,

                marginBottom: 10,
                backgroundColor: active ? COLORS.accent + "50" : COLORS.card,
                borderWidth: 1,
                borderColor: active ? COLORS.accent : "transparent",
              }}
            >
              <Text style={{ color: COLORS.text }}>{it}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error ? (
        <Text style={{ color: COLORS.danger, marginTop: 12 }}>{error}</Text>
      ) : null}
    </ScrollView>
  );
});

export default Interests;
