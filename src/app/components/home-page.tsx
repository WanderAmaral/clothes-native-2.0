import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CategoryList from "./Category-list";
import Search from "./Search";
import { truncateName } from "@/helpers/splitName";
import Header from "@/components/Header";

interface ApiProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

interface DataProducts {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export default function Home({ navigation }: any) {
  const [fetchProducts, setProducts] = useState<DataProducts[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data: ApiProduct[] = await response.json();

        const formattedData = data.map((item) => ({
          id: item.id,
          name: truncateName(item.title),
          price: item.price,
          category: item.category,
          image: item.image,
        }));
        setProducts(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const filterProducts = () => {
    if (selectedCategory === "All Products") {
      return fetchProducts;
    }
    return fetchProducts.filter((product) => product.category.includes(selectedCategory.toLowerCase()));
  };

  const renderItem = ({ item }: { item: DataProducts }) => (
    <View className="px-2 w-1/2 ">
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailsPage", { product: item })}
      >
        <View className="rounded px-4 relative py-2">
          <Image
            source={{ uri: item.image }}
            className="w-full h-48 rounded-3xl"
          />
          <View className="absolute right-6 top-3 flex items-center rounded-full bg-white p-2">
            <Ionicons name="heart-outline" size={24} color="#D91F1F" />
          </View>
          <Text className="text-lg font-bold ">{item.name}</Text>
          <Text className="text-base text-gray-600 ">
            R$: {item.price.toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <FlatList
        ListHeaderComponent={
          <>
            <Header />
            <View style={{ padding: 16 }}>
              <Search />
              <CategoryList 
                selectedCategory={selectedCategory}
                onSelectCategory={(category) => setSelectedCategory(category)}
              />
            </View>
          </>
        }
        data={filterProducts()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        style={{ marginTop: 5 }}
      />
    </SafeAreaView>
  );
}
