import { FormButtonLoading } from "@/components/form-button-loading";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/use-session";
import { cn } from "@/lib/utils";
import { supabase } from "@/services/supabase-client";
import { useMutation } from "@tanstack/react-query";
import { IdCardIcon } from "lucide-react";

export interface ValidateResponse {
  valid: boolean;
  token?: string;
}

export const ValidateDocument = ({
  value,
  onChange,
  onFinish,
}: {
  value: string;
  onChange: (value: string) => void;
  onFinish: (response: ValidateResponse) => void;
}) => {
  const { session } = useSession();

  const { mutate: validate, isPending } = useMutation({
    mutationFn: async (document: string) => {
      const response = await supabase.functions.invoke(
        "validate-connect-plus",
        {
          body: {
            name: "Teste",
          },
          headers: {
            Authorization: `Bearer ${session?.session?.access_token}`,
          },
        },
      );

      console.log(response);

      onFinish({ valid: true, token: "sample-token" });
    },
  });

  const handleValidate = () => {
    validate(value);
  };

  return (
    <div className="flex items-center justify-between rounded-4xl border border-white/10 bg-neutral-800 p-4">
      <div className="relative flex flex-1 items-center gap-4 pr-4">
        <IdCardIcon className="ml-4 text-gray-400/50" size={28} />

        <Input
          className={cn(
            "w-full border-l border-none bg-transparent outline-none focus:ring-0",
          )}
          placeholder="Informe o CPF/CNPJ"
          type="text"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>
      <button
        disabled={isPending}
        type="button"
        onClick={handleValidate}
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
