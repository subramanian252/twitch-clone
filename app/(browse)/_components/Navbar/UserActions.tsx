import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Clapperboard } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {}

async function UserActions(props: Props) {
  const {} = props;

  const user = await currentUser();

  return (
    <div>
      {!user && (
        <div className="flex gap-x-1">
          <SignInButton>
            <Button variant={"primary"}>Login</Button>
          </SignInButton>
        </div>
      )}
      {!!user && (
        <div className="flex gap-x-1 items-center">
          <Button
            variant={"ghost"}
            size={"sm"}
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link className="flex gap-x-2" href={`/u/${user.username}`}>
              <Clapperboard className="h-5 w-5" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton />
        </div>
      )}
    </div>
  );
}

export default UserActions;
