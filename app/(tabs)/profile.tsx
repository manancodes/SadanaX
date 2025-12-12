import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreeen() {
  const [username, setUsername] = useState("@MananCodes");
  const [bio, setBio] = useState("Coder • Dreamer • Exploring life & tech 🚀");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/300?img=54");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const posts = [
    "https://i.pravatar.cc/300?1",
    "https://i.pravatar.cc/300?2",
    "https://i.pravatar.cc/300?3",
    "https://i.pravatar.cc/300?4",
    "https://i.pravatar.cc/300?5",
    "https://i.pravatar.cc/300?6",
  ];

  const saveChanges = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-neutral-950 relative">
      {/* <ProfileScreen /> */}
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={{
          zIndex: 10,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 75,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: "https://picsum.photos/900/300" }}
          className="h-60 w-full rounded-3xl"
        />
        <View className="items-center -mt-14">
          <Image
            source={{ uri: avatar }}
            className="h-40 w-40 rounded-full border-8 border-neutral-950"
          />
          <Text className="text-white text-2xl font-bold mt-3">{username}</Text>
          <Text className="text-neutral-300 text-center px-10 mt-1">{bio}</Text>
        </View>
        <View className="flex-row justify-center gap-4 px-6 mt-6">
          <Pressable
            className="flex-1 items-center py-3 rounded-xl bg-neutral-800 active:opacity-80"
            onPress={() => setIsModalVisible(true)}
          >
            <Text className="text-white font-semibold">Edit Profile</Text>
          </Pressable>
          <Pressable className="flex-1 items-center py-3 rounded-xl bg-neutral-800 active:opacity-80">
            <Text className="text-white font-semibold">Share Profile</Text>
          </Pressable>
        </View>
        <Text className="text-xl font-semibold text-white mt-10 px-6 mb-3">
          Posts
        </Text>

        <View className="flex-row flex-wrap gap-2 p-1">
          {posts.map((url, i) => (
            <View key={i} className="w-[32%]">
              <Image
                source={{ uri: url }}
                className="w-full h-44 rounded border border-neutral-900"
                resizeMode="cover"
              />
            </View>
          ))}
        </View>
        <View className="mb-4" />
      </ScrollView>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View className="flex-1 bg-black/85 justify-center px-6">
          <View className="bg-neutral-900 rounded-xl p-6">
            <Text className="text-xl text-white font-semibold mb-4 text-center">
              Edit Profile
            </Text>

            <Text className="text-neutral-400 mb-1">Username</Text>
            <TextInput
              className="bg-neutral-800 text-white rounded-lg px-3 py-2 mb-3"
              value={username}
              onChangeText={setUsername}
            />

            <Text className="text-neutral-400 mb-1">Bio</Text>
            <TextInput
              className="bg-neutral-800 text-white rounded-lg px-3 py-2 mb-3"
              value={bio}
              onChangeText={setBio}
              multiline
            />

            <Text className="text-neutral-400 mb-1">Avatar Image URL</Text>
            <TextInput
              className="bg-neutral-800 text-white rounded-lg px-3 py-2 mb-5"
              value={avatar}
              onChangeText={setAvatar}
            />

            <View className="flex-row gap-3">
              <Pressable
                className="flex-1 items-center py-3 rounded-lg bg-neutral-700"
                onPress={() => setIsModalVisible(false)}
              >
                <Text className="text-white font-semibold">Cancel</Text>
              </Pressable>
              <Pressable
                className="flex-1 items-center py-3 rounded-lg bg-white"
                onPress={saveChanges}
              >
                <Text className="font-semibold">Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
