// app/onboarding/steps/Interests.tsx
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

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

  const toggle = (item: string) =>
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );

  return (
    <ScrollView className="flex-1 px-6 pt-8">
      <Text className="text-2xl text-text font-bold">Pick interests</Text>
      <Text className="text-subtext mt-2">
        Select at least 3 — we'll suggest better matches.
      </Text>

      <View className="flex-row flex-wrap mt-5">
        {LIST.map((it) => {
          const active = selected.includes(it);
          return (
            <TouchableOpacity
              key={it}
              onPress={() => toggle(it)}
              className={`px-4 py-3 rounded-pill mr-3 mb-3 border-2  ${
                active
                  ? "bg-accent/60 border-accent"
                  : "bg-card border-transparent"
              }`}
            >
              <Text className={"text-text"}>{it}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error ? <Text className="text-danger mt-3">{error}</Text> : null}
    </ScrollView>
  );
});

export default Interests;
