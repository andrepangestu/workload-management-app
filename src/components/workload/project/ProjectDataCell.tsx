import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { toast } from "sonner";

const ProjectDataCell: React.FC<{
  value: number;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
  onValueChange: (value: number) => void;
}> = ({ value, checked, onCheckChange, onValueChange }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editValue, setEditValue] = React.useState(value.toString());
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setEditValue(value.toString());
  }, [value]);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleValueClick = () => {
    setIsEditing(true);
  };

  const validateAndSave = () => {
    setIsEditing(false);

    const numValue = parseFloat(editValue);
    if (isNaN(numValue)) {
      toast.error("Please enter a valid number.");
      setEditValue(value.toString());
      return;
    }

    if (numValue < 0 || numValue > 5) {
      toast.error("Staffing must be between 0 and 5.");
      setEditValue(value.toString());
      return;
    }

    onValueChange(numValue);
  };

  const handleInputBlur = () => {
    validateAndSave();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      validateAndSave();
    }
    if (e.key === "Escape") {
      setEditValue(value.toString());
      setIsEditing(false);
    }
  };

  const getCellStyle = () => {
    if (checked) {
      return "bg-orange-100 border-orange-100";
    }
    return "bg-gray-50 border-gray-200 hover:border-gray-300";
  };

  return (
    <div className="w-[76px] flex justify-center">
      <div
        className={`
          flex h-8 min-w-18 items-center justify-center gap-1.5 
          rounded-lg border px-2 text-sm font-medium
          transition-all
          ${getCellStyle()}
        `}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className="w-8 h-6 text-center text-sm bg-white border border-blue-400 rounded outline-none focus:ring-1 focus:ring-blue-500"
          />
        ) : (
          <span
            onClick={!checked ? handleValueClick : undefined}
            className={`cursor-text hover:bg-white/50 px-1 rounded ${
              checked ? "text-orange-500" : "text-gray-600"
            }`}
          >
            {value}
          </span>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Checkbox
              checked={checked}
              onCheckedChange={(checked) => onCheckChange(checked as boolean)}
              className={`${
                checked
                  ? "bg-orange-500 text-white"
                  : "bg-gray-50 border-gray-200 hover:border-gray-300 transition-colors"
              }`}
            />
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-gray-800 text-white">
            Mark as fictive
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ProjectDataCell;
