import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LinkButton({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Button
      size="lg"
      className="w-32 bg-slate-200 font-sans text-lg text-slate-950 hover:text-slate-50"
      asChild
    >
      <Link href={href}>{text}</Link>
    </Button>
  );
}
