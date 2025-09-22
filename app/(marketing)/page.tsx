import Link from "next/link";
import { Button } from "../../components/ui/button";
import { headingFont, textFont } from "../../lib/font";
import { cn } from "../../lib/utils";
import { Medal, Pen } from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col gap-5",
          headingFont.className
        )}
      >
        <div className=" mb-4 flex items-center border shadow-sm p-4 bg-orange-50 text-orange-500 rounded-full uppercase">
          <Pen className="h-6 w-6 mr-2" />
          The No. 1 Creative Workspace
        </div>
        <h1 className="text-2xl md:text-5xl text-center text-neutral-800 mb-6">
          Sketch & Collab makes collaboration effortless
        </h1>
        <div className="text-2xl md:text-5xl bg-gradient-to-r from-orange-400 to-orange-700 text-white p-4 rounded-md  w-fit">
          Create together.
        </div>
      </div>
      <div
        className={cn(
          "text-small md:text-xl text-neutral-600 mt-4 max-w-xs md:max-w-2xl text-center mx-auto ",
          textFont.className
        )}
      >
        Sketch ideas, collaborate with your team, and bring your concepts to
        life seamlessly. - accomplish it all with Sketch & Collab.
      </div>
      <Button className="mt-6" variant={"primaryOrange"} size={"lg"} asChild>
        <Link href="/dashboard">Try Sketch & Collab for free</Link>
      </Button>
    </div>
  );
}
