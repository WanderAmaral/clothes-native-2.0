import { Product } from "./product.type";

export interface CartType extends Product {
    quantity: number
}