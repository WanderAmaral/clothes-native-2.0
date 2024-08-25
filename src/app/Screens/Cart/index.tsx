import { View, Image, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { useCartStore } from "@/store/cart";
import { CartType } from "@/types/cart.types";
import Sizes from "../../../components/Sizes";
import { Button } from "@/components/Button";
import Header from "@/components/Header";

export default function Cart() {
  const { products, removeProductToCart } = useCartStore();

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => acc + product.price, 0);
  }, [products]);

  const renderItemProduct = ({ item }: { item: CartType }) => (
    <View className="px-7 pt-5">
      <View className="justify-between flex-row ">
        <View className="flex-row ">
          <Image
            source={{ uri: item.image }}
            className="w-[105px] h-[135px] rounded-2xl"
          />

          <View className="px-5 py-1 justify-between ">
            <Text className="font-semibold text-2xl">{item.name}</Text>
            <Text className="text-slate-600 text-lg">
              R$: {item.price.toFixed(2)}
            </Text>
            <View className="flex-row gap-5">
              <Sizes className="h-10 w-10" />
              <Sizes text="L" className="h-10 w-10" />
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity>
            <Ionicons
              name="trash"
              size={30}
              color={"#E82525"}
              onPress={() => removeProductToCart(item.id)}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      <View className="w-full items-center justify-between flex flex-row py-3 ">
        <Header
          MenuIcon={<Ionicons name="arrow-back" size={40} color={"#D41515"} />}
        />
      </View>
      <FlatList
        data={products}
        renderItem={renderItemProduct}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
      {products.length > 0 ? (
        <View className="px-10">
          <View className=" justify-between flex-row">
            <Text className="text-3xl text-gray-500">Total:</Text>
            <Text className="text-lg text-gray-500">
              {totalPrice.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between py-3 border-b-2 border-b-gray-500 ">
            <Text className="text-3xl text-gray-500">Discount:</Text>
            <Text className="text-lg font-semibold text-gray-500">
              R$: 00,00
            </Text>
          </View>

          <View className="flex-row justify-between py-3">
            <Text className="text-3xl ">Grand Total:</Text>
            <Text className="text-lg font-bold">{totalPrice.toFixed(2)}</Text>
          </View>
          <Button
            className="my-4"
            variant={"default"}
            size={"lg"}
            label="Add to cart"
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}
