import React from "react";
import OverviewCell from "./OverviewCell";
import { MonthlyValue } from "@/types/workload";

const Overview: React.FC<{ months: MonthlyValue[] }> = ({ months }) => {
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <div className="w-24 shrink-0" />
          <div className="flex">
            {months.map((month, idx) => (
              <div key={idx} className="w-[76px] text-center">
                <span className="text-sm font-medium text-gray-400">
                  {month.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-24 shrink-0" />
          <div className="flex">
            {months.map((month, idx) => (
              <OverviewCell key={idx} value={month.value} />
            ))}
          </div>
        </div>
      </div>
      <hr className="my-8 border-gray-200 border-1" />
    </>
  );
};

export default Overview;
