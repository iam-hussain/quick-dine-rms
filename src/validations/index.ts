import * as z from "zod";
import { string, number } from "./elements";

enum FoodType {
  NON_VEG = "NON_VEG",
  VEG = "VEG",
  VEGAN = "VEGAN",
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
const type = z.nativeEnum(FoodType);

const schemas = {
  login: z.object({ email, password }),
  register: z.object({ email, username, password }),
  product: z.object({ name, deck, price, type, categoryId }),
  category: z.object({ name, deck, position }),
  cart: z.object({
    items: z.array(
      z.object({
        title,
        note,
        price,
        quantity,
        productId,
      })
    ),
  }),
};

export type RegisterSchemaValues = z.infer<typeof schemas.register>;
export type LoginSchemaValues = z.infer<typeof schemas.login>;
export type ProductSchemaValues = z.infer<typeof schemas.product>;
export type CategorySchemaValues = z.infer<typeof schemas.category>;
export type CartSchemaValues = z.infer<typeof schemas.cart>;

export default schemas;
