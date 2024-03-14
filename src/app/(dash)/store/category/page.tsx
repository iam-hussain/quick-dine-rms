"use client";

import { Button } from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import TagForm from "@/components/forms/tag-form";
import BaseTable from "@/components/molecules/base-table";
import { ColumnDef } from "@tanstack/react-table";
import instance from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => instance.get("/store/categories"),
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
      accessorKey: "deck",
      header: () => <div className="text-right pr-4">Action</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end align-middle items-center">
          <Button variant={"ghost"} className="p-2">
            <Icon name="MdOutlineEdit" className="h-4 w-4" />
          </Button>
          <Button variant={"ghost"} className="p-2">
            <Icon name="MdDeleteOutline" className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-start align-top items-start grow w-full h-full">
      <section className="flex justify-between w-full h-auto mb-4">
        <h1 className="text-xl md:text-2xl font-semibold">Manage Category</h1>
        <Button className="flex gap-2">
          <Icon name="IoMdAdd" className="h-5 w-5" />
          Add Category
        </Button>
      </section>
      <section className="flex w-full h-full gap-8 md:flex-row justify-start">
        <BaseTable
          columns={columns}
          data={data as unknown as any[]}
          isLoading={isLoading}
        />
      </section>
      {/* <div className="w-screen h-screen absolute top-0 bottom-0 left-0 right-0">
        <div className="bg-bw-foreground/50 w-full h-full"></div>
        <div className="min-h-60 bg-bw min-w-60"></div>
      </div> */}
    </div>
  );
}
