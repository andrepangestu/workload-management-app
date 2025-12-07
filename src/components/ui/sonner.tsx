"use client";

import {
  XCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CheckCircle2 className="size-5 text-green-500" />,
        info: <Info className="size-5 text-blue-500" />,
        warning: <AlertTriangle className="size-5 text-amber-500" />,
        error: <XCircle className="size-5 text-red-500" />,
        loading: <Loader2 className="size-5 animate-spin text-gray-500" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center gap-3 w-full px-4 py-3 bg-white rounded-lg shadow-lg border border-gray-100",
          title: "text-gray-800 text-sm font-medium",
          description: "text-gray-500 text-sm",
          error: "border-gray-100",
          success: "border-gray-100",
          warning: "border-gray-100",
          info: "border-gray-100",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
