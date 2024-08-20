import { create } from "zustand";

type Cart = {
  id: string;
  name: string;
  price: number;
  image: string;
  userId: string;
};

type CartStore = {
  products: Cart[];
  addProductToCart: (product: Cart) => void
};

export const useCartStore = create<CartStore>((set) => ({
  products: [],
  addProductToCart: (item) => set((state) => ({
    products: [...state.products, item]
  }))
}));
