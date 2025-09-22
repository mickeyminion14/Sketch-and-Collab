import Image from "next/image";

const EmptySearch = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image alt="Empty" src={"/empty-search.svg"} height={140} width={140} />
      <h2 className="text-2xl font-semibold mt-6">No Results found</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try searching for something else
      </p>
    </div>
  );
};

export default EmptySearch;
