import React from "react";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import Container from "./_components/Container";
import { getSelfByUserName } from "@/app/lib/auth-service";

interface Props {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

function Layout(props: Props) {
  const { children, params } = props;

  const data = getSelfByUserName(params.username);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="flex h-full pt-20 ">
        <Container>{children}</Container>
      </div>
    </div>
  );
}

export default Layout;
