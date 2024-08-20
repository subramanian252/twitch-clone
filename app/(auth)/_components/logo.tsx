import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import React from "react";

interface Props {}

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

function Logo(props: Props) {
  const {} = props;

  return (
    <div className="flex flex-col items-center gap-y-3">
      <div className="bg-white rounded-full p-3">
        <Image src={"/spooky.svg"} alt="logo" width={100} height={100} />
      </div>
      <div className={cn("flex flex-col items-center gap-y-1", font.className)}>
        <p className="text-xl font-semibold">Gamehub</p>
        <p className="text-sm text-muted-foreground">let's play</p>
      </div>
    </div>
  );
}

export default Logo;
