"use client";

import { cn } from "@/lib/utils";
import { useCreateSidebar } from "@/store/use-createsidebar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

function Wrapper(props: Props) {
  const { children } = props;

  const { collapsed } = useCreateSidebar((state) => state);

  return (
    <aside
      className={cn(
        "lg:w-60 w-[70px] bg-background h-full fixed left-0 flex flex-col border-r border-[#2D2E35]",
        collapsed && "lg:w-[70px]"
      )}
    >
      {children}
    </aside>
  );
}

export default Wrapper;
