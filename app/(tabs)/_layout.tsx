import {
  NativeTabs,
  Icon,
  Label,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        {Platform.select({
          ios: <Icon sf="house" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="home" />} />
          ),
        })}
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        {Platform.select({
          ios: <Icon sf="globe" />,
          android: (
            <Icon
              src={<VectorIcon family={MaterialIcons} name="travel-explore" />}
            />
          ),
        })}
        <Label>Explore</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        {Platform.select({
          ios: <Icon sf="person" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="person" />} />
          ),
        })}
        <Label>Profile</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        {Platform.select({
          ios: <Icon sf="gear" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="settings" />} />
          ),
        })}
        <Label>Settings</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
