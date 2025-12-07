"use client";

import dynamic from "next/dynamic";

const WorkloadManager = dynamic(
  () =>
    import("@/components/workload/WorkloadManager").then(
      (mod) => mod.WorkloadManager
    ),
  { ssr: false }
);

export default function Home() {
  return <WorkloadManager />;
}
