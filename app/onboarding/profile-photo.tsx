import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { router } from "expo-router";
import colors from "@/theme/colors";
import PaginationDots from "@/components/PaginationDots";

export default function ProfilePhotoScreen() {
  const [photo, setPhoto] = useState<string | null>(null);

  async function pickImage() {
    const res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!res.canceled) setPhoto(res.assets[0].uri);
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
      <View style={{ alignItems: "center", marginTop: 60 }}>
        <Text style={{ color: colors.text, fontSize: 28, fontWeight: "700" }}>
          Add a Profile Photo
        </Text>
        <Text style={{ color: colors.textSecondary, marginTop: 8 }}>
          This will appear on your profile
        </Text>

        <TouchableOpacity
          onPress={pickImage}
          style={{
            width: 150,
            height: 150,
            borderRadius: 150,
            backgroundColor: colors.card,
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {photo ? (
            <Image
              source={{ uri: photo }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 150,
              }}
            />
          ) : (
            <Text style={{ color: colors.textSecondary }}>Upload</Text>
          )}
        </TouchableOpacity>
      </View>

      <PaginationDots total={6} current={1} />

      <TouchableOpacity
        onPress={() => router.push("/onboarding/basic-info")}
        disabled={!photo}
        style={{
          backgroundColor: photo ? colors.primary : "#333",
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
