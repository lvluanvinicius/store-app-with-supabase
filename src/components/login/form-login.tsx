import { cn } from "@/lib/utils";
import { supabase } from "@/services/supabase-client";
import { FormEvent, useState } from "react";

export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log(error, data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-sm">Email</span>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn("rounded-md bg-neutral-950 px-4 py-2")}
        />
      </label>

      <input
        type="password"
        placeholder="senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={cn("rounded-md bg-neutral-950 px-4 py-2")}
      />
      <button type="submit">Entrar</button>
    </form>
  );
};
