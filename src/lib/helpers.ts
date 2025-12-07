import type { Project, ProjectRow } from "@/types/workload";

export const getOverviewColor = (value: number): string => {
  if (value >= 2) return "bg-sky-200 text-sky-800";
  if (value >= 1 && value < 2) return "bg-teal-200 text-teal-800";
  if (value > 0 && value < 1) return "bg-amber-100 text-amber-800";
  if (value === 0) return "bg-red-200 text-red-800";
  return "bg-gray-100 text-gray-500";
};

export const calculateProjectTotal = (
  rows: ProjectRow[],
  monthIndex: number
): number => {
  return rows.reduce((sum, row) => {
    const monthData = row.monthData[monthIndex];
    if (monthData && !monthData.checked) {
      return sum + monthData.value;
    }
    return sum;
  }, 0);
};

export const calculateOverviewTotal = (
  projects: Project[],
  monthIndex: number
): number => {
  return projects.reduce((sum, project) => {
    return sum + calculateProjectTotal(project.rows, monthIndex);
  }, 0);
};
