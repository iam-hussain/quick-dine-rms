"use client";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Skeleton } from "@/components/atoms/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import { orderStatusObject } from "@/components/molecules/order-status-icon";
import { orderTypeObject } from "@/components/molecules/order-type-icon";
import { formatDateTime } from "@/lib/date-time";
import fetcher from "@/lib/fetcher";
import { ORDER_STATUS, ORDER_TYPE, OrderAPIType } from "@/types";

export default function OrdersPage() {
  const router = useRouter();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { data, isPending, isLoading } = useQuery<OrderAPIType[]>({
    queryKey: ["orders", pagination],
    queryFn: () =>
      fetcher(
        `/store/orders?take=${pagination.pageSize}&skip=${pagination.pageIndex * 10}`
      ),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const columns: ColumnDef<any>[] = [
    {
      size: 155,
      accessorKey: "shortId",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className={clsx("px-0", {
            "font-bold": column.getIsSorted(),
          })}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-foreground/90 font-medium text-left">
          #{row.getValue("shortId")}
        </div>
      ),
    },
    {
      size: 155,
      accessorKey: "type",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className={clsx("px-0", {
            "font-bold": column.getIsSorted(),
          })}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-foreground/70 text-left">
          {orderTypeObject[row.getValue("type") as ORDER_TYPE]}
        </div>
      ),
    },
    {
      size: 155,
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className={clsx("px-0", {
            "font-bold": column.getIsSorted(),
          })}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-foreground/70 text-left">
          {orderStatusObject[row.getValue("status") as ORDER_STATUS]}
        </div>
      ),
    },
    {
      size: 80,
      accessorKey: "totalItemsCount",
      header: () => <div className="text-center">Items</div>,
      cell: ({ row }) => (
        <div className="text-foreground/70 text-center">
          {row.getValue("totalItemsCount")}
        </div>
      ),
    },
    {
      size: 80,
      accessorKey: "draftedItemsCount",
      header: () => <div className="text-center">Draft</div>,
      cell: ({ row }) => (
        <div className="text-foreground/70 text-center">
          {row.getValue("draftedItemsCount")}
        </div>
      ),
    },
    {
      size: 80,
      accessorKey: "placedItemsCount",
      header: () => <div className="text-center">Placed</div>,
      cell: ({ row }) => (
        <div className="text-foreground/70 text-center">
          {row.getValue("placedItemsCount")}
        </div>
      ),
    },
    {
      size: 80,
      accessorKey: "acceptedItemsCount",
      header: () => <div className="text-center">Cooking</div>,
      cell: ({ row }) => (
        <div className="text-foreground/70 text-center">
          {row.getValue("acceptedItemsCount")}
        </div>
      ),
    },
    {
      size: 80,
      accessorKey: "completedItemsCount",
      header: () => <div className="text-left">Completed</div>,
      cell: ({ row }) => (
        <div className="text-foreground/70 text-left">
          {row.getValue("completedItemsCount")}
        </div>
      ),
    },
    {
      size: 80,
      accessorKey: "scheduledItemsCount",
      header: () => <div className="text-center">Scheduled</div>,
      cell: ({ row }) => (
        <div className="text-foreground/70 text-center">
          {row.getValue("scheduledItemsCount")}
        </div>
      ),
    },
    {
      size: 80,
      accessorKey: "rejectedItemsCount",
      header: () => <div className="text-center">Rejected</div>,
      cell: ({ row }) => (
        <div className="text-foreground/70 text-center">
          {row.getValue("rejectedItemsCount")}
        </div>
      ),
    },
    {
      size: 130,
      accessorKey: "createdByName",
      header: () => <div className="text-left">Created By</div>,
      cell: ({ row }) => (
        <div className="text-foreground/70 text-left">
          {row.getValue("createdByName")}
        </div>
      ),
    },
    {
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
        <div className="text-foreground/70 text-left">
          {formatDateTime(row.getValue("createdAt"))}
        </div>
      ),
    },
    {
      size: 130,
      accessorKey: "updatedByName",
      header: () => <div className="text-left">Updated By</div>,
      cell: ({ row }) => (
        <div className="text-foreground/70 text-left">
          {row.getValue("updatedByName") || "-"}
        </div>
      ),
    },
    {
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
        <div className="text-foreground/70 text-left">
          {formatDateTime(row.getValue("updatedAt"))}
        </div>
      ),
    },
    {
      size: 130,
      accessorKey: "action",
      header: () => <div className="text-right pr-4">Action</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end align-middle items-center">
          <Button
            variant={"outline"}
            onClick={() =>
              router.history.push(
                `/store/order?orderId=${row.getValue("shortId")}`
              )
            }
          >
            View
          </Button>
          <Button
            variant={"outline"}
            onClick={() =>
              router.history.push(
                `/store/pos?orderId=${row.getValue("shortId")}`
              )
            }
          >
            POS
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  if (isPending || isLoading) {
    return (
      <div className={"w-full space-y-2 py-4"}>
        <div className="flex items-center pb-4 gap-2">
          <Skeleton className="h-10 w-1/3" />
        </div>
        <Skeleton className="h-auto w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex items-center justify-between space-x-2 py-4">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-10 w-1/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start align-top items-start grow w-full h-full p-6 max-w-screen-3xl m-auto">
      <section className="flex justify-between w-full h-auto mb-4">
        <h1 className="text-xl md:text-2xl font-semibold">Manage Order</h1>
      </section>
      <section className="flex w-3xl max-w-full h-full gap-8 md:flex-row justify-start">
        <div className={"w-full py-4"}>
          <div className="flex items-center pb-4 gap-2">
            <Input
              placeholder="Search ID..."
              value={
                (table.getColumn("shortId")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("shortId")?.setFilterValue(event.target.value)
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
                        <TableHead
                          key={header.id}
                          style={{
                            width: "auto",
                            ...(header.getSize() !== 150
                              ? { minWidth: header.getSize() }
                              : {
                                  minWidth: 200,
                                }),
                          }}
                        >
                          {/* {header.isPlaceholder ? null : (
                            <div>
                              {header.column.getCanGroup() ? (
                                // If the header can be grouped, let's add a toggle
                                <button
                                  {...{
                                    onClick:
                                      header.column.getToggleGroupingHandler(),
                                    style: {
                                      cursor: "pointer",
                                    },
                                  }}
                                >
                                  {header.column.getIsGrouped()
                                    ? `🛑(${header.column.getGroupedIndex()}) `
                                    : `👊 `}
                                </button>
                              ) : null}{" "}
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          )} */}
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
              {table.getColumn("shortId")?.getFilterValue()
                ? `Total items found for keyword "${table
                    .getColumn("shortId")
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
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
