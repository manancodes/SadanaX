import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "@/theme/colors";
import PaginationDots from "./PaginationDots";

export default function OnboardingFooter({
  total,
  current,
  onBack,
  onNext,
  nextLabel = "Next",
  showBack = true,
  disabled = false,
  errorText,
}: {
  total: number;
  current: number;
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  showBack?: boolean;
  disabled?: boolean;
  errorText?: string | null;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingBottom: Math.max(insets.bottom, 16),
        backgroundColor: "transparent",
      }}
    >
      {errorText ? (
        <Text
          style={{ color: COLORS.danger, textAlign: "center", marginBottom: 8 }}
        >
          {errorText}
        </Text>
      ) : (
        <Text
          style={{
            color: COLORS.subtext,
            textAlign: "center",
            marginBottom: 8,
          }}
        >{`Step ${current + 1} of ${total}`}</Text>
      )}

      <PaginationDots total={total} current={current} />

      <View
        style={{
          flexDirection: "row",
          marginTop: 12,
          justifyContent: "space-between",
        }}
      >
        {showBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={{
              flex: 1,
              marginRight: 12,
              backgroundColor: COLORS.card,
              paddingVertical: 14,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: COLORS.text }}>Back</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flex: 1, marginRight: 12 }} />
        )}

        <TouchableOpacity
          onPress={onNext}
          disabled={disabled}
          style={{
            flex: 1,
            marginLeft: 12,
            backgroundColor: disabled ? COLORS.card : COLORS.accent,
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
            opacity: disabled ? 0.6 : 1,
          }}
        >
          <Text
            style={{
              color: disabled ? COLORS.subtext : "#000",
              fontWeight: "700",
            }}
          >
            {nextLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
