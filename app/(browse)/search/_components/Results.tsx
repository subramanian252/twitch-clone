import { getSearchResults } from "@/app/lib/search-service";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import ResultCard, { ResultCardSkeleton } from "./ResultCard";
interface Props {
  term: string;
}

async function Results(props: Props) {
  const { term } = props;

  const data = await getSearchResults(term);

  return (
    <div>
      <h2 className="text-lg font-smibold mb-4">Search results for "{term}"</h2>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">
          No streams found, try searching for something else
        </div>
      )}
      <div className="flex flex-col gap-4">
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
      <div className="flex flex-col gap-4">
        {[...Array(5)].map((_, index) => (
          <ResultCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
