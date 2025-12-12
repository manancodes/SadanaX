import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserProfile } from "@/constants/data";

interface Props {
  user: UserProfile;
  onSendRequest?: (id: string) => void;
}

const ProfileCard: React.FC<Props> = ({ user, onSendRequest }) => {
  const genderIcon =
    user.gender === "male"
      ? "male"
      : user.gender === "female"
      ? "female"
      : "male-female";

  return (
    <View className="w-full bg-card rounded-3xl p-2 mb-4 shadow-lg shadow-black/40 border border-white/5 flex-row items-center">
      <Image
        source={{ uri: user.imageUrl }}
        className="w-20 h-20 rounded-2xl mr-2"
        resizeMode="cover"
      />

      <View className="flex-1 justify-between h-20 px-2 pb-2 ">
        <View className="flex flex-row justify-between h-full">
          <View>
            <View className="flex-row items-center  flex-wrap mb-2 ">
              <Text className="text-text text-xl font-semibold mr-2">
                {user.name}
              </Text>
              <Text className="text-text text-xl opacity-80">{user.age}</Text>

              <Ionicons
                name={genderIcon}
                size={14}
                color="#fff"
                style={{ marginLeft: 6 }}
              />
            </View>

            <View className="flex-row items-center">
              <Ionicons name="location-sharp" size={12} color="#aaa" />
              <Text className="text-subtext ml-1">{user.location}</Text>
            </View>

            <View className="flex-row items-center mt-1">
              <Ionicons name="people" size={12} color="#aaa" />
              <Text className="text-subtext ml-1">{user.mutuals} mutuals</Text>
            </View>
          </View>

          <Pressable
            onPress={() => onSendRequest?.(user.id)}
            className="bg-accent p-2 self-end rounded-full active:opacity-80 mt-2"
          >
            <Ionicons name={"add"} size={18} color="#000" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default React.memo(ProfileCard);
