import {
  View,
  Pressable,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useMemo, useState } from "react";
import { useAuth, useOAuth, useUser } from "@clerk/clerk-expo";
import * as Liking from "expo-linking";
import { useCartStore } from "@/store/cart";
import { CartType } from "@/types/cart.types";
import Sizes from "../../../components/Sizes";
import { Button } from "@/components/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/Dialog";

export default function Cart({ navigation }: any) {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { products, removeProductToCart } = useCartStore();

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

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

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
      <View className="w-full items-center justify-between flex flex-row py-5 px-8">
        <Pressable className="w-16 h-16 bg-white items-center flex justify-center rounded-full">
          <Ionicons
            name="arrow-back"
            size={40}
            color={"#D41515"}
            onPress={navigation.goBack}
          />
        </Pressable>

        <Text className="text-3xl font-bold">My Cart</Text>

        {user && true ? (
          <>
            <Dialog>
              <DialogTrigger>
                <TouchableOpacity>
                  <View className="items-center justify-center">
                    <Image
                      source={{ uri: user?.imageUrl }}
                      className="w-16 h-16 rounded-full"
                    />
                  </View>
                </TouchableOpacity>
              </DialogTrigger>
              <DialogContent>
                <View className="flex gap-7">
                  <Text className="font-semibold text-xl text-primary">
                    Sair da conta
                  </Text>
                  <Text className="text-primary">
                    Tem certeza que deseja sair da conta?
                  </Text>

                  <Button label="Sair" onPress={() => signOut()} />
                </View>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <Pressable
            className="w-16 h-16 bg-white items-center flex justify-center rounded-full"
            onPress={onGoogleSignIn}
          >
            <Ionicons name="log-in" size={40} color={"#121212"} />
          </Pressable>
        )}
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
