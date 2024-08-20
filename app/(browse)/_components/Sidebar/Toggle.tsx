"use client";

import { Hint } from "@/app/components/Hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSideBar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import React from "react";

interface Props {}

function Toggle(props: Props) {
  const {} = props;

  const { collapsed, onExpand, onCollapse } = useSideBar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="hidden p-4 lg:flex flex-col items-center w-full justify-between">
          <Hint label={label} asChild side="right">
            <Button
              onClick={onExpand}
              className=" h-auto p-2"
              variant={"ghost"}
            >
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="pl-6 mb-2 p-4 flex items-center w-full ">
          <p className="text-lg font-semibold">For you</p>
          <Hint label={label} asChild side="right">
            <Button
              onClick={onCollapse}
              className="ml-auto h-auto p-2"
              variant={"ghost"}
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
}

export default Toggle;

export const ToggleSkeleton = () => {
  return (
    <div className="hidden p-4 lg:flex  items-center w-full justify-between">
      <Skeleton className="h-6 w-[150px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
};

export const ToggleSkeleton2 = () => {
  return (
    <div className="hidden p-4 lg:flex items-center w-full justify-between">
      <Skeleton className="h-6 w-full" />
    </div>
  );
};
