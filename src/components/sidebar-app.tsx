import { StoreIcon } from "lucide-react";
import { Separator } from "./ui/separator";

export const SidebarApp = () => {
  return (
    <aside className="h-full max-w-64 min-w-64 bg-neutral-800 text-white">
      <div className="flex w-full items-center gap-2 p-4">
        <div className="bg-secondary flex h-9 w-9 items-center justify-center rounded-md">
          <StoreIcon className="text-white/60" />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-bold">Nome App</span>
          <span className="text-xs opacity-80">Empresa/Grupo</span>
        </div>
      </div>

      {/*  */}
      <Separator />

      <div className="w-full p-2">
        <ul></ul>
      </div>
    </aside>
  );
};
