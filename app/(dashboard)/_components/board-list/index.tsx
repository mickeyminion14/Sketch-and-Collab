"use client";

interface BoardList {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}
const BoardList = ({ orgId, query }: BoardList) => {
  return <div>{JSON.stringify(query)}</div>;
};

export default BoardList;
