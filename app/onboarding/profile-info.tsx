import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import COLORS from "@/theme/colors";
import OnboardingFooter from "@/components/OnboardingFooter";
import { calcAge } from "@/utils/calcAge";
export default function ProfileInfoScreen() {
  const total = 6;
  const current = 1;
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState<Date>(new Date(2000, 0, 1));
  const [showPicker, setShowPicker] = useState(false);
  const [bio, setBio] = useState("");
  const [ageModalVisible, setAgeModalVisible] = useState(false);
  const [computedAge, setComputedAge] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  async function pickPhoto() {
    const res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!res.canceled) setPhoto(res.assets[0].uri);
  }
  function onChangeBirth(e: any, selected?: Date) {
    if (!selected) return;
    setBirthDate(selected);
  }
  function validate() {
    if (!photo) {
      setError("Add a profile photo to continue.");
      return false;
    }
    if (!birthDate) {
      setError("Please select your birth date.");
      return false;
    }
    if (computedAge !== null && computedAge < 18) {
      setError("You must be at least 18 years old to use this app.");
      return false;
    }
    if (name.trim().length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return false;
    }
    setError(null);
    return true;
  }
  function confirmAge(confirmed: boolean) {
    if (!confirmed) {
      setBirthDate(new Date(2000, 0, 1));
      setComputedAge(null);
      setAgeModalVisible(false);
      return;
    }
    setAgeModalVisible(false);
    if (!validate()) return;
    router.push("/onboarding/interests");
  }
  function handleNext() {
    const age = calcAge(birthDate);
    setComputedAge(age);
    setAgeModalVisible(true);
  }
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        padding: 20,
        justifyContent: "space-between",
      }}
    >
      <ScrollView>
        <Text style={{ color: COLORS.text, fontSize: 28, fontWeight: "700" }}>
          Create your profile
        </Text>
        <Text style={{ color: COLORS.subtext, marginTop: 8 }}>
          Your age and location will be visible on your profile. Bio is
          optional.
        </Text>
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <TouchableOpacity
            onPress={pickPhoto}
            style={{
              width: 130,
              height: 130,
              borderRadius: 130,
              backgroundColor: COLORS.card,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
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
          <Text style={{ color: COLORS.subtext, marginBottom: 8 }}>
            Birth date
          </Text>
          <DateTimePicker
            value={birthDate || new Date(2000, 0, 1)}
            maximumDate={new Date()}
            textColor="white"
            mode="date"
            display="spinner"
            onChange={onChangeBirth}
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: COLORS.subtext, marginBottom: 8 }}>
            Bio (optional)
          </Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            placeholder="A short line about you"
            placeholderTextColor={COLORS.subtext}
            style={{
              backgroundColor: COLORS.card,
              color: COLORS.text,
              padding: 12,
              borderRadius: 10,
              minHeight: 80,
            }}
            multiline
          />
        </View>
        {error ? (
          <Text style={{ color: COLORS.danger, marginTop: 10 }}>{error}</Text>
        ) : null}
      </ScrollView>
      {/* age confirmation modal */}
      <Modal
        visible={ageModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAgeModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: COLORS.card,
              padding: 20,
              borderRadius: 12,
            }}
          >
            <Text
              className=" text-center font-bold text-lg"
              style={{ color: COLORS.subtext }}
            >
              Confirm your age
            </Text>
            <Text
              className=" text-center font-bold text-5xl mt-4"
              style={{ color: COLORS.text }}
            >
              {computedAge}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => confirmAge(false)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: COLORS.card,
                  marginRight: 8,
                }}
              >
                <Text style={{ color: COLORS.text, textAlign: "center" }}>
                  Change
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => confirmAge(true)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: COLORS.accent,
                  marginLeft: 8,
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <OnboardingFooter
        total={6}
        current={current}
        onBack={() => router.back()}
        onNext={handleNext}
        disabled={false}
        errorText={error ?? null}
      />
    </SafeAreaView>
  );
}
