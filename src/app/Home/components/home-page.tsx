import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CategoryList from "./Category-list";
import Search from "./Search";

interface ApiProduct {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface DataProducts {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<DataProducts[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data: ApiProduct[] = await response.json();

        const formattedData = data.map((item) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          image: item.image,
        }));
        setProducts(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const renderItem = ({ item }: { item: DataProducts }) => (
    <View className="px-2 w-1/2 ">
      <View className="rounded px-4 relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-48 rounded-3xl"
        />
        <View className="absolute right-6 top-3 flex items-center rounded-full bg-white p-2">
          <Ionicons name="heart-outline" size={24} color="#D91F1F" />
        </View>
        <Text className="text-lg font-bold mb-2">{item.name}</Text>
        <Text className="text-base text-gray-600 ">
          R$: {item.price.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <FlatList
        ListHeaderComponent={
          <View style={{ padding: 16 }}>
            <Search />
            <CategoryList />
          </View>
        }
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        style={{ marginTop: 8 }}
      />
    </SafeAreaView>
  );
}
