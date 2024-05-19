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

export enum ITEM_STATUS {
  DRAFT = "DRAFT",
  SCHEDULED = "SCHEDULED",
  PLACED = "PLACED",
  ACCEPTED = "ACCEPTED",
  PROGRESS = "PROGRESS",
  PREPARED = "PREPARED",
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

export type OrderItem = {
  id: string;
  title: string;
  note: string;
  type: PRODUCT_TYPE;
  price: number;
  quantity: number;
  total: number;
  position: number;
  placeAt: string;
  placedAt: string;
  acceptedAt: string | null;
  preparedAt: string | null;
  status: ITEM_STATUS;
  productId: string;
  orderId: string;
  createdId: string;
  createdAt: string;
  updatedId: string | null;
  updatedAt: string | null;
  billId: string | null;
};

export type OrderType = {
  id: string;
  shortId: string;
  type: "DINING" | "TAKE_AWAY" | "PICK_UP" | "DELIVERY" | "PLATFORM";
  status:
    | "DRAFT"
    | "PLACED"
    | "ACCEPTED"
    | "PROGRESS"
    | "READY"
    | "OUT_FOR_DELIVERY"
    | "COMPLETED";
  note: string | null;
  table: {
    key: string;
    name: string;
    position: number;
    printName: string;
  };
  taxes: {
    key: string;
    name: string;
    rate: number;
    type: "VALUE" | "PERCENTAGE" | "VALUE_COUNT";
    position: number;
    printName: string;
  }[];
  fees: {
    key: string;
    name: string;
    rate: number;
    type: "VALUE" | "PERCENTAGE" | "VALUE_COUNT";
    position: number;
    printName: string;
  }[];
  extra: Record<string, never>;
  completedAt: string | null;
  deliveredAt: string | null;
  customerId: string | null;
  createdId: string;
  createdAt: string;
  updatedId: string | null;
  updatedAt: string | null;
  storeId: string;
  items: OrderItem[];
  summary: OrderItem[];
  drafted: OrderItem[];
  scheduled: OrderItem[];
  placed: OrderItem[];
  accepted: OrderItem[];
  prepared: OrderItem[];
};
