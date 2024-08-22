import { View, Text, Image, Pressable, ImageBackground } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { FadeIn } from "react-native-reanimated";
import { truncateName } from "@/helpers/splitName";
import { Badge } from "@/components/Badge";
import Sizes from "../../../../components/Sizes";
import { Button } from "@/components/Button";
import { useCartStore } from "@/store/cart";
import { useAuth } from "@clerk/clerk-expo";

interface RouteParams {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

type DetailsPageRouteProp = RouteProp<
  { DetailsPage: RouteParams },
  "DetailsPage"
>;

export default function DetailsPage({ navigation }: any) {
  const route = useRoute<DetailsPageRouteProp>();
  const { product } = route.params;
  const { addProductToCart } = useCartStore();
  const { userId } = useAuth();

  console.log(userId);

  const handleAddProduct = () => {
    if (!userId) {
      return null;
    }

    const productToAdd = {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      userId: userId ?? "",
      quantity: 1,
    };
    addProductToCart(productToAdd);
  };

  return (
    <View>
      <Pressable
        onPress={navigation.goBack}
        className="w-16 h-16 bg-white items-center flex justify-center rounded-full mb-4 mx-5"
      >
        <MaterialIcons name="arrow-back" size={30} color={"#121212"} />
      </Pressable>
      <ImageBackground
        source={{ uri: product.image }}
        className="w-full h-[350px] rounded-3xl"
        resizeMode="cover"
      />
      <View className="px-10 py-5 flex-col gap-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-semibold">
            {truncateName(product.name)}
          </Text>
          <Text className="text-gray-500 text-lg">
            R$: {product.price.toFixed(2)}
          </Text>
        </View>
        <Text className="font-semibold text-xl">Size</Text>
        <View className="flex-row gap-4">
          <Sizes text="S" />
          <Sizes text="M" />
          <Sizes text="L" />
          <Sizes text="XL" />
        </View>

        <Text className="font-semibold text-xl">Color</Text>
        <View className="flex-row gap-4">
          <Sizes className="bg-[#EE3434]" />
          <Sizes className="bg-[#000000]" />
          <Sizes className="bg-[#3734EE]" />
          <Sizes className="bg-[#91EE34]" />
          <Sizes className="bg-[#DA7137]" />
          <Sizes className="bg-[#34EEEE]" />
        </View>
        <Button
          onPress={handleAddProduct}
          className="my-4"
          variant={"default"}
          size={"lg"}
          label="Add to cart"
        />
      </View>
    </View>
  );
}
