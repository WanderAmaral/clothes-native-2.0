import { CartType } from "@/types/cart.types";
import { create } from "zustand";

type CartStore = {
  products: CartType[];
  addProductToCart: (product: CartType) => void;
  removeProductToCart: (id: string | number) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  products: [],
  addProductToCart: (item) =>
    set((state) => {
      const productExists = state.products.find(
        (product) => product.id === item.id
      );

      if (productExists) {
        return state;
      }

      return {
        products: [...state.products, { ...item, quantity: 1 }],
      };
    }),
  removeProductToCart: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));
