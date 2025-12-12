import { View } from "react-native";
import colors from "@/theme/colors";

export default function PaginationDots({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        justifyContent: "center",
        marginVertical: 12,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={{
            width: current === i ? 20 : 8,
            height: 8,
            borderRadius: 8,
            backgroundColor:
              current === i ? colors.accent : "rgba(255,255,255,0.3)",
          }}
        />
      ))}
    </View>
  );
}
