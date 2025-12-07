"use client";

import { workloadData } from "@/data/WORKLOAD_DATA";
import { useWorkloadData } from "@/hooks/useWorkloadData";
import Overview from "./overview";
import Project from "./project";

export function WorkloadManager() {
  const { data, handleRowCheckChange, handleRowValueChange } =
    useWorkloadData(workloadData);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-full overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <header className="mb-10">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {data.personName}
          </h1>
          <p className="text-gray-500 mt-1 text-lg font-semibold">Workload</p>
        </header>

        <Overview months={data.monthlyOverview} />

        <section aria-label="Projects">
          {data.projects.map((project) => (
            <Project
              key={project.id}
              project={project}
              handleRowCheckChange={handleRowCheckChange}
              handleRowValueChange={handleRowValueChange}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
