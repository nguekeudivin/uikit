"use client";

import {
  ArrowDown,
  ArrowUp,
  EllipsisVertical,
  Eye,
  Filter,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

interface ColumnHeaderProps {
  column: any;
  filterColumn: any;
  manageColumn: any;
  label: string;
}

export default function ColumnHeader({
  column,
  filterColumn,
  manageColumn,
  label,
}: ColumnHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
      >
        {label}
        {column.getIsSorted() != false && (
          <>
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </>
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical className="w-4 h-4 text-gray-800" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {(column.getIsSorted() == false ||
            column.getIsSorted() == "desc") && (
            <DropdownMenuItem
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              <ArrowUp />
              <span>Sort by Asc</span>
            </DropdownMenuItem>
          )}

          {(column.getIsSorted() == false || column.getIsSorted() == "asc") && (
            <DropdownMenuItem
              onClick={() => {
                column.toggleSorting(true);
              }}
            >
              <ArrowDown />
              <span>Sort by Desc</span>
            </DropdownMenuItem>
          )}

          {column.getIsSorted() != false && (
            <DropdownMenuItem
              onClick={() => {
                column.clearSorting();
              }}
            >
              Unsort
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              filterColumn(column);
            }}
          >
            <Filter />
            <span>Filter</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              manageColumn(column);
            }}
          >
            <Eye />
            <span>Manage column</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
