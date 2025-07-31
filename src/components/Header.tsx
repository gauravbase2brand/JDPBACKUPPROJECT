import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const Header = () => {
  return (
    <div className="bg-card border-b border-border px-6 py-4 animate-fade-in shadow-sm flex items-center justify-between">
      <h1 className="text-2xl font-medium text-foreground">Dashboard</h1>

      <div>
      <div>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="b">
                Hover
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center space-x-3">
        <div></div>
        <div></div>
        <div></div>
      </div>
      </div>
    </div>
  );
};

export default Header;
