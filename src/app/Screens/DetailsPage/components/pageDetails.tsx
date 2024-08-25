import { View, Text, Pressable, ImageBackground } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import * as Liking from "expo-linking";
import { MaterialIcons } from "@expo/vector-icons";
import { truncateName } from "@/helpers/splitName";
import Sizes from "../../../../components/Sizes";
import { Button } from "@/components/Button";
import { useCartStore } from "@/store/cart";
import { useAuth, useOAuth } from "@clerk/clerk-expo";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

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

  const googleOAuth = useOAuth({ strategy: "oauth_google" });

  async function onGoogleSignIn() {
    try {
      const redirectUrl = Liking.createURL("/");

      const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl });

      if (oAuthFlow.authSessionResult?.type === "success") {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddProduct = () => {
    if (!userId) {
      onGoogleSignIn();
    }
    const productToAdd = {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      userId: userId ?? "",
    };
    addProductToCart(productToAdd);
  };

  return (
    <View className="h-screen">
      <Header
        MenuIcon={<Ionicons name="arrow-back" size={40} color={"#D41515"} />}
      />
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
          className="my-6"
          variant={"default"}
          size={"lg"}
          label="Add to cart"
        />
      </View>
    </View>
  );
}
