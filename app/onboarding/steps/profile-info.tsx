import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { calcAge } from "@/utils/calcAge";

type StepRef = { validate?: () => boolean | Promise<boolean> };

const ProfileInfo = forwardRef<StepRef>((_props, ref) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState(""); // ← bio field
  const [dob, setDob] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (!photo) {
        setError("Add a profile photo.");
        return false;
      }
      if (name.trim().length < 2) {
        setError("Enter a name (min 2 chars).");
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

  async function pickPhoto() {
    const res = await ImagePicker.launchImageLibraryAsync({
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!res.canceled) setPhoto(res.assets[0].uri);
  }

  return (
    <ScrollView className="flex-1 px-6 pt-8">
      <Text className="text-2xl text-text font-bold">Create your profile</Text>
      <Text className="text-subtext mt-2">
        Your age and location will be visible — bio is optional.
      </Text>

      <View className="items-center mt-6">
        <TouchableOpacity
          onPress={pickPhoto}
          className="w-32 h-32 rounded-full bg-card items-center justify-center overflow-hidden"
        >
          {photo ? (
            <Image source={{ uri: photo }} className="w-32 h-32 rounded-full" />
          ) : (
            <Text className="text-subtext">Tap to add</Text>
          )}
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <Text className="text-text font-semibold mb-2">Full name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="How should we call you?"
          placeholderTextColor="#9A9A9A"
          className="bg-card text-text p-3 rounded-xl"
        />
      </View>

      <View className="mt-4">
        <Text className="text-text font-semibold mb-2">Bio (optional)</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us something about you..."
          placeholderTextColor="#9A9A9A"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          className="bg-card text-text p-3 rounded-xl h-32"
        />
      </View>

      <View className="mt-4">
        <Text className="text-text font-semibold mb-2">Birth date</Text>

        <DateTimePicker
          value={dob}
          maximumDate={new Date()}
          mode="date"
          display="spinner"
          onChange={(e, selected) => setDob(selected || dob)}
        />
      </View>

      {/* Error */}
      {error ? <Text className="text-danger mt-3">{error}</Text> : null}
    </ScrollView>
  );
});

export default ProfileInfo;
