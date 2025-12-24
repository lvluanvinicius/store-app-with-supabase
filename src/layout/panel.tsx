import { PropsWithChildren } from "react";

export const LayoutPanel = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <main className="container mx-auto xl:max-w-7xl">{children}</main>
    </div>
  );
};
