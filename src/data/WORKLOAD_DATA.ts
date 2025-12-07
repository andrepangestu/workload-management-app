import {
  createWorkloadData,
  createProject,
  createProjectRow,
} from "./factories";
import type { WorkloadData } from "@/app/types/workload";

export const workloadData: WorkloadData = createWorkloadData({
  personName: "BIANCHINI Thierry",
  projects: [
    createProject({
      id: "1",
      name: "Serial Life PSA",
      region: "Europe",
      company: "STELLANTIS",
      brand: "PSA",
      rows: [
        createProjectRow({
          id: "row-1-1",
          label: "DE",
          subLabel: "MR10R801",
          values: 1,
          actingAs: "",
          actingAsValue: "",
        }),
        createProjectRow({
          id: "row-1-2",
          label: "DE",
          subLabel: "MR10R802",
          values: 1,
          actingAs: "support",
          actingAsValue: "test",
        }),
      ],
    }),
    createProject({
      id: "2",
      name: "Serial Life PSA",
      region: "Europe",
      company: "STELLANTIS",
      brand: "PSA",
      rows: [
        createProjectRow({
          id: "row-2-1",
          label: "DE",
          subLabel: "MR10R803",
          values: 1,
          actingAs: "lead",
          actingAsValue: "Andre",
        }),
      ],
    }),
  ],
});
