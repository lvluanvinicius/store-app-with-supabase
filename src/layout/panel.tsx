import { SidebarApp } from "@/components/sidebar-app";
import { PropsWithChildren } from "react";

export const LayoutPanel = ({ children }: PropsWithChildren) => {
  return (
    <div className="fixed inset-0 bg-neutral-900 text-white">
      <SidebarApp />
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="overflow-auto">{children}</div>
      </main>
    </div>
  );
};
