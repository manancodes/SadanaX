import SectionTitle from "@/components/SectionTitle";
import { FlatList, View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TimelineScreen() {
  const timelinePosts = [
    {
      id: "1",
      name: "Aarav",
      photo: "https://i.pravatar.cc/210",
      distance: "350m away",
      post: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    },
    {
      id: "2",
      name: "Riya",
      photo: "https://i.pravatar.cc/220",
      distance: "1.1 km away",
      post: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    },
  ];
  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-neutral-950 relative pt-6"
    >
      <FlatList
        className="flex-1 bg-neutral-950 px-4 pb-20"
        data={timelinePosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="my-5 rounded-2xl overflow-hidden bg-neutral-900">
            <Image source={{ uri: item.post }} className="w-full h-96" />

            <View className="p-4">
              <View className="flex-row items-center mb-2">
                <Image
                  source={{ uri: item.photo }}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <View>
                  <Text className="text-white text-lg font-semibold">
                    {item.name}
                  </Text>
                  <Text className="text-neutral-400 text-sm">
                    {item.distance}
                  </Text>
                </View>
              </View>

              <Text className="text-neutral-500 text-xs">
                Expires in 24 hrs
              </Text>
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <SectionTitle title="Today's posts" subtitle="People around you" />
        )}
        ListFooterComponent={() => (
          <View className="flex-row items-center justify-center mt-10 mb-10">
            <Text className="text-neutral-400 text-sm">
              You have seen all posts for today!
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
