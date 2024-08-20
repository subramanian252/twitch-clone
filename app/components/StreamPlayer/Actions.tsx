import { onFollow, onUnFollow } from "@/app/actions/Follow";
import { isFollowing } from "@/app/lib/follow-service";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface Props {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

function Actions(props: Props) {
  const { isFollowing, isHost } = props;

  const { userId } = useAuth();

  const router = useRouter();

  const [isPending, startTransition] = React.useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(props.hostIdentity)
        .then(() => {
          toast.success(`followed the user ${props.hostIdentity}`);
        })
        .catch(() => toast.error("could not follow the user"));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(props.hostIdentity)
        .then(() => {
          toast.success(`unfollowed the user ${props.hostIdentity}`);
        })
        .catch(() => toast.error("could not unfollow the user"));
    });
  };

  const toogleButton = () => {
    if (!userId) router.push("/sign-in");

    if (isHost) return;

    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      onClick={toogleButton}
      variant={"primary"}
      size={"sm"}
      disabled={isHost || isPending}
      className="w-full lg:w-fit flex gap-x-2"
    >
      <Heart
        className={cn(
          "w-4 h-4",
          props.isFollowing ? "fill-white" : "fill-none"
        )}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}

export default Actions;

export const ActionSkeleton = () => {
  return <Skeleton className="w-full h-10 lg:w-24" />;
};
