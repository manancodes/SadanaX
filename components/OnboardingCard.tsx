import { View, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export function OnboardingCard({ children }: any) {
  return <View style={styles.card}>{children}</View>;
}

OnboardingCard.IndexDot = ({ index, scrollX }: any) => {
  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      scrollX.value,
      [index - 1, index, index + 1],
      [8, 20, 8]
    );
    const opacity = interpolate(
      scrollX.value,
      [index - 1, index, index + 1],
      [0.4, 1, 0.4]
    );
    return { width, opacity };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const styles = StyleSheet.create({
  card: {
    marginTop: 80,
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(20px)",
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    marginHorizontal: 4,
  },
});
