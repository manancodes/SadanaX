import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import COLORS from "@/theme/colors";

export default function PaginationDots({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  const animValues = useRef(
    Array.from({ length: total }).map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // animate all to small, then animate current to large
    const animations = animValues.map((v, idx) =>
      Animated.timing(v, {
        toValue: idx === current ? 1 : 0,
        delay: 200,
        duration: 260,
        useNativeDriver: false,
      })
    );
    Animated.parallel(animations).start();
  }, [current, animValues]);

  return (
    <View style={styles.row}>
      {animValues.map((val, i) => {
        const width = val.interpolate({
          inputRange: [0, 1],
          outputRange: [8, 20],
        });
        const opacity = val.interpolate({
          inputRange: [0, 1],
          outputRange: [0.45, 1],
        });
        return (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                width,
                opacity,
                backgroundColor:
                  i === current ? COLORS.accent : "rgba(255,255,255,0.16)",
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
});
