import Image from "next/image";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";

export default function HomePageHeader() {
  return (
    <div className="fixed top-0 flex h-16 w-full flex-row items-center justify-between bg-slate-950/60 px-5 py-2 backdrop-blur-3xl">
      <div className="flex flex-row items-center gap-3">
        <Image
          src="/logo.png"
          alt="The chatrooms logo - a text bubble on a blue-grey background"
          width={30}
          height={30}
          className="inline-block align-middle"
        />
        <h1 className="align-middle font-sans text-3xl text-cyan-200">
          Chattr
        </h1>
      </div>
      <div className="flex flex-row items-center">
        <Button
          className="hover:brightness-150"
          size="icon-lg"
          aria-label="View GitHub Source"
          asChild
        >
          <a href="https://github.com/MaskdDev/chattr-frontend">
            <SiGithub className="size-6" />
          </a>
        </Button>
        <button className="hover:brightness-150"></button>
      </div>
    </div>
  );
}
