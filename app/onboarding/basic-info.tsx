import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import colors from "@/theme/colors";
import { calcAge } from "@/utils/calcAge";
import PaginationDots from "@/components/PaginationDots";

export default function BasicInfoScreen() {
  const [bio, setBio] = useState("");
  const [date, setDate] = useState<Date>(new Date(2000, 0, 1));

  const age = calcAge(date);

  function onChange(e: any, selected: any) {
    const current = selected || date;
    setDate(current);
  }

  const canContinue = bio.trim().length > 3 && age && age >= 18;

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
        <Text style={{ color: colors.text, fontSize: 28, fontWeight: "700" }}>
          About You
        </Text>
        <Text style={{ color: colors.textSecondary, marginTop: 8 }}>
          Your age & bio will appear on your profile.
        </Text>

        <Text style={{ color: colors.textSecondary, marginTop: 30 }}>Bio</Text>
        <TextInput
          placeholder="Tell us something..."
          value={bio}
          onChangeText={setBio}
          placeholderTextColor="#666"
          style={{
            backgroundColor: colors.card,
            marginTop: 8,
            padding: 16,
            color: colors.text,
            borderRadius: 12,
          }}
        />

        <Text style={{ color: colors.textSecondary, marginTop: 25 }}>
          Birth Date
        </Text>

        <View className="flex items-center">
          <DateTimePicker
            value={date}
            display="spinner"
            onChange={onChange}
            textColor="white"
            maximumDate={new Date()}
          />
        </View>
      </View>

      <PaginationDots total={6} current={2} />

      <TouchableOpacity
        onPress={() => router.push("/onboarding/location")}
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
