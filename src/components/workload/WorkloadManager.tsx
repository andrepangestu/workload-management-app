"use client";

import React from "react";
import { workloadData } from "@/data/WORKLOAD_DATA";
import type { WorkloadData } from "@/app/types/workload";
import Overview from "./overview";
import Project from "./project";
import { calculateOverviewTotal, calculateProjectTotal } from "@/lib/helpers";

export function WorkloadManager() {
  const [data, setData] = React.useState<WorkloadData>(workloadData);

  const handleRowCheckChange = (
    projectId: string,
    rowId: string,
    monthIndex: number,
    checked: boolean
  ) => {
    setData((prev) => {
      const updatedProjects = prev.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              rows: p.rows.map((r) =>
                r.id === rowId
                  ? {
                      ...r,
                      monthData: r.monthData.map((m, i) =>
                        i === monthIndex ? { ...m, checked } : m
                      ),
                    }
                  : r
              ),
            }
          : p
      );

      const finalProjects = updatedProjects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              totalRow: p.totalRow.map((t, i) =>
                i === monthIndex
                  ? {
                      ...t,
                      value:
                        Math.round(calculateProjectTotal(p.rows, i) * 100) /
                        100,
                    }
                  : t
              ),
            }
          : p
      );

      const newOverview = prev.monthlyOverview.map((m, i) =>
        i === monthIndex
          ? {
              ...m,
              value:
                Math.round(calculateOverviewTotal(finalProjects, i) * 100) /
                100,
            }
          : m
      );

      return {
        ...prev,
        monthlyOverview: newOverview,
        projects: finalProjects,
      };
    });
  };

  const handleRowValueChange = (
    projectId: string,
    rowId: string,
    monthIndex: number,
    newValue: number
  ) => {
    setData((prev) => {
      const updatedProjects = prev.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              rows: p.rows.map((r) =>
                r.id === rowId
                  ? {
                      ...r,
                      monthData: r.monthData.map((m, i) =>
                        i === monthIndex ? { ...m, value: newValue } : m
                      ),
                    }
                  : r
              ),
            }
          : p
      );

      const finalProjects = updatedProjects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              totalRow: p.totalRow.map((t, i) =>
                i === monthIndex
                  ? {
                      ...t,
                      value:
                        Math.round(calculateProjectTotal(p.rows, i) * 100) /
                        100,
                    }
                  : t
              ),
            }
          : p
      );

      const newOverview = prev.monthlyOverview.map((m, i) =>
        i === monthIndex
          ? {
              ...m,
              value:
                Math.round(calculateOverviewTotal(finalProjects, i) * 100) /
                100,
            }
          : m
      );

      return {
        ...prev,
        monthlyOverview: newOverview,
        projects: finalProjects,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-full overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {data.personName}
          </h1>
          <p className="text-gray-500 mt-1 text-lg font-semibold">Workload</p>
        </div>

        <Overview
          months={data.monthlyOverview.map((m) => ({ ...m, checked: false }))}
        />

        {data.projects.map((project) => (
          <Project
            key={project.id}
            project={project}
            handleRowCheckChange={handleRowCheckChange}
            handleRowValueChange={handleRowValueChange}
          />
        ))}
      </div>
    </div>
  );
}
