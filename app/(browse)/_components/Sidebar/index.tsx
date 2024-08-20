import React from "react";
import Wrapper from "./Wrapper";
import Toggle, { ToggleSkeleton, ToggleSkeleton2 } from "./Toggle";
import Recommend, { RecommendSkeleton } from "./Recommend";
import { getRecommend } from "@/app/lib/recommend-service";
import { getFollowers } from "@/app/lib/follow-service";
import Following from "./Following";

interface Props {}

async function Sidebar(props: Props) {
  const {} = props;

  const following = await getFollowers();
  const recommended = await getRecommend();

  return (
    <Wrapper>
      <Toggle />
      <div className="pt-4 lg:pt-0 ">
        <Following data={following as any} />
        <Recommend data={recommended} />
      </div>
    </Wrapper>
  );
}

export default Sidebar;

export function SideBarSkeleton() {
  return (
    <aside className="fixed left-0 flex flex-col bg-background w-[70px] lg:w-60 h-full border-r border-[#2D2E35] z-[999]">
      <ToggleSkeleton />
      <RecommendSkeleton />
      <ToggleSkeleton2 />
      <RecommendSkeleton />
    </aside>
  );
}
