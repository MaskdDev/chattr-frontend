import { Spinner } from "@/components/ui/spinner";

export default function RoomMessagesLoading() {
  return (
    <div className="flex h-7/12 w-full flex-col items-center justify-center gap-4 sm:gap-8">
      <h1 className="text-center text-3xl font-light text-black sm:text-5xl">
        Loading Messages...
      </h1>
      <Spinner className="size-10 sm:size-20" />
    </div>
  );
}
