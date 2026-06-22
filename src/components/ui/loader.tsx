import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LoaderOne({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 w-full h-full min-h-[200px]", className)}>
      <div className="relative flex items-center justify-center w-16 h-16">
        <motion.div
          className="absolute inset-0 border-t-2 border-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 border-r-2 border-primary/50 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 border-b-2 border-primary/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
        Loading...
      </p>
    </div>
  );
}
