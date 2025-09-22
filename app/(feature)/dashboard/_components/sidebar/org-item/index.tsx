"use client";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import { cn } from "../../../../../../lib/utils";
import Hint from "../../../../../../components/common/hint";

interface OrgItem {
  id: string;
  name: string;
  imageUrl: string;
}

const OrgItem = ({ id, imageUrl, name }: OrgItem) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();
  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };

  return (
    <div className="aspect-square relative">
      <Hint label={name} side="right" align="start" sideOffset={18}>
        <Image
          width={100}
          height={100}
          alt={name}
          src={imageUrl}
          onClick={onClick}
          className={cn(
            "rounded-md cursor-pointer opacity-50 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </Hint>
    </div>
  );
};

export default OrgItem;
