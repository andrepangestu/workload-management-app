import { useCallback, useState } from "react";
import type { WorkloadData, Project, ProjectRow } from "@/types/workload";
import { calculateOverviewTotal, calculateProjectTotal } from "@/lib/helpers";

const roundToTwoDecimals = (value: number): number =>
  Math.round(value * 100) / 100;

const updateRowMonthData = (
  rows: ProjectRow[],
  rowId: string,
  monthIndex: number,
  update: Partial<{ checked: boolean; value: number }>
): ProjectRow[] =>
  rows.map((row) =>
    row.id === rowId
      ? {
          ...row,
          monthData: row.monthData.map((m, i) =>
            i === monthIndex ? { ...m, ...update } : m
          ),
        }
      : row
  );

const recalculateProjectTotals = (
  project: Project,
  monthIndex: number
): Project => ({
  ...project,
  totalRow: project.totalRow.map((t, i) =>
    i === monthIndex
      ? {
          ...t,
          value: roundToTwoDecimals(calculateProjectTotal(project.rows, i)),
        }
      : t
  ),
});

const recalculateOverview = (
  data: WorkloadData,
  projects: Project[],
  monthIndex: number
): WorkloadData["monthlyOverview"] =>
  data.monthlyOverview.map((m, i) =>
    i === monthIndex
      ? { ...m, value: roundToTwoDecimals(calculateOverviewTotal(projects, i)) }
      : m
  );

export function useWorkloadData(initialData: WorkloadData) {
  const [data, setData] = useState<WorkloadData>(initialData);

  const updateRowData = useCallback(
    (
      projectId: string,
      rowId: string,
      monthIndex: number,
      update: Partial<{ checked: boolean; value: number }>
    ) => {
      setData((prev) => {
        const updatedProjects = prev.projects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                rows: updateRowMonthData(
                  project.rows,
                  rowId,
                  monthIndex,
                  update
                ),
              }
            : project
        );

        const projectsWithTotals = updatedProjects.map((project) =>
          project.id === projectId
            ? recalculateProjectTotals(project, monthIndex)
            : project
        );

        const newOverview = recalculateOverview(
          prev,
          projectsWithTotals,
          monthIndex
        );

        return {
          ...prev,
          projects: projectsWithTotals,
          monthlyOverview: newOverview,
        };
      });
    },
    []
  );

  const handleRowCheckChange = useCallback(
    (
      projectId: string,
      rowId: string,
      monthIndex: number,
      checked: boolean
    ) => {
      updateRowData(projectId, rowId, monthIndex, { checked });
    },
    [updateRowData]
  );

  const handleRowValueChange = useCallback(
    (projectId: string, rowId: string, monthIndex: number, value: number) => {
      updateRowData(projectId, rowId, monthIndex, { value });
    },
    [updateRowData]
  );

  return {
    data,
    handleRowCheckChange,
    handleRowValueChange,
  };
}
