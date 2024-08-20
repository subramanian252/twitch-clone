import { getStreams } from "@/app/lib/feed-services";
import React from "react";
import ResultCard, { ResultCardSkeleton } from "./ResultCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {}

async function Results(props: Props) {
  const {} = props;

  const data = await getStreams();

  return (
    <div>
      <h2 className="text-lg font-smibold mb-4">
        Streams we think you'll like
      </h2>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">No streams found</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((stream) => (
          <ResultCard key={stream.id} stream={stream} />
        ))}
      </div>
    </div>
  );
}

export default Results;

export function ResultSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
          <ResultCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
