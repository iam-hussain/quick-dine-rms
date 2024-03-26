import * as z from "zod";
import { string, number } from "./elements";

export enum FoodType {
  NON_VEG = "NON_VEG",
  VEG = "VEG",
  VEGAN = "VEGAN",
}

export enum OrderType {
  PRE_DINING = "PRE_DINING",
  DINING = "DINING",
  TAKE_AWAY = "TAKE_AWAY",
  PICK_UP = "PICK_UP",
  DELIVERY = "DELIVERY",
  PLATFORM = "PLATFORM",
}

const email = string({ type: "email" });
const username = string({ type: "username", length: "4-20" });
const password = string({ length: "6-20" });
const name = string({ length: "2-40" });
const title = string({ length: "2-40" });
const deck = string({ optional: true });
const note = string({ optional: true });
const slug = string({ length: "4-20" });
const categoryId = string();
const productId = string();
const id = string();
const position = number({ min: 0, max: 10000 });
const quantity = number({ min: 1, max: 10000 });
const price = number({ min: 0, max: 10000 });
const foodType = z.nativeEnum(FoodType);
const orderType = z.nativeEnum(OrderType);

const cartItem = z.object({
  title,
  note,
  price,
  quantity,
  productId,
});

const schemas = {
  login: z.object({ email, password }),
  register: z.object({ email, username, password }),
  product: z.object({ name, deck, price, type: foodType, categoryId }),
  category: z.object({ name, deck, position }),
  cart: z.object({
    type: orderType,
    items: z.array(cartItem),
  }),
  cartItem,
};

export type RegisterSchemaValues = z.infer<typeof schemas.register>;
export type LoginSchemaValues = z.infer<typeof schemas.login>;
export type ProductSchemaValues = z.infer<typeof schemas.product>;
export type CategorySchemaValues = z.infer<typeof schemas.category>;
export type CartSchemaValues = z.infer<typeof schemas.cart>;
export type CartItemSchemaValues = z.infer<typeof schemas.cartItem>;

export default schemas;
