"use client";

import { cn } from "@/lib/utils";
import { useCreateSidebar } from "@/store/use-createsidebar";
import React, { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface Props {
  children: React.ReactNode;
}

function Container(props: Props) {
  const { children } = props;

  const { collapsed, onExpand, onCollapse } = useCreateSidebar(
    (state) => state
  );

  const matches = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
}

export default Container;
