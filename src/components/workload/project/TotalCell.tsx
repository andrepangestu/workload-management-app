import React from "react";

const TotalCell: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="w-[76px] flex justify-center">
      <span className="text-base font-semibold">{value}</span>
    </div>
  );
};

export default TotalCell;
