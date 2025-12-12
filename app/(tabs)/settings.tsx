import SectionTitle from "@/components/SectionTitle";
import { useAuthStore } from "@/utils/authStore";
import React, { useContext } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { logOut, resetOnboarding } = useAuthStore();
  const items = [
    { title: "Account", desc: "Privacy, security, login info" },
    { title: "Notifications", desc: "Manage alerts & permissions" },
    { title: "About", desc: "Terms, support, app info" },
  ];

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-neutral-950 relative">
      <ScrollView className="flex-1 px-6 py-10">
        <SectionTitle title="Settings" />

        {items.map((it, i) => (
          <View key={i} className="bg-neutral-900 p-5 rounded-2xl mb-4">
            <Text className="text-white text-lg font-semibold">{it.title}</Text>
            <Text className="text-neutral-500 text-sm">{it.desc}</Text>
          </View>
        ))}
        <Pressable
          onPress={logOut}
          className="mt-10 px-6 py-3 bg-red-500 rounded-xl"
        >
          <Text className="text-white text-lg">Logout</Text>
        </Pressable>
        <Pressable
          onPress={resetOnboarding}
          className="mt-10 px-6 py-3 bg-red-500 rounded-xl"
        >
          <Text className="text-white text-lg">Reset Onboarding</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            logOut();
            resetOnboarding();
          }}
          className="mt-10 px-6 py-3 bg-red-500 rounded-xl"
        >
          <Text className="text-white text-lg">Reset Both</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
