import React from "react";
import Hint from "../../../../../../../components/common/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

const UserAvatar = ({ borderColor, fallback, name, src }: UserAvatarProps) => {
  return (
    <Hint label={name || "Teammate"} side="bottom" sideOffset={18}>
      <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} alt={name || "Teammate"} />
        <AvatarFallback className="text-xm font-semibold">
          {fallback || "?"}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};

export default UserAvatar;
