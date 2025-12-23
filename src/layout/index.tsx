import { Header } from "@/components/header";
import { PropsWithChildren } from "react";

export const LayoutApp = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Header />

      <main className="container mx-auto xl:max-w-7xl">{children}</main>
    </div>
  );
};
