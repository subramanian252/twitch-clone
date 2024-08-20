"use client";

import { cn } from "@/lib/utils";
import { useSideBar } from "@/store/use-sidebar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

function Wrapper(props: Props) {
  const { children } = props;

  const { collapsed } = useSideBar((state) => state);

  return (
    <aside
      className={cn(
        "w-60 bg-background h-full fixed left-0 flex flex-col border-r border-[#2D2E35]",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
}

export default Wrapper;
