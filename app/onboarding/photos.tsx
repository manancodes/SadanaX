import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import PaginationDots from "@/components/PaginationDots";
import colors from "@/theme/colors";

const size = (Dimensions.get("window").width - 60) / 3;

export default function PhotosScreen() {
  const [photos, setPhotos] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  async function pick(i: number) {
    const res = await ImagePicker.launchImageLibraryAsync({
      quality: 0.8,
    });

    if (!res.canceled) {
      const updated = [...photos];
      updated[i] = res.assets[0].uri;
      setPhotos(updated);
    }
  }

  const canContinue = photos.filter(Boolean).length >= 1;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text
          style={{
            color: colors.text,
            fontSize: 28,
            fontWeight: "700",
            marginTop: 20,
          }}
        >
          Add Photos
        </Text>
        <Text style={{ color: colors.textSecondary, marginTop: 8 }}>
          Add up to 6 photos. At least 1 is required.
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 30,
            gap: 10,
            justifyContent: "center",
          }}
        >
          {photos.map((p, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => pick(i)}
              style={{
                width: size,
                height: size,
                backgroundColor: colors.card,
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {p ? (
                <Image
                  source={{ uri: p }}
                  style={{
                    width: size,
                    height: size,
                    borderRadius: 12,
                  }}
                />
              ) : (
                <Text style={{ color: colors.textSecondary }}>+</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <PaginationDots total={6} current={4} />

      <TouchableOpacity
        onPress={() => router.push("/onboarding/finish")}
        disabled={!canContinue}
        style={{
          backgroundColor: canContinue ? colors.primary : "#333",
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
