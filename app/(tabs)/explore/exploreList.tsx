import React, { useState, useMemo } from "react";
import { Text, ScrollView, Pressable, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import ProfileCard from "@/components/ProfileCard";
import { nearMeData as sampleUsers } from "@/constants/data";
import { SafeAreaView } from "react-native-safe-area-context";

const QUICK_FILTERS = [
  { id: "nearby", label: "Near You" },
  { id: "similar_age", label: "Similar Age" },
  { id: "same_city", label: "Same City" },
  { id: "interests", label: "Interests" },
];

export default function ExploreScreen() {
  const route = useRoute();
  const prefilter = (route.params as any)?.prefilter;

  const [activeFilter, setActiveFilter] = useState(prefilter || "nearby");

  const filteredUsers = useMemo(() => {
    switch (activeFilter) {
      case "similar_age":
        return sampleUsers.filter((a) => a.age > 25);
      case "same_city":
        return sampleUsers.filter((u) => u.location === "Los Angeles, CA");
      case "interests":
        return sampleUsers.filter((a) => a.mutuals > 2);
      default:
        return sampleUsers;
    }
  }, [activeFilter]);

  return (
    <SafeAreaView className="flex-1 px-4 pt-4 bg-bg">
      <FlatList
        ListHeaderComponent={
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {QUICK_FILTERS.map((f) => (
              <Pressable
                key={f.id}
                onPress={() => setActiveFilter(f.id)}
                className={`px-4 py-2 h-10 rounded-full mr-3 border ${
                  activeFilter === f.id
                    ? "bg-accent border-accent"
                    : "border-white/10"
                }`}
              >
                <Text
                  className={`${
                    activeFilter === f.id ? "text-black" : "text-text"
                  } font-medium`}
                >
                  {f.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        }
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProfileCard user={item} />}
      />
    </SafeAreaView>
  );
}
