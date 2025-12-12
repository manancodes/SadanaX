// app/onboarding/steps/Photos.tsx
import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

type StepRef = { validate?: () => boolean | Promise<boolean> };
const TOTAL = 6;
const size = (Dimensions.get("window").width - 76) / 3;

const Photos = forwardRef<StepRef>((_props, ref) => {
  const [photos, setPhotos] = useState<(string | null)[]>(
    Array(TOTAL).fill(null)
  );
  const [error, setError] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    validate: () => {
      const filled = photos.filter(Boolean).length;
      if (filled < 1) {
        setError("Add at least 1 photo.");
        return false;
      }
      setError(null);
      return true;
    },
  }));

  async function pick(i: number) {
    const r = await ImagePicker.launchImageLibraryAsync({
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!r.canceled) {
      const copy = [...photos];
      copy[i] = r.assets[0].uri;
      setPhotos(copy);
    }
  }

  return (
    <ScrollView className="flex-1 bg-bg px-6 pt-8">
      <Text className="text-2xl text-text font-bold">Add photos</Text>
      <Text className="text-subtext mt-2">
        Add multiple angles. At least 1 required.
      </Text>

      <View className="mt-5 flex-row flex-wrap justify-between">
        {photos.map((p, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => pick(i)}
            className="rounded-xl mb-4"
            style={{ width: size, height: size }}
          >
            <View className="bg-card w-full h-full rounded-xl items-center justify-center overflow-hidden">
              {p ? (
                <Image
                  source={{ uri: p }}
                  style={{ width: size, height: size, borderRadius: 12 }}
                />
              ) : (
                <Text className="text-subtext text-3xl">＋</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {error ? <Text className="text-danger mt-3">{error}</Text> : null}
    </ScrollView>
  );
});

export default Photos;
