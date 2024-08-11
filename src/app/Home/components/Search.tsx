import { Ionicons } from "@expo/vector-icons";
import { View, TextInput } from "react-native";

export default function Search() {
  return (
    <View className="flex-row items-center px-4 justify-center w-full">
      <View className="flex-row items-center bg-white rounded-full w-full h-16 px-4">
        <Ionicons name="search" size={24} className="mr-2 " color={'#d1d5db'} />
        <TextInput placeholder="Search" className="flex-1 h-full text-xl text-[#d1d5db]" placeholderTextColor="#d1d5db"  />
      </View>
    </View>
  );
}
