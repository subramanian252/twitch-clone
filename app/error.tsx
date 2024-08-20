"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface Props {}

function Error(props: Props) {
  const {} = props;

  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <p>Something went wrong</p>

      <Button variant={"outline"} asChild>
        <Link href={"/"}>Go to Home</Link>
      </Button>
    </div>
  );
}

export default Error;
