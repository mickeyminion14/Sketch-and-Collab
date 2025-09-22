import Link from "next/link";
import NotFoundImage from "../public/404.jpg";
import Image from "next/image";
export default function NotFound() {
  return (
    <div className="flex items-center justify-center flex-col h-full">
      <div className="relative md:h-[500px] md:w-[1040px] h-[250px] w-[350px]">
        <Image fill src={NotFoundImage} alt="Not Found" />
      </div>
      <div className="mt-1 flex items-center justify-center">
        <Link className="underline" href="/">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
