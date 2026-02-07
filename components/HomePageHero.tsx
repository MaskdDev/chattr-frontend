import Image from "next/image";

export default function HomePageHero() {
  return (
    <div className="flex w-full flex-col items-center bg-linear-to-tr from-slate-950 from-65% to-cyan-300 pt-36 pb-20">
      <Image
        src="/logo.png"
        alt="The chatrooms logo - a text bubble on a blue-grey background"
        width={200}
        height={200}
        className="size-32 sm:size-40 md:size-52"
      />

      <div className="mt-5 space-y-2 px-5 sm:mt-10 sm:space-y-5 sm:px-10">
        <h1 className="text-center font-sans text-5xl sm:text-7xl md:text-8xl">
          Welcome to <span className="text-cyan-200">Chattr!</span>
        </h1>
        <h2 className="text-center font-sans text-xl sm:text-3xl md:text-4xl">
          A simple chat app to
          <br className="hidden sm:inline" />
          <span className="inline sm:hidden"> </span>
          help you communicate!
        </h2>
      </div>
    </div>
  );
}
