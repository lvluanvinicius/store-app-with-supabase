import { FormButtonLoading } from "@/components/form-button-loading";
import { translateMessages } from "@/lib/translate-messages";
import { cn } from "@/lib/utils";
import { supabase } from "@/services/supabase-client";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";

export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: async () => {
      setErrorMessage(null);

      if (!email || !password) {
        setErrorMessage("Por favor, preencha todos os campos.");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(translateMessages.ptBR[error.code || error.message]);
        return;
      }

      navigate({ to: "/dashboard" });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-sm text-neutral-400">Email</span>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "rounded-md border border-neutral-500/60 bg-neutral-900 px-4 py-2 text-sm placeholder:text-neutral-500/70",
          )}
        />
      </label>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm text-neutral-400">
            Senha
          </label>

          <span className="cursor-pointer text-sm opacity-50 hover:underline">
            Recuperar senha?
          </span>
        </div>
        <input
          id="password"
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={cn(
            "rounded-md border border-neutral-500/60 bg-neutral-900 px-4 py-2 text-sm placeholder:text-neutral-500/70",
          )}
        />
      </div>

      {errorMessage && <p className="text-center text-xs text-red-500">{errorMessage}</p>}

      <button
        type="submit"
        className="bg-secondary/70 hover:bg-secondary border-secondary flex cursor-pointer items-center justify-center gap-2 rounded-md border py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isPending}
      >
        <FormButtonLoading
          processing={isPending}
          action="POST"
          messages={{
            create: "Entrar",
            creating: "Aguarde...",
          }}
        />
      </button>

      <div className="flex w-full items-center justify-center text-sm">
        <Link to="/register">
          Ainda não tem uma conta?{" "}
          <span className="text-secondary hover:underline"> Criar conta</span>
        </Link>
      </div>
    </form>
  );
};
