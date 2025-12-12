import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import ProfileCard from "@/components/ProfileCard";
import { nearMeData as sampleUsers } from "@/constants/data";
import { router } from "expo-router";
import SectionTitle from "@/components/SectionTitle";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const sections = [
    { title: "Near you", filter: "nearby" },
    { title: "Similar Age", filter: "similar_age" },
    { title: "Same City", filter: "same_city" },
  ];

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-bg pt-6">
      <ScrollView className="flex-1 px-4 pb-4">
        <SectionTitle title="Explore" subtitle="Explore new people" />

        {sections.map((section, index) => (
          <View key={index} className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-text text-xl font-semibold">
                {section.title}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/explore/exploreList",
                    params: { prefilter: "nearMe" },
                  })
                }
              >
                <Text className="text-accent text-sm font-medium">
                  See more
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView>
              {sampleUsers.slice(0, 3).map((user) => (
                <View key={user.id} className="w-full">
                  <ProfileCard user={user} />
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
