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
        const lbl = [g.city, g.region, g.country].filter(Boolean).join(", ");
        setLabel(lbl);
      }
      setLoading(false);
    })();
  }, []);

  async function requestPermission() {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Location permission denied.");
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
      const lbl = [g.city, g.region, g.country].filter(Boolean).join(", ");
      setLabel(lbl);
    }
    setLoading(false);
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        backgroundColor: COLORS.bg,
      }}
    >
      <Text style={{ color: COLORS.text, fontSize: 28, fontWeight: "700" }}>
        Where are you?
      </Text>
      <Text style={{ color: COLORS.subtext, marginTop: 8 }}>
        Approximate location helps us show people nearby.
      </Text>

      <View style={{ marginTop: 24 }}>
        {loading ? (
          <ActivityIndicator color={COLORS.accent} />
        ) : label ? (
          <View
            style={{
              backgroundColor: COLORS.card,
              padding: 14,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: COLORS.subtext }}>Detected location</Text>
            <Text
              style={{ color: COLORS.text, marginTop: 6, fontWeight: "600" }}
            >
              {label}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={requestPermission}
            style={{
              backgroundColor: COLORS.accent,
              padding: 12,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#000", fontWeight: "700" }}>
              Share my location
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <Text style={{ color: COLORS.danger, marginTop: 12 }}>{error}</Text>
      ) : null}
    </View>
  );
});

export default LocationStep;
