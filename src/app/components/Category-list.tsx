import { Badge } from "@/components/Badge";
import { View, Text } from "react-native";

export default function CategoryList() {
  return (
    <View className="flex-row px-5 pt-5  w-full justify-between">
      <Badge
        label="Trending Now"
        variant={"secondary"}
        labelClasses="text-white "
      />
      <Badge label="All" labelClasses="text-gray-500" />
      <Badge label="New" labelClasses="text-gray-500"/>
    </View>
  );
}
