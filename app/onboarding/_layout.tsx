import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import PagerView from "react-native-pager-view";
import { useRouter } from "expo-router";
import ProfileInfo from "./steps/profile-info";
import Interests from "./steps/interests";
import Photos from "./steps/photos";
import Location from "./steps/location";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/utils/authStore";

const { width } = Dimensions.get("window");

type StepRef = {
  validate?: () => boolean | Promise<boolean>;
};

const STEPS = [
  { key: "profile", Component: ProfileInfo },
  { key: "interests", Component: Interests },
  { key: "photos", Component: Photos },
  { key: "location", Component: Location },
];

export default function OnboardingPager() {
  const router = useRouter();
  const pagerRef = useRef<PagerView | null>(null);
  const stepRefs = useRef<Array<React.RefObject<StepRef | null>>>(
    STEPS.map(() => React.createRef<StepRef | null>())
  ).current;
  const { completeOnboarding } = useAuthStore();

  const [index, setIndex] = useState<number>(0);
  const anim = useRef(new Animated.Value(index)).current;

  const onPageSelected = useCallback(
    (e: any) => {
      const pos = e.nativeEvent.position;
      setIndex(pos);
      Animated.timing(anim, {
        toValue: pos,
        duration: 220,
        useNativeDriver: false,
      }).start();
    },
    [anim]
  );

  const goTo = useCallback(
    (i: number) => {
      if (i < 0 || i >= STEPS.length) return;
      pagerRef.current?.setPage(i);
      setIndex(i);
      Animated.timing(anim, {
        toValue: i,
        duration: 220,
        useNativeDriver: false,
      }).start();
    },
    [anim]
  );

  const handleNext = useCallback(async () => {
    const ref = stepRefs[index]?.current;
    if (ref && typeof ref.validate === "function") {
      try {
        const ok = await Promise.resolve(ref.validate());
        if (!ok) return;
      } catch {
        return;
      }
    }
    if (index < STEPS.length - 1) goTo(index + 1);
    else {
      completeOnboarding();
    }
  }, [index, goTo, stepRefs, router]);

  const handleBack = useCallback(() => {
    if (index === 0) return;
    goTo(index - 1);
  }, [index, goTo]);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-bg">
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={onPageSelected}
        onPageScroll={(e: any) => {
          // e.nativeEvent.position is page index, e.nativeEvent.offset is progress to next
          // we map to continuous value for dot animation: position + offset
          const pos = e.nativeEvent.position + e.nativeEvent.offset;
          anim.setValue(pos);
        }}
      >
        {STEPS.map((s, i) => {
          const Step = s.Component;
          return (
            <View key={s.key} style={{ width }}>
              <Step ref={stepRefs[i]} />
            </View>
          );
        })}
      </PagerView>

      {/* Pagination dots */}
      <View className="absolute left-4 right-4 bottom-28 items-center">
        <View className="flex-row items-center justify-center space-x-3">
          {STEPS.map((_, i) => {
            const widthAnim = anim.interpolate({
              inputRange: STEPS.map((__, idx) => idx),
              outputRange: STEPS.map((__, idx) => (idx === i ? 22 : 8)),
              extrapolate: "clamp",
            });
            const opacityAnim = anim.interpolate({
              inputRange: STEPS.map((__, idx) => idx),
              outputRange: STEPS.map((__, idx) => (idx === i ? 1 : 0.45)),
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={i}
                style={{
                  width: widthAnim,
                  height: 8,
                  borderRadius: 8,
                  backgroundColor:
                    i === index ? "#C99383" : "rgba(255,255,255,0.12)",
                  opacity: opacityAnim,
                  marginHorizontal: 6,
                }}
                className={i === index ? "bg-accent" : ""}
              />
            );
          })}
        </View>
      </View>

      {/* Footer: floating pill buttons */}
      <View className="absolute left-10 right-10 bottom-10">
        <View className="flex-row justify-between items-center">
          {index > 0 ? (
            <TouchableWithoutFeedback onPress={handleBack}>
              <Animated.View
                className={`px-5 py-3 rounded-pill ${
                  index === 0 ? "bg-pill opacity-50" : "bg-pill"
                }`}
              >
                <Text className="text-text text-xl">Back</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          ) : (
            <View />
          )}

          <TouchableWithoutFeedback onPress={handleNext}>
            <Animated.View className="px-6 py-3 rounded-pill bg-accent">
              <Text className="text-black text-xl font-semibold">
                {index === STEPS.length - 1 ? "Get Started" : "Next"}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
}
