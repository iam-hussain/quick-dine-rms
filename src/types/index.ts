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
      caption: string;
      altText: string;
      value: string;
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
  tables: {
    key: string;
    name: string;
    printName: string;
    position: number;
  }[];
  taxes: {
    key: string;
    name: string;
    printName: string;
    rate: number;
    position: number;
    type: ChargesType;
  }[];
  fees: {
    DELIVERY: {
      key: string;
      name: string;
      printName: string;
      rate: number;
      position: number;
      type: ChargesType;
    };
    PACKING: {
      key: string;
      name: string;
      printName: string;
      rate: number;
      position: number;
      type: ChargesType;
    };
  };
};
