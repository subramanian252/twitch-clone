import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface Props {}

function NotFoundPage(props: Props) {
  const {} = props;

  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p>W couldn't find the page you were looking for.</p>

      <Button variant={"outline"}>
        <Link href={"/"}>Go to Home</Link>
      </Button>
    </div>
  );
}

export default NotFoundPage;
