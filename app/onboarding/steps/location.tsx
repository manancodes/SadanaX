// app/onboarding/steps/Location.tsx
import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import COLORS from "@/theme/colors";

type StepRef = { validate?: () => boolean | Promise<boolean> };

const LocationStep = forwardRef<StepRef>((_props, ref) => {
  const [label, setLabel] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (!label) {
        setError("Please share your location.");
        return false;
      }
      setError(null);
      return true;
    },
  }));

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }
      const pos = await Location.getCurrentPositionAsync({});
      const geos = await Location.reverseGeocodeAsync({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      if (geos.length > 0) {
        const g = geos[0];
        setLabel([g.city, g.region, g.country].filter(Boolean).join(", "));
      }
      setLoading(false);
    })();
  }, []);

  async function requestPermission() {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Location denied.");
      setLoading(false);
      return;
    }
    const pos = await Location.getCurrentPositionAsync({});
    const geos = await Location.reverseGeocodeAsync({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    });
    if (geos.length > 0) {
      const g = geos[0];
      setLabel([g.city, g.region, g.country].filter(Boolean).join(", "));
    }
    setLoading(false);
  }

  return (
    <View className="flex-1 bg-bg px-6 pt-8">
      <Text className="text-2xl text-text font-bold">Where are you?</Text>
      <Text className="text-subtext mt-2">
        Approximate location helps us show people nearby.
      </Text>

      <View className="mt-6">
        {loading ? (
          <ActivityIndicator size={"large"} color={COLORS.accent} />
        ) : label ? (
          <View className="bg-card p-4 rounded-xl">
            <Text className="text-subtext">Detected location</Text>
            <Text className="text-text mt-2 font-semibold">{label}</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={requestPermission}
            className="bg-accent px-4 py-3 rounded-xl items-center"
          >
            <Text className="text-black font-semibold">Share my location</Text>
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text className="text-danger mt-3">{error}</Text> : null}
    </View>
  );
});

export default LocationStep;
