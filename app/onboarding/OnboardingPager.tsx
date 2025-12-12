import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import PagerView from "react-native-pager-view";
import { useRouter } from "expo-router";
import COLORS from "@/theme/colors";
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

  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onPageSelected = useCallback((e: any) => {
    setIndex(e.nativeEvent.position);
  }, []);

  const goTo = useCallback((i: number) => {
    if (i < 0 || i >= STEPS.length) return;
    pagerRef.current?.setPage(i);
    setIndex(i);
  }, []);

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
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.bg }}>
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={onPageSelected}
        onPageScroll={(e: any) => {
          // e.nativeEvent.position is page index, e.nativeEvent.offset is progress to next
          // we map to continuous value for dot animation: position + offset
          const pos = e.nativeEvent.position + e.nativeEvent.offset;
          scrollX.setValue(pos);
        }}
      >
        {STEPS.map((s, i) => {
          const Step = s.Component;
          return (
            <View key={s.key} style={{ width }}>
              {/* pass ref for validate() */}
              <Step ref={stepRefs[i]} />
            </View>
          );
        })}
      </PagerView>

      {/* Footer */}
      <View className="absolute left-4 right-4 bottom-10 bg-gradient-to-t from-transparent to-black">
        {/* Dots */}
        <View className="items-center mb-4">
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {STEPS.map((_, i) => {
              // animated width and opacity using interpolation from scrollX (position+offset)
              const widthAnim = scrollX.interpolate({
                inputRange: STEPS.map((__, idx) => idx),
                outputRange: STEPS.map((__, idx) => (idx === i ? 22 : 8)),
                extrapolate: "clamp",
              });
              const opacityAnim = scrollX.interpolate({
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
                      i === index ? COLORS.accent : "rgba(255,255,255,0.12)",
                    opacity: opacityAnim,
                    marginHorizontal: 6,
                  }}
                />
              );
            })}
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.8}
            className={`px-5 py-3 rounded-full ${
              index === 0
                ? "bg-[rgba(255,255,255,0.03)] opacity-50"
                : "bg-[rgba(255,255,255,0.04)]"
            }`}
          >
            <Text className="text-white">Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.85}
            className="px-6 py-3 rounded-full"
            style={{ backgroundColor: COLORS.accent }}
          >
            <Text className="text-black font-semibold">
              {index === STEPS.length - 1 ? "Get Started" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
