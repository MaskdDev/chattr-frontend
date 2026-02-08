import Image from "next/image";
import SourceDropdown from "@/components/SourceDropdown";
import HomePageButton from "@/components/HomePageButton";
import CentredGradientContainer from "@/components/CentredGradientContainer";

export default function HomePageHero() {
  return (
    <CentredGradientContainer>
      <div className="flex flex-col items-center">
        <Image
          src="/logo.png"
          alt="The chatrooms logo - a text bubble on a blue-grey background"
          width={200}
          height={200}
          className="size-32 sm:size-40 md:size-52"
        />
        <div className="mt-8 space-y-2 px-5 sm:mt-10 sm:space-y-5 sm:px-10">
          <h1 className="text-center font-sans text-5xl text-slate-50 sm:text-7xl md:text-8xl">
            Welcome to <span className="text-cyan-200">Chattr!</span>
          </h1>
          <h2 className="text-center font-sans text-lg text-slate-50 sm:text-3xl">
            A simple chat app to
            <br className="hidden sm:inline" />
            <span className="inline sm:hidden"> </span>
            help you communicate!
          </h2>
        </div>

        <div className="mt-3 flex w-full flex-col flex-wrap items-center justify-center gap-2 px-10 sm:mt-7 sm:flex-row sm:gap-5">
          <HomePageButton href="/signup" text="Sign Up" />
          <HomePageButton href="/signin" text="Sign In" />
          <SourceDropdown />
        </div>
      </div>
    </CentredGradientContainer>
  );
}
