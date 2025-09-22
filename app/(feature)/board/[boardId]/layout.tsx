import { useQueries, useQuery } from "convex/react";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";
import { api } from "../../../../convex/_generated/api";
import { convexInstance } from "../../../../convex/instance";
import { Id } from "../../../../convex/_generated/dataModel";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}): Promise<Metadata> {
  console.log("Generating metadata for board:", params.boardId);
  let board;
  try {
    board = await convexInstance.query(api.queries.board.getById, {
      id: params.boardId as Id<"boards">,
    });
    if (!board) {
      notFound();
    }
  } catch (error) {
    notFound();
  }
  return {
    title: `Board | ${board?.title}`,
  };
}

export default async function BoardIdLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { boardId: string };
}) {
  return <>{children}</>;
}
