import React from "react";
import Logo from "./_components/logo";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const { children } = props;

  return (
    <div
      className="h-full flex flex-col gap-y-6 items-center justify-center bg-gradient-to-b from-[#1e026d25] to-[#15162c]'
  "
    >
      <Logo />
      {children}
    </div>
  );
}

export default Layout;
