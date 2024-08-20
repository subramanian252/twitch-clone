import React from "react";
import Wrapper from "./Wrapper";
import Toggle, { ToggleSkeleton } from "./Toggle";
import Navigation from "./Navigation";
import { usePathname } from "next/navigation";

interface Props {}

async function Sidebar(props: Props) {
  const {} = props;

  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
}

export default Sidebar;

export function SideBarSkeleton() {
  return (
    <aside className="fixed left-0 flex flex-col bg-background w-[70px] lg:w-60 h-full border-r border-[#2D2E35] z-[999]">
      <ToggleSkeleton />
    </aside>
  );
}
