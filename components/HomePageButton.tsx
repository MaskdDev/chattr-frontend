import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePageButton({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Button
      size="lg"
      className="w-32 bg-slate-200 text-lg text-slate-950 hover:text-white"
      asChild
    >
      <a href={href}>{text}</a>
    </Button>
  );
}
