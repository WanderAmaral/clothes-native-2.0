import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { View } from "react-native";

export default function CategoryList({
  onSelectCategory,
  selectedCategory,
}: {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}) {
  return (
    <View className="flex-row px-5 pt-5  w-full justify-between">
      <Button
        label="All Products"
        variant={selectedCategory === "All Products" ? "primary" : "secondary"}
        labelClasses={
          selectedCategory === "All Products" ? "text-white" : "text-gray-500"
        }
        onPress={() => onSelectCategory("All Products")}
      />
      <Button
        label="Men's"
        variant={
          selectedCategory === "men's clothing" ? "primary" : "secondary"
        }
        labelClasses={
          selectedCategory === "men's clothing" ? "text-white" : "text-gray-500"
        }
        onPress={() => onSelectCategory("men's clothing")}
      />
      <Button
        label="Women's"
        variant={
          selectedCategory === "women's clothing" ? "primary" : "secondary"
        }
        labelClasses={
          selectedCategory === "women's clothing"
            ? "text-white"
            : "text-gray-500"
        }
        onPress={() => onSelectCategory("women's clothing")}
      />
    </View>
  );
}
