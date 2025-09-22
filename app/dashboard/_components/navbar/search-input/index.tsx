"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import React, { ChangeEvent, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "../../../../../components/ui/input";

const SearchInput = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [debouncedSearch] = useDebounceValue(search, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/dashboard",
        query: { search: debouncedSearch },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedSearch, router]);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        onChange={handleChange}
        className="w-full max-w-[516px] pl-9 focus-visible:ring-0  focus-visible:ring-offset-0 focus-visible:ring-transparent"
        placeholder="Search boards..."
      />
    </div>
  );
};

export default SearchInput;
