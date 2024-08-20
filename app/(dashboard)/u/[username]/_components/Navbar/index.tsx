import React from "react";
import Logo from "./logo";
import UserActions from "./UserActions";

interface Props {}

function Navbar(props: Props) {
  const {} = props;

  return (
    <div className="fixed top-0 h-20 w-full bg-[#252731] flex items-center justify-between px-2 lg:px-4">
      <Logo />
      <UserActions />
    </div>
  );
}

export default Navbar;
