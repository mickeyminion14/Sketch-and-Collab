import Link from "next/link";
import { Button } from "../../components/ui/button";
import { headingFont, textFont } from "../../lib/font";
import { cn } from "../../lib/utils";
import { ArrowRight, Medal, Pen } from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
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
          "text-small md:text-xl text-neutral-600 mt-4  text-center",
          textFont.className,
          "typewriter"
        )}
      >
        Sketch ideas, collaborate with your team, and bring your concepts to
        life seamlessly. - accomplish it all with Sketch & Collab.
      </div>
      <div className="mt-8 flex justify-center items-center flex-col">
        <h1 className="text-xl md:text-4xl text-center max-w-[800px] text-neutral-800 mb-6">
          Creative Collaboration: fast sketches, connected teams
        </h1>
        <p className="max-w-[800px] text-lg text-neutral-700">
          Bringing ideas to life has never been this seamless. With Sketch &
          Collab, your team can brainstorm, draw, annotate, and share in
          real-time—all in one interactive workspace. From wireframes to sticky
          notes to polished designs, everything is collaborative, customizable,
          and designed to keep your team engaged. It’s intuitive, dynamic, and,
          most importantly, fun.
        </p>
      </div>
      <Button className="mt-6" variant={"primaryOrange"} size={"lg"} asChild>
        <Link href="/dashboard">
          Try Sketch & Collab for free <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
