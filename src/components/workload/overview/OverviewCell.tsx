import { getOverviewColor } from "@/lib/helpers";
import React from "react";

const OverviewCell: React.FC<{ value: number }> = ({ value }) => {
  const colorClass = getOverviewColor(value);
  return (
    <div className="w-[76px] flex justify-center">
      <div
        className={`flex h-8 min-w-18 items-center justify-center rounded-sm px-4 text-sm font-medium ${colorClass}`}
      >
        {value}
      </div>
    </div>
  );
};

export default OverviewCell;
