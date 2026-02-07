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
      className="bg-slate-200 text-lg text-slate-950 hover:text-white"
      asChild
    >
      <Link href={href}>{text}</Link>
    </Button>
  );
}
