import { DataTable } from "@/components/common/table/DataTable";
import { ReactNode } from "react";

export interface MenuItem {
  label: string;
  icon?: ReactNode;
  route?: string;
  badge?: string | number;
  menu?: MenuItem[];
}

export interface DataTableFilter {
  id: string | number;
  value: any;
}

export type MenuOpenStatus = Record<string, boolean>;
