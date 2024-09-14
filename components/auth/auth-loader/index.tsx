import Image from "next/image";

const AuthLoader = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col gap-y-4 justify-center items-center">
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={120}
        height={120}
        className="animate-pulse duration-700"
      />
    </div>
  );
};

export default AuthLoader;
