enum OrderType {
  PRE_DINING = "PRE_DINING",
  DINING = "DINING",
  TAKE_AWAY = "TAKE_AWAY",
  PICK_UP = "PICK_UP",
  DELIVERY = "DELIVERY",
  PLATFORM = "PLATFORM",
}

export interface ProductAPI {
  id: string;
  shortId: string;
  name: string;
  deck?: string;
  price: number;
  formattedPrice: string;
  foodType: string;
  type: string;
  categoryName: string;
  categoryId: string;
  image: {
    primary: {
      id: string;
      shortId: string;
      caption: string;
      altText: string;
      content: string;
      type: string;
    } | null;
  };
}

export type CartItemType = {
  price: number;
  title: string;
  note: string;
  quantity: number;
  productId: string;
};

export type CartFormType = {
  type: OrderType;
  items: CartItemType[];
};

export type ChargesType = "VALUE" | "PERCENTAGE" | "VALUE_COUNT";

export type StoreAdditionalType = {
  table: {
    key: string;
    name: string;
    printName: string;
    position: number;
  }[];
  tax: {
    key: string;
    name: string;
    printName: string;
    value: number;
    position: number;
    type: ChargesType;
  }[];
  discounts: {
    key: string;
    name: string;
    printName: string;
    value: number;
    type: ChargesType;
  }[];
  packing: {
    value: number;
    type: ChargesType;
  };
  delivery: {
    value: number;
    type: ChargesType;
  };
};
