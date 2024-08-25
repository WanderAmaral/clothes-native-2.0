import { Card, CardContent } from "@/components/Card";
import { useUser } from "@clerk/clerk-expo";
import { View, Text, Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function User() {
  const { user } = useUser();
  return (
    <View className="items-center justify-center ">
      <View className="h-[400px] gap-2 items-center justify-center ">
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full h-32 w-32"
        />
        <Text className="text-3xl font-bold">{user?.fullName}</Text>
        <Text className=" font-medium text-xl">
          {user?.emailAddresses?.[0]?.emailAddress ?? "No email available"}
        </Text>
      </View>
      <View
        style={{
          width: "90%",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
          backgroundColor: "white",
          borderRadius: 8,
        }}
      >
        <Card>
          <CardContent className="p-0 px-5 py-3 gap-5">
            <View className="justify-between flex-row">
              <View className="flex-row  items-center gap-3">
                <MaterialCommunityIcons name="newspaper" size={24} />
                <Text className="font-medium text-xl">
                  Edit profile information
                </Text>
              </View>
            </View>
            <View className="justify-between flex-row">
              <View className="flex-row  items-center gap-3">
                <MaterialCommunityIcons name="bell" size={24} />
                <Text className="font-medium text-xl">Notifications</Text>
              </View>

              <Text className=" uppercase text-blue-600 text-xl">On</Text>
            </View>
            <View className="justify-between flex-row">
              <View className="flex-row  items-center gap-3">
                <Ionicons name="language" size={24} />
                <Text className="font-medium text-xl">Language</Text>
              </View>

              <Text className=" capitalize text-blue-600 text-xl">English</Text>
            </View>
            <View className="justify-between flex-row">
              <View className="flex-row  items-center gap-3">
                <MaterialCommunityIcons name="theme-light-dark" size={24} />
                <Text className="font-medium text-xl">Themes</Text>
              </View>

              <Text className=" capitalize text-blue-600 text-xl">
                Light mode
              </Text>
            </View>
          </CardContent>
        </Card>
      </View>
    </View>
  );
}
