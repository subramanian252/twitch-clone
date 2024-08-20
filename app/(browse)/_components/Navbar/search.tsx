"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import React, { useState } from "react";

interface Props {}

function Search(props: Props) {
  const {} = props;

  const [value, setValue] = useState("");

  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = queryString.stringifyUrl(
      {
        url: "/search",
        query: {
          term: value,
        },
      },
      {
        skipEmptyString: true,
      }
    );

    router.push(url);
  };

  return (
    <form onSubmit={onSubmit} className="">
      <div className="flex items-center relative">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="lg:w-[300px] w-full rounded-r-none focus-visible:ring-0 foucs-visible:ring-transparent focus-visible:ring-offset-0"
        />
        {value && (
          <X
            onClick={() => setValue("")}
            className="h-5 w-5 absolute top-2.5 right-14 text-muted-foreground cursor-pointer hover:opacity:75 transition"
          />
        )}
        <Button
          variant={"secondary"}
          className="rounded-l-none"
          size={"sm"}
          type="submit"
        >
          <SearchIcon className="h-5 w-5 " />
        </Button>
      </div>
    </form>
  );
}

export default Search;
