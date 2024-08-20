import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Results, { ResultSkeleton } from "./_components/Results";

interface Props {
  searchParams: {
    term?: string;
  };
}

function Page(props: Props) {
  const { searchParams } = props;

  if (!searchParams.term) return redirect("/");

  return (
    <div className="h-full p-6 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
    </div>
  );
}

export default Page;
