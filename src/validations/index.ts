import * as z from "zod";
import { string } from "./elements";

const email = string({ type: "email" });
const username = string({ type: "username", length: "4-20" });
const password = string({ length: "6-20" });
const name = string({ length: "4-20" });
const deck = string({ optional: true });
const slug = string({ length: "4-20" });
const categoryId = string();
const id = string();

const schemas = {
  login: z.object({ email, password }),
  register: z.object({ email, username, password }),
  product: z.object({ id, name, deck, categoryId }),
  category: z.object({ name, deck }),
};

export type RegisterSchemaValues = z.infer<typeof schemas.register>;
export type LoginSchemaValues = z.infer<typeof schemas.login>;
export type ProductSchemaValues = z.infer<typeof schemas.product>;
export type CategorySchemaValues = z.infer<typeof schemas.category>;

export default schemas;
