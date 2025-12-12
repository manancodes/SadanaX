import { View, Text, Pressable, TextInput } from "react-native";
import { useAuthStore } from "@/utils/authStore";

export default function LoginScreen() {
  const { logIn } = useAuthStore();
  return (
    <View className="flex-1 bg-neutral-950 justify-center px-8">
      <Text className="text-4xl font-extrabold text-white mb-10">
        Welcome Back
      </Text>

      <TextInput
        className="p-4 rounded-2xl mb-2 bg-neutral-900 text-white"
        placeholder="Email"
        placeholderTextColor="#666"
      />
      <TextInput
        className="p-4 rounded-2xl bg-neutral-900 text-white"
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
      />

      <Pressable className="mt-8 p-4 rounded-2xl bg-accent" onPress={logIn}>
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
