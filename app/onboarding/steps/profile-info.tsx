// app/onboarding/steps/ProfileInfo.tsx
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import COLORS from "@/theme/colors";
import { calcAge } from "@/utils/calcAge";

type StepRef = { validate?: () => boolean | Promise<boolean> };

const ProfileInfo = forwardRef<StepRef>((_props, ref) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (!photo) {
        setError("Add a profile photo.");
        return false;
      }
      if (name.trim().length < 2) {
        setError("Name must be at least 2 characters.");
        return false;
      }
      if (!dob || calcAge(dob) < 18) {
        setError("You must be at least 18 years old.");
        return false;
      }
      setError(null);
      return true;
    },
  }));

  async function pickImage() {
    const r = await ImagePicker.launchImageLibraryAsync({
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!r.canceled) setPhoto(r.assets[0].uri);
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        backgroundColor: COLORS.bg,
      }}
    >
      <Text style={{ color: COLORS.text, fontSize: 28, fontWeight: "700" }}>
        Create your profile
      </Text>
      <Text style={{ color: COLORS.subtext, marginTop: 8 }}>
        Your age and location will be visible on your profile.
      </Text>

      <View style={{ alignItems: "center", marginTop: 28 }}>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            width: 130,
            height: 130,
            borderRadius: 130,
            backgroundColor: COLORS.card,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {photo ? (
            <Image
              source={{ uri: photo }}
              style={{ width: 130, height: 130, borderRadius: 130 }}
            />
          ) : (
            <Text style={{ color: COLORS.subtext }}>Tap to add</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 22 }}>
        <Text style={{ color: COLORS.subtext, marginBottom: 8 }}>
          Full name
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="How should we call you?"
          placeholderTextColor={COLORS.subtext}
          style={{
            backgroundColor: COLORS.card,
            color: COLORS.text,
            padding: 12,
            borderRadius: 10,
          }}
        />
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={{ color: COLORS.text, marginBottom: 8 }}>Birth date</Text>
        <DateTimePicker
          value={dob || new Date(2000, 0, 1)}
          themeVariant="dark"
          maximumDate={new Date()}
          mode="date"
          display="spinner"
          onChange={(_, selected) => selected && setDob(selected)}
        />
      </View>

      {error ? (
        <Text style={{ color: COLORS.danger, marginTop: 10 }}>{error}</Text>
      ) : null}
    </View>
  );
});

export default ProfileInfo;
