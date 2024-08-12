import { cn } from "@/lib/utils";
import { View, Text } from "react-native";

type SizesProps = {
  text?: string;
  className?: string;
};

export default function Sizes({ text, className }: SizesProps) {
    return (
      <View
        className={cn(
          "items-center justify-center w-12 h-12 rounded-full font-semibold bg-white",
          className
        )}
      >
        {text && <Text className="font-black text-lg">{text}</Text>}
      </View>
    );
  }
