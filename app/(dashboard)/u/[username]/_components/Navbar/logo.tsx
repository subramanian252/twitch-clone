import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {}

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

function Logo(props: Props) {
  const {} = props;

  return (
    <Link href={"/"}>
      <div className="flex gap-x-4 items-center ">
        <div className="bg-white rounded-full shrink-0 lg:shrink mr-3 lg:mr-0 p-2">
          <Image src={"/spooky.svg"} alt="logo" width={32} height={32} />
        </div>
        <div className={cn("hidden lg:flex flex-col", font.className)}>
          <p className="text-lg font-semibold">Gamehub</p>
          <p className="text-xs text-muted-foreground">Creator Dashboard</p>
        </div>
      </div>
    </Link>
  );
}

export default Logo;
