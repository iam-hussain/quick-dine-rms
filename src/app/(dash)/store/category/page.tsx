"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import { toast } from "sonner";
import { Button } from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import BaseTable from "@/components/molecules/base-table";
import { ColumnDef } from "@tanstack/react-table";
import instance from "@/lib/instance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryForm from "@/components/forms/category-form";
import { useEffect, useState } from "react";
import { CategorySchemaValues } from "@/validations";

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
      cell: ({ row }) => <div className="">{row.getValue("shortId")}</div>,
    },
    {
      size: 250,
      minSize: 250,
      maxSize: 250,
      accessorKey: "name",
      header: () => <div className="text-left">Name</div>,
      cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
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
      accessorKey: "position",
      header: () => <div className="text-center">Position</div>,
      cell: ({ row }) => (
        <div className="text-foreground/70 text-center">
          {row.getValue("position")}
        </div>
      ),
    },
    {
      size: 120,
      minSize: 120,
      maxSize: 120,
      accessorKey: "action",
      header: () => <div className="text-right pr-4">Action</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end align-middle items-center">
          <DialogTrigger asChild>
            <Button
              variant={"ghost"}
              className="p-2"
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
              <Icon name="MdOutlineEdit" className="h-4 w-4" />
            </Button>
          </DialogTrigger>{" "}
          <DialogTrigger asChild>
            <Button
              variant={"ghost"}
              className="p-2"
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
                className="h-4 w-4 text-destructive"
              />
            </Button>
          </DialogTrigger>
        </div>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-col justify-start align-top items-start grow w-full h-full">
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
