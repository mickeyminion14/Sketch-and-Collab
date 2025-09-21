"use client";

import { generateRandomColor } from "../../../../../lib/colors";
import UserAvatar from "./user-avatar";
import { useOthers, useSelf } from "@liveblocks/react";

const MAX_SHOWN_USERS = 3;
export const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div className="absolute h-12 top-2 right-2 rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {currentUser && (
          <UserAvatar
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={
              currentUser.info?.name
                ? currentUser.info.name
                    .split(" ")
                    .map((n: string) => `${n[0]}`)
                    .join("")
                    .toUpperCase()
                : "?"
            }
            borderColor={generateRandomColor(currentUser.connectionId)}
          />
        )}
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            key={connectionId}
            src={info?.picture}
            name={info?.name}
            fallback={
              info?.name
                ? info.name
                    .split(" ")
                    .map((n: string) => `${n[0]}`)
                    .join("")
                    .toUpperCase()
                : "?"
            }
            borderColor={generateRandomColor(connectionId)}
          />
        ))}
        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 rounded-md p-3 bg-white flex items-center shadow-md w-[300px]">
      <div className="h-full w-full bg-muted-400" />
    </div>
  );
};
