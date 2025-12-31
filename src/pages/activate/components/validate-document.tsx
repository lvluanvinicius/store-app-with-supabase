import { FormButtonLoading } from "@/components/form-button-loading";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IdCardIcon } from "lucide-react";

export const ValidateDocument = ({
  value,
  isPending,
  onChange,
  onValidate,
}: {
  value: string;
  isPending: boolean;
  onChange: (value: string) => void;
  onValidate: () => void;
}) => {
  return (
    <div className="flex items-center justify-between rounded-4xl border border-white/10 bg-neutral-800 p-4">
      <div className="relative flex flex-1 items-center gap-4 pr-4">
        <IdCardIcon className="ml-4 text-gray-400/50" size={28} />

        <Input
          className={cn("w-full border-l border-none bg-transparent outline-none focus:ring-0")}
          placeholder="Informe o CPF/CNPJ"
          type="text"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>
      <button
        disabled={isPending}
        type="button"
        onClick={onValidate}
        className="cursor-pointer rounded-4xl bg-neutral-700 px-4 py-2 text-sm hover:bg-neutral-600"
      >
        <FormButtonLoading
          processing={isPending}
          messages={{
            create: "Validar",
          }}
          action="POST"
        />
      </button>
    </div>
  );
};
