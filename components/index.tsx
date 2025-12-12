import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import SectionTitle from "./SectionTitle";

export function LoginScreen() {
  return (
    <View className="flex-1 bg-neutral-950 justify-center px-8">
      <Text className="text-4xl font-extrabold text-white mb-10">
        Welcome Back
      </Text>

      <View className="space-y-4">
        <TextInput
          className="p-4 rounded-2xl bg-neutral-900 text-white"
          placeholder="Email"
          placeholderTextColor="#666"
        />
        <TextInput
          className="p-4 rounded-2xl bg-neutral-900 text-white"
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
        />
      </View>

      <Pressable className="mt-8 p-4 rounded-2xl bg-pink-600">
        <Text className="text-center text-white text-lg font-semibold">
          Login
        </Text>
      </Pressable>

      <Text className="text-neutral-400 text-center mt-6">
        Don't have an account? Sign Up
      </Text>
    </View>
  );
}
export function OnboardingScreen() {
  return (
    <ScrollView className="flex-1 bg-neutral-950 px-6 py-10">
      <SectionTitle title="Create Profile" subtitle="Tell us about yourself" />

      <Text className="text-white mb-2">Full Name</Text>
      <TextInput
        className="p-4 bg-neutral-900 rounded-2xl text-white mb-4"
        placeholder="Your name"
        placeholderTextColor="#777"
      />

      <Text className="text-white mb-2">Bio</Text>
      <TextInput
        className="p-4 bg-neutral-900 rounded-2xl text-white mb-4"
        placeholder="Tell something about yourself"
        placeholderTextColor="#777"
        multiline
      />

      <Text className="text-white mb-2">Profile Photo</Text>
      <Pressable className="w-full h-44 bg-neutral-900 rounded-2xl justify-center items-center border border-neutral-700 mb-6">
        <Text className="text-neutral-500">Upload Image</Text>
      </Pressable>

      <Pressable className="p-4 rounded-2xl bg-pink-600">
        <Text className="text-white text-center text-lg font-semibold">
          Continue
        </Text>
      </Pressable>
    </ScrollView>
  );
}
export function ProfileScreen() {
  const posts = new Array(9)
    .fill(0)
    .map((_, i) => `https://picsum.photos/400?random=${i}`);

  return (
    <ScrollView className="flex-1 bg-neutral-950">
      {/* HEADER */}
      <View className="items-center py-10">
        <Image
          source={{ uri: "https://i.pravatar.cc/200" }}
          className="w-32 h-32 rounded-full mb-4"
        />
        <Text className="text-white text-2xl font-bold">Manan</Text>
        <Text className="text-neutral-400">
          Building something revolutionary 🔥
        </Text>
      </View>

      {/* STATS */}
      <View className="flex-row justify-around pb-6">
        <View className="items-center">
          <Text className="text-white text-xl font-bold">1</Text>
          <Text className="text-neutral-400 text-sm">Posts Today</Text>
        </View>
        <View className="items-center">
          <Text className="text-white text-xl font-bold">12 km</Text>
          <Text className="text-neutral-400 text-sm">Avg Range</Text>
        </View>
      </View>

      {/* GRID */}
      <FlatList
        data={posts}
        numColumns={3}
        scrollEnabled={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} className="w-1/3 h-40" />
        )}
      />
    </ScrollView>
  );
}
