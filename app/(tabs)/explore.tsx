import SectionTitle from "@/components/SectionTitle";
import React from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const people = [
    {
      id: 1,
      name: "Aisha",
      distance: "200m",
      img: "https://i.pravatar.cc/150?img=32",
    },
    {
      id: 2,
      name: "Kabir",
      distance: "900m",
      img: "https://i.pravatar.cc/150?img=45",
    },
    {
      id: 3,
      name: "Meera",
      distance: "1.5 km",
      img: "https://i.pravatar.cc/150?img=12",
    },
  ];

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-neutral-950 relative">
      <ScrollView className="flex-1 px-6 py-10">
        <SectionTitle title="Explore" subtitle="Find new people near you" />

        {/* FILTERS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row mb-6 space-x-3"
        >
          {["Nearby", "500m", "1 km", "5 km", "10 km"].map((f) => (
            <Pressable
              key={f}
              className="px-4 py-2 bg-neutral-900 rounded-full border border-neutral-700"
            >
              <Text className="text-white">{f}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* USERS */}
        {people.map((p) => (
          <View
            key={p.id}
            className="flex-row items-center mb-5 bg-neutral-900 rounded-2xl p-4"
          >
            <Image
              source={{ uri: p.img }}
              className="w-16 h-16 rounded-full mr-4"
            />
            <View>
              <Text className="text-white text-lg font-semibold">{p.name}</Text>
              <Text className="text-neutral-400 text-sm">
                {p.distance} away
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
