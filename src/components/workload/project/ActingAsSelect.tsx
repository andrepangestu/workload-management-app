"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ActingAsSelectProps {
  actingAs?: string;
  actingAsValue?: string;
}

export default function ActingAsSelect({
  actingAs,
  actingAsValue,
}: ActingAsSelectProps) {
  const defaultValue =
    actingAs && actingAs !== "Acting As" ? actingAs : undefined;

  return (
    <div className="flex items-center mt-4">
      <div className="w-38 shrink-0">
        <Select defaultValue={defaultValue}>
          <SelectTrigger className="h-8 w-38 text-gray-600 bg-gray-100 border-0 text-sm">
            <SelectValue placeholder="Acting As" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="reviewer">Reviewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <input
        type="text"
        defaultValue={actingAsValue}
        className="h-10 px-3 text-sm text-gray-600 bg-gray-100 border-0 rounded-md transition-all ml-1"
        placeholder="Enter value..."
      />
    </div>
  );
}

