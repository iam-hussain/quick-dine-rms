"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import { toast } from "sonner";
import { Button } from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import BaseTable from "@/components/molecules/base-table";
import { ColumnDef, SortingFnOption } from "@tanstack/react-table";
import instance from "@/lib/instance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryForm from "@/components/forms/category-form";
import { useState } from "react";
import { CategorySchemaValues } from "@/validations";
import { CaretSortIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { zeroLastSortMethod } from "@/lib/utils";
// import calendar from "dayjs/plugin/calendar";

dayjs.extend(relativeTime);
// dayjs.extend(calendar);

export default function Dashboard() {
  const [value, setValue] = useState<
    Partial<
      CategorySchemaValues & {
        id: string;
      }
    >
  >({
    id: "",
  });

  const queryClient = useQueryClient();
  const [contentType, setContentType] = useState<"FORM" | "PROMPT">("FORM");
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => instance.get("/store/categories"),
  });

  const mutation = useMutation({
    mutationFn: () => instance.delete(`/store/category/${value.id}`),
    onSuccess: async () => {
      setOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["categories"] });

      toast.success(
        `Category with ID ${value.id} has been successfully deleted. 🎉`
      );
    },
    onError: (err) => {
      setOpen(false);
      toast.error(
        `Unable to delete the category with ID ${value.id}. Please try again later. If the issue persists, contact support for assistance.`
      );
      console.error(err);
    },
  });

  const columns: ColumnDef<any>[] = [
    {
      size: 155,
      minSize: 155,
      maxSize: 155,
      accessorKey: "shortId",
      header: () => <div className="text-left">ID</div>,
      cell: ({ row }) => (
        <div className="text-foreground/70 text-left">
          {row.getValue("shortId")}
        </div>
      ),
    },

    {
      size: 120,
      minSize: 120,
      maxSize: 120,
      accessorKey: "position",
      sortingFn: zeroLastSortMethod as SortingFnOption<any> | undefined,
      header: ({ column }) => (
        <Button
          variant="ghost"
          className={clsx({
            "font-bold": column.getIsSorted(),
          })}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-foreground/70 text-center">
          {row.getValue("position")}
        </div>
      ),
    },
    {
      size: 250,
      minSize: 250,
      maxSize: 250,
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className={clsx("px-0", {
            "font-bold": column.getIsSorted(),
          })}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="px-0">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "deck",
      header: () => <div className="text-left">Description</div>,
      cell: ({ row }) => (
        <div className="text-foreground/70">{row.getValue("deck")}</div>
      ),
    },
    {
      size: 120,
      minSize: 120,
      maxSize: 120,
      accessorKey: "productsConnected",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className={clsx({
            "font-bold": column.getIsSorted(),
          })}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Products
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-foreground/70 text-center">
          {row.getValue("productsConnected")}
        </div>
      ),
    },
    {
      size: 230,
      minSize: 230,
      maxSize: 230,
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className={clsx("px-0", {
            "font-bold": column.getIsSorted(),
          })}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-foreground/70 text-center">
          {dayjs(row.getValue("createdAt")).format("MMM DD YYYY hh:mm A")}
        </div>
      ),
    },
    {
      size: 170,
      minSize: 170,
      maxSize: 170,
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className={clsx("px-0", {
            "font-bold": column.getIsSorted(),
          })}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-foreground/70 text-center">
          {dayjs(row.getValue("updatedAt")).fromNow()}
        </div>
      ),
    },
    {
      size: 100,
      minSize: 100,
      maxSize: 100,
      accessorKey: "action",
      header: () => <div className="text-right pr-4">Action</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end align-middle items-center">
          <DialogTrigger asChild>
            <Button
              variant={"ghost"}
              className="p-1 px-1 py-1"
              onClick={() => {
                setValue({
                  id: row.getValue("shortId"),
                  position: Number(row.getValue("position")) || 0,
                  name: row.getValue("name") || "",
                  deck: row.getValue("deck") || "",
                });
                setContentType("FORM");
              }}
            >
              <Icon name="MdOutlineEdit" className="h-5 w-5" />
            </Button>
          </DialogTrigger>{" "}
          <DialogTrigger asChild>
            <Button
              disabled={Boolean(Number(row.getValue("productsConnected")))}
              variant={"ghost"}
              className="p-1"
              onClick={() => {
                setValue({
                  id: row.getValue("shortId"),
                  position: Number(row.getValue("position")) || 0,
                  name: row.getValue("name") || "",
                  deck: row.getValue("deck") || "",
                });
                setContentType("PROMPT");
              }}
            >
              <Icon
                name="MdDeleteOutline"
                className="h-5 w-5 text-destructive"
              />
            </Button>
          </DialogTrigger>
        </div>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-col justify-start align-top items-start grow w-full h-full p-6 max-w-screen-2xl m-auto">
        <section className="flex justify-between w-full h-auto mb-4">
          <h1 className="text-xl md:text-2xl font-semibold">Manage Category</h1>
          <DialogTrigger asChild>
            <Button
              className="flex gap-2"
              onClick={() => {
                setValue({
                  id: "",
                });
                setContentType("FORM");
              }}
            >
              <Icon name="IoMdAdd" className="h-5 w-5" />
              Create
            </Button>
          </DialogTrigger>
        </section>
        <section className="flex w-full h-full gap-8 md:flex-row justify-start">
          <BaseTable
            columns={columns}
            data={data as unknown as any[]}
            isLoading={isLoading}
          />
        </section>
        <DialogContent className="sm:max-w-[425px]">
          {contentType === "FORM" ? (
            <>
              <DialogHeader>
                <DialogTitle>
                  {value.id ? "Edit" : "Create"} category
                </DialogTitle>
                <DialogDescription>
                  {value.id
                    ? `You are editing the category with id: ${value.id}.`
                    : "You can create a category here."}
                </DialogDescription>
              </DialogHeader>
              <CategoryForm
                defaultValues={value}
                onSuccess={() => setOpen(false)}
              />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Delete category</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the category with ID{" "}
                  <strong className="text-destructive">{value.id}</strong> and
                  the name{" "}
                  <strong className="text-destructive">{value.name}</strong>?
                  This action cannot be undone.
                </DialogDescription>
                <div className="pt-4 text-right flex justify-between gap-4">
                  <Button
                    variant={"outline"}
                    className="md:w-auto w-full"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={"destructive"}
                    className="md:w-auto w-full"
                    disabled={mutation.isPending}
                    onClick={() => mutation.mutate()}
                  >
                    Delete
                  </Button>
                </div>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </div>
    </Dialog>
  );
}
