export enum PRODUCT_TYPE {
  NON_VEG = "NON_VEG",
  VEG = "VEG",
  VEGAN = "VEGAN",
}

export enum ORDER_TYPE {
  DINING = "DINING",
  TAKE_AWAY = "TAKE_AWAY",
  PICK_UP = "PICK_UP",
  DELIVERY = "DELIVERY",
  PLATFORM = "PLATFORM",
}

export enum ORDER_STATUS {
  DRAFT = "DRAFT",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  DELIVERY_PENDING = "DELIVERY_PENDING",
  DELIVERED = "DELIVERED",
}

export enum CALC_VALUE_TYPE {
  VALUE = "VALUE",
  PERCENTAGE = "PERCENTAGE",
  VALUE_COUNT = "VALUE_COUNT",
}

export type ChargesType = "VALUE" | "PERCENTAGE" | "VALUE_COUNT";

export interface ItemType {
  id: string;
  title: string | null;
  note: string | null;
  type: PRODUCT_TYPE;
  price: number;
  quantity: number;
  total: number;
  position: number;
  scheduledAt: Date | string | null;
  placedAt: Date | string | null;
  acceptedAt: Date | string | null;
  completedAt: Date | string | null;
  rejectedAt: Date | string | null;
  rejected: boolean;
  productId: string;
  orderId: string | null;
  tokenId: string | null;
  createdId: string | null;
  createdAt: string;
  updatedId: string | null;
  updatedAt: Date | string;
}

export type SortItemsResult = {
  // all: Item[]; // All items
  drafted: ItemType[]; // Drafted items
  rejected: ItemType[]; // Rejected items
  valid: ItemType[]; // Non-drafted, non-rejected items
  summary: ItemType[]; // Type for getGroupedItems return value
  scheduled: ItemType[]; // Scheduled items
  placed: ItemType[]; // Placed items
  accepted: ItemType[]; // Accepted items
  completed: ItemType[]; // Completed items
};

export interface TokenType {
  id: string;
  note: string | null;
  shortId: string;
  displayId: string;
  printedAt: Date | string | null;
  placedAt: Date | string;
  completedAt: Date | string | null;
  scheduledAt: Date | string | null;
  orderId: string | null;
  kitchenCategoryId: string | null;
  storeId: string;
  createdId: string | null;
  createdAt: Date | string;
  updatedId: string | null;
  updatedAt: Date | string;
  items: SortItemsResult;
  order: {
    id: string;
    shortId: string;
    type: ORDER_TYPE;
    status: ORDER_STATUS;
  };
  kitchenCategory: CategoryType;
}

export type SortTokensResult = {
  scheduled: TokenType[]; // Scheduled tokens
  placed: TokenType[]; // Placed tokens
  completed: TokenType[]; // Completed tokens
};

export type ImageType = {
  caption: string;
  altText: string;
  value: string;
  type: string;
};

export interface ProductAPIType {
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
  kitchenCategoryName?: string;
  kitchenCategoryId?: string;
  image: {
    primary: ImageType | null;
  };
}

export interface CategoryType {
  id: string;
  shortId: string;
  name: string;
  deck: string | null;
  position: number;
  image: ImageType | null;
  type: "DEFAULT" | "KITCHEN";
  storeId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type TaxType = {
  key: string;
  name: string;
  printName: string;
  rate: number;
  position: number;
  type: CALC_VALUE_TYPE;
};

export type FeeItemType = {
  key: string;
  name: string;
  printName: string;
  rate: number;
  position: number;
  type: CALC_VALUE_TYPE;
};

export type TableType = {
  key: string;
  name: string;
  printName: string;
  position: number;
};

export type FeeType = {
  DELIVERY: FeeItemType;
  PACKING: FeeItemType;
};

export type StoreAdditionalType = {
  tables: TableType[];
  taxes: TaxType[];
  fees: FeeType;
};

export type OrderAPIType = {
  id: string;
  shortId: string;
  type: ORDER_TYPE;
  status: ORDER_STATUS;
  note: string | null;
  table: TableType;
  taxes: TaxType[];
  fees: FeeItemType[];
  extra: Record<string, never>;
  completedAt: Date | string | null;
  deliveredAt: Date | string | null;
  customerId: string | null;
  createdId: string;
  createdAt: Date | string;
  updatedId: string | null;
  updatedAt: Date | string | null;
  storeId: string;
  items: SortItemsResult;
  tokens: SortTokensResult;
};
