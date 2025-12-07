"use client";

import React from "react";
import dynamic from "next/dynamic";
import TotalCell from "./TotalCell";
import ProjectDataCell from "./ProjectDataCell";
import type { Project as ProjectType } from "@/types/workload";

const ActingAsSelect = dynamic(() => import("./ActingAsSelect"), {
  ssr: false,
});

interface ProjectProps {
  project: ProjectType;
  handleRowCheckChange: (
    projectId: string,
    rowId: string,
    monthIndex: number,
    checked: boolean
  ) => void;
  handleRowValueChange: (
    projectId: string,
    rowId: string,
    monthIndex: number,
    value: number
  ) => void;
}

const Project: React.FC<ProjectProps> = ({
  project,
  handleRowCheckChange,
  handleRowValueChange,
}) => {
  return (
    <div className="mb-8">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          {project.name}
          <span className="text-md font-medium text-gray-500">
            {" "}
            | {project.region} | {project.company} | {project.brand}
          </span>
        </h2>
      </div>

      <div className="flex items-center mb-3">
        <div className="w-24 shrink-0 text-right">
          <span className="text-base text-gray-400 ">Total</span>
        </div>
        <div className="flex">
          {project.totalRow.map((monthData, idx) => (
            <TotalCell key={idx} value={monthData.value} />
          ))}
        </div>
      </div>

      {project.rows.map((row) => (
        <div key={row.id} className="space-y-2 mb-8">
          <div className="flex items-start">
            <div className="w-24 shrink-0 flex items-start gap-2">
              <div className="w-1 h-5 bg-blue-500 rounded-full" />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium text-gray-700">
                  {row.label} |
                </span>
                <span className="text-xs text-gray-400">{row.subLabel}</span>
              </div>
            </div>
            <div className="flex-col">
              <div className="flex">
                {row.monthData.map((monthData, idx) => (
                  <ProjectDataCell
                    key={idx}
                    value={monthData.value}
                    checked={monthData.checked || false}
                    onCheckChange={(checked) =>
                      handleRowCheckChange(project.id, row.id, idx, checked)
                    }
                    onValueChange={(value) =>
                      handleRowValueChange(project.id, row.id, idx, value)
                    }
                  />
                ))}
              </div>

              {row.actingAs !== undefined && (
                <ActingAsSelect
                  actingAs={row.actingAs}
                  actingAsValue={row.actingAsValue}
                />
              )}
            </div>
          </div>
        </div>
      ))}

      <hr className="mt-8 border-gray-100" />
    </div>
  );
};

export default Project;
