import { Separator } from "@/components/ui/separator";
import { PropsWithChildren } from "react";

export const ActivateLayout = ({ children }: PropsWithChildren) => {
  return (
    // 1. TRAVA A WINDOW: 'fixed inset-0' ocupa a tela toda e não deixa o body scrollar.
    <div className="fixed inset-0 bg-neutral-900 text-white">
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between py-3">
          <div className="h-8">
            <img
              src="https://grupocednet.com.br/wp-content/uploads/2023/08/cednet-white.png"
              className="h-full w-full"
            />
          </div>
          <div className="h-8">
            <img
              src="https://conectamais.grupocednet.com.br/storage/logo_conecta_mais_branco.webp"
              className="h-full w-full"
            />
          </div>
        </header>

        <Separator className="mb-4" />

        <main>{children}</main>
      </div>
    </div>
  );
};
