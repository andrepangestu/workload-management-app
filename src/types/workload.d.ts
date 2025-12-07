import type { Month } from "@/data/constants";

export interface MonthlyValue {
  month: Month;
  value: number;
}

export interface MonthData extends MonthlyValue {
  checked: boolean;
}

export interface ProjectRow {
  id: string;
  label: string;
  subLabel?: string;
  monthData: MonthData[];
  actingAs?: string;
  actingAsValue?: string;
}

export interface Project {
  id: string;
  name: string;
  region: string;
  company: string;
  brand: string;
  totalRow: MonthlyValue[];
  rows: ProjectRow[];
}

export interface WorkloadData {
  personName: string;
  monthlyOverview: MonthlyValue[];
  projects: Project[];
}

export type { Month };
