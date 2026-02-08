import { ReactNode } from "react";

/**
 * A container that takes up the whole width and height of its parent, and centres its contents in a flex layout.
 * @param children The nodes to display in this container.
 */
export default function CentredGradientContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-tr from-slate-950 from-65% to-cyan-300">
      {children}
    </div>
  );
}
