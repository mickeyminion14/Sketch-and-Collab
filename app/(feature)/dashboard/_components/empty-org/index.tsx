import Image from "next/image";
import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";

const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={"elements.svg"} height={200} width={200} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">Welcome to Board</h2>
      <p className="text-sm text-muted-foreground mt-2">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"lg"}>Create Organization</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-fit">
            <CreateOrganization routing="hash" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmptyOrg;
