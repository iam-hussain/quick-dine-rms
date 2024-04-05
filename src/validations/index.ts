import * as z from "zod";
import { string, number } from "./elements";

export enum PRODUCT_TYPE {
  NON_VEG = "NON_VEG",
  VEG = "VEG",
  VEGAN = "VEGAN",
}

export enum ORDER_TYPE {
  PRE_DINING = "PRE_DINING",
  DINING = "DINING",
  TAKE_AWAY = "TAKE_AWAY",
  PICK_UP = "PICK_UP",
  DELIVERY = "DELIVERY",
  PLATFORM = "PLATFORM",
}

export enum ORDER_STATUS {
  DRAFT = "DRAFT",
  PLACED = "PLACED",
  ACCEPTED = "ACCEPTED",
  PROGRESS = "PROGRESS",
  READY = "READY",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  COMPLETED = "COMPLETED",
}

export enum CALC_VALUE_TYPE {
  VALUE = "VALUE",
  PERCENTAGE = "PERCENTAGE",
  VALUE_COUNT = "VALUE_COUNT",
}

const email = string({ type: "email" });
const username = string({ type: "username", length: "4-20" });
const password = string({ length: "6-20" });
const key = string({ length: "2-40" });
const name = string({ length: "2-40" });
const title = string({ length: "2-40" });
const deck = string({ optional: true });
const note = string({ optional: true });
const slug = string({ length: "4-20" });
const categoryId = string();
const productId = string();
const id = string();
const optionalId = string({ optional: true });
const optionalDate = string({ optional: true });
const position = number({ min: 0, max: 10000 });
const quantity = number({ min: 1, max: 10000 });
const price = number({ min: 0, max: 10000 });
const rate = number({ min: 0, max: 10000 });
const foodType = z.nativeEnum(PRODUCT_TYPE);
const orderType = z.nativeEnum(ORDER_TYPE);
const orderStatus = z.nativeEnum(ORDER_STATUS);
const printName = string({ optional: true });

const cartItem = z.object({
  id: z.string().optional(),
  title,
  note,
  price,
  type: foodType,
  quantity,
  position,
  productId,
});

const fees = z.object({
  key,
  name,
  rate,
  printName,
  position: position.optional(),
  type: z.nativeEnum(CALC_VALUE_TYPE).optional(),
});

const table = z.object({
  key,
  name,
  printName,
  position: position.optional(),
});

const taxes = z.object({
  key,
  name,
  rate,
  printName,
  position: position.optional(),
  type: z.nativeEnum(CALC_VALUE_TYPE).optional(),
});

const schemas = {
  login: z.object({ email, password }),
  register: z.object({ email, username, password }),
  product: z.object({ name, deck, price, type: foodType, categoryId }),
  category: z.object({ name, deck, position }),
  cart: z.object({
    shortId: optionalId,
    type: orderType.optional(),
    status: orderStatus.optional(),
    note,
    customerId: optionalId,
    items: z.array(cartItem),
    completedAt: optionalDate,
    deliveredAt: optionalDate,
    fees: z.array(fees),
    table: z.array(table),
    taxes: z.array(taxes),
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
