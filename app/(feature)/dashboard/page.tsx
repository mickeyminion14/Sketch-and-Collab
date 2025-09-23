"use client";

import { useOrganization } from "@clerk/nextjs";
import EmptyOrg from "./_components/empty-org";
import BoardList from "./_components/board-list";

export default function DashboardPage() {
  const { organization } = useOrganization();
  return (
    <div className="flex flex-col gap-y-4 flex-1 h-[calc(100%-80px)]">
      {!organization ? <EmptyOrg /> : <BoardList orgId={organization.id} />}
    </div>
  );
}
