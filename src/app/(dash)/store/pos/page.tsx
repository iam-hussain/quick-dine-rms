"use client";

import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoriesSlide } from "@/components/organisms/categories-slide";
import ProductList from "@/components/organisms/product-list";
import SearchBar from "@/components/organisms/search-bar";
import instance from "@/lib/instance";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/atoms/button";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import schemas, { ORDER_TYPE } from "@/validations";
import { Form } from "@/components/atoms/form";
import { useEffect, useState } from "react";
import { isValidArray } from "@/lib/utils";
import { ProductAPI, StoreAdditionalType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderUpsertSchemaType } from "@iam-hussain/qd-copilot";
import clsx from "clsx";
import Order from "@/components/organisms/order";
import { OrderContextProvider } from "@/components/providers/order-provider";
import PointOfSale from "@/components/templates/post-of-sale";

export default function POS() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<any | null>(null);

  console.log({ id });

  const queries = [
    instance.get("/store/categories"),
    instance.get("/store/products"),
  ];

  useEffect(() => {
    if (id) {
      queries.push(instance.get(`/store/order/${id}`));
    }

    Promise.all(queries).then((data) => {
      setData({
        categories: data[0],
        products: data[1],
        orderData: data[2] || {},
      });
      console.log({
        categories: data[0],
        products: data[1],
        orderData: data[2] || {},
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return <p>Loading.....</p>;
  }

  return (
    <PointOfSale
      products={data.products}
      categories={data.categories}
      orderData={data?.orderData || {}}
    />
  );
}
