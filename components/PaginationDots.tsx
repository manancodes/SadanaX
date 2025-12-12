// components/PaginationDots.tsx
import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import COLORS from "@/theme/colors";

export default function PaginationDots({
  total,
  current,
  scrollX,
}: {
  total: number;
  current: number;
  scrollX?: Animated.Value;
}) {
  const anim = useRef(
    Array.from({ length: total }).map(
      (_, i) => new Animated.Value(i === current ? 1 : 0)
    )
  ).current;

  useEffect(() => {
    const seq = anim.map((v, i) =>
      Animated.timing(v, {
        toValue: i === current ? 1 : 0,
        duration: 220,
        useNativeDriver: false,
      })
    );
    Animated.parallel(seq).start();
  }, [current]);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {anim.map((v, i) => {
        const width = v.interpolate({
          inputRange: [0, 1],
          outputRange: [8, 22],
        });
        const opacity = v.interpolate({
          inputRange: [0, 1],
          outputRange: [0.45, 1],
        });
        return (
          <Animated.View
            key={i}
            style={{
              width,
              height: 8,
              borderRadius: 8,
              backgroundColor:
                i === current ? COLORS.accent : "rgba(255,255,255,0.12)",
              opacity,
              marginHorizontal: 6,
            }}
          />
        );
      })}
    </View>
  );
}
