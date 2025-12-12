// app/onboarding/steps/Photos.tsx
import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import COLORS from "@/theme/colors";

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
        setError("Add at least one photo.");
        return false;
      }
      setError(null);
      return true;
    },
  }));

  async function pick(i: number) {
    const r = await ImagePicker.launchImageLibraryAsync({
      aspect: [1, 1],
    });
    if (!r.canceled) {
      const copy = [...photos];
      copy[i] = r.assets[0].uri;
      setPhotos(copy);
    }
  }

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
        Add photos
      </Text>
      <Text style={{ color: COLORS.subtext, marginTop: 8 }}>
        Add multiple angles. At least 1 required.
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 18,
          justifyContent: "space-between",
        }}
      >
        {photos.map((p, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => pick(i)}
            style={{
              width: size,
              height: size,
              borderRadius: 12,
              marginBottom: 12,
              backgroundColor: COLORS.card,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {p ? (
              <Image
                source={{ uri: p }}
                style={{ width: size, height: size }}
              />
            ) : (
              <Text style={{ color: COLORS.subtext, fontSize: 24 }}>＋</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {error ? (
        <Text style={{ color: COLORS.danger, marginTop: 10 }}>{error}</Text>
      ) : null}
    </ScrollView>
  );
});

export default Photos;
