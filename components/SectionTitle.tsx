import React from "react";
import { View, Text } from "react-native";

export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View className="mb-4">
      <Text className="text-white text-2xl font-bold">{title}</Text>
      {subtitle && <Text className="text-neutral-400 text-sm">{subtitle}</Text>}
    </View>
  );
}
