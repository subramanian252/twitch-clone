import React, { Suspense } from "react";
import Navbar from "./_components/Navbar";
import Sidebar, { SideBarSkeleton } from "./_components/Sidebar";
import Container from "./_components/Container";
import { RecommendSkeleton } from "./_components/Sidebar/Recommend";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const { children } = props;

  return (
    <div>
      <Navbar />
      <div className="flex h-full pt-20 ">
        <Suspense fallback={<SideBarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </div>
  );
}

export default Layout;
