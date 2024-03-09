"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import instance from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/atoms/skeleton";
import Icon from "@/components/atoms/icon";
import { twMerge } from "tailwind-merge";

const columns: ColumnDef<any>[] = [
  {
    size: 10,
    minSize: 10,
    maxSize: 10,
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => <div className="w-[20px]">{row.getValue("id")}</div>,
  },
  {
    size: 200,
    minSize: 200,
    maxSize: 200,
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    size: 300,
    minSize: 300,
    maxSize: 300,
    accessorKey: "deck",
    header: () => <div className="text-left">Description</div>,
    cell: ({ row }) => (
      <div className="text-foreground/70">{row.getValue("deck")}</div>
    ),
  },

  {
    size: 10,
    minSize: 10,
    maxSize: 10,
    accessorKey: "deck",
    header: () => <div className="text-left">Description</div>,
    cell: ({ row }) => (
      <Button variant={"ghost"}>
        <Icon name="FiEdit" className="" />
      </Button>
    ),
  },
];

function TagTable({ className }: { className?: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: () => instance.get("/store/tags"),
  });

  const table = useReactTable({
    data: (data as never as any) || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading) {
    return (
      <div className={twMerge("w-full space-y-2 py-4", className || "")}>
        <div className="flex items-center pb-4 gap-2">
          <Skeleton className="h-10 w-1/3" />
        </div>
        <Skeleton className="h-auto w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-10 w-2/4" />
          <Skeleton className="h-10 w-5/6" />
          <Skeleton className="h-10 w-4/6" />
          <Skeleton className="h-10 w-5/6" />
        </div>
        <div className="flex items-center justify-between space-x-2 py-4">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-10 w-1/3" />
        </div>
      </div>
    );
  }

  return (
    <div className={twMerge("w-full py-4", className || "")}>
      <div className="flex items-center pb-4 gap-2">
        <Input
          placeholder="Search names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-bw"
        />
      </div>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getColumn("name")?.getFilterValue()
            ? `Total items found for keyword "${table
                .getColumn("name")
                ?.getFilterValue()}": ${
                table.getFilteredRowModel().rows.length
              }`
            : `Total items found: ${table.getFilteredRowModel().rows.length}`}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TagTable;
