import { MONTHS, DEFAULTS, type Month } from "./constants";
import type {
  MonthData,
  MonthlyValue,
  ProjectRow,
  Project,
  WorkloadData,
} from "@/app/types/workload";

export function createMonthlyValues(
  defaultValue: number | number[] = DEFAULTS.OVERVIEW_VALUE
): MonthlyValue[] {
  return MONTHS.map((month, index) => ({
    month,
    value: Array.isArray(defaultValue)
      ? defaultValue[index] ?? 0
      : defaultValue,
  }));
}

export function createMonthData(
  defaultValue: number | number[] = DEFAULTS.ROW_VALUE,
  defaultChecked: boolean | boolean[] = DEFAULTS.ROW_CHECKED
): MonthData[] {
  return MONTHS.map((month, index) => ({
    month,
    value: Array.isArray(defaultValue)
      ? defaultValue[index] ?? 0
      : defaultValue,
    checked: Array.isArray(defaultChecked)
      ? defaultChecked[index] ?? false
      : defaultChecked,
  }));
}

export interface CreateRowOptions {
  id: string;
  label: string;
  subLabel?: string;
  values?: number | number[];
  checked?: boolean | boolean[];
  actingAs?: string;
  actingAsValue?: string;
}

export function createProjectRow(options: CreateRowOptions): ProjectRow {
  const {
    id,
    label,
    subLabel,
    values = DEFAULTS.ROW_VALUE,
    checked = DEFAULTS.ROW_CHECKED,
    actingAs,
    actingAsValue,
  } = options;

  return {
    id,
    label,
    subLabel,
    monthData: createMonthData(values, checked),
    actingAs,
    actingAsValue,
  };
}

export interface CreateProjectOptions {
  id: string;
  name: string;
  region: string;
  company: string;
  brand: string;
  rows: ProjectRow[];
  totalValues?: number | number[];
}

export function createProject(options: CreateProjectOptions): Project {
  const { id, name, region, company, brand, rows, totalValues } = options;

  const calculatedTotals =
    totalValues !== undefined
      ? createMonthlyValues(totalValues)
      : createMonthlyValues(
          MONTHS.map((_, monthIndex) =>
            rows.reduce((sum, row) => {
              const monthData = row.monthData[monthIndex];
              return monthData && !monthData.checked
                ? sum + monthData.value
                : sum;
            }, 0)
          )
        );

  return {
    id,
    name,
    region,
    company,
    brand,
    totalRow: calculatedTotals,
    rows,
  };
}

export interface CreateWorkloadOptions {
  personName: string;
  projects: Project[];
  overviewValues?: number | number[];
}

export function createWorkloadData(
  options: CreateWorkloadOptions
): WorkloadData {
  const { personName, projects, overviewValues } = options;

  const calculatedOverview =
    overviewValues !== undefined
      ? createMonthlyValues(overviewValues)
      : createMonthlyValues(
          MONTHS.map((_, monthIndex) =>
            projects.reduce((sum, project) => {
              const total = project.totalRow[monthIndex];
              return sum + (total?.value ?? 0);
            }, 0)
          )
        );

  return {
    personName,
    monthlyOverview: calculatedOverview,
    projects,
  };
}

export function generateId(prefix = ""): string {
  return `${prefix}${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getMonthIndex(month: Month): number {
  return MONTHS.indexOf(month);
}

export function getMonthName(index: number): Month {
  return MONTHS[index];
}
