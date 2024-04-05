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

export interface ProductAPI {
  id: string;
  shortId: string;
  name: string;
  deck?: string;
  price: number;
  formattedPrice: string;
  foodType: string;
  type: PRODUCT_TYPE;
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
    type: CALC_VALUE_TYPE;
  }[];
  fees: {
    DELIVERY: {
      key: string;
      name: string;
      printName: string;
      rate: number;
      position: number;
      type: CALC_VALUE_TYPE;
    };
    PACKING: {
      key: string;
      name: string;
      printName: string;
      rate: number;
      position: number;
      type: CALC_VALUE_TYPE;
    };
  };
};
