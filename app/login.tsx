import { View, Text, Pressable } from "react-native";
import { useAuthStore } from "@/utils/authStore";

export default function LoginScreen() {
  const { logIn } = useAuthStore();
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white text-3xl font-bold mb-8">Demo Login</Text>

      <Pressable onPress={logIn} className="px-6 py-3 bg-white/10 rounded-xl">
        <Text className="text-white text-lg">Enter App</Text>
      </Pressable>
    </View>
  );
}
