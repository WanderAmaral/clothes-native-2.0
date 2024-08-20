import { CartType } from "@/types/cart.types";
import { Product } from "@/types/product.type";
import { create } from "zustand";

type CartStore = {
  products: CartType[];
  addProductToCart: (product: CartType) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  products: [],
  addProductToCart: (item) =>
    set((state) => ({
      products: [...state.products, {...item, quantity: 1}],
    })),
}));
