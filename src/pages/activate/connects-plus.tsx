import { FormButtonLoading } from "@/components/form-button-loading";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { ActivateLayout } from "@/layout/activate";
import { cn } from "@/lib/utils";
import { supabase } from "@/services/supabase-client";
import { ConnectPlusValidateResponse } from "@/types/application";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ValidateDocument } from "./components/validate-document";

/**
 * b280775a0f -> Variável: guarda a resposta vinda da validação do documento.
 * 6be12752c2 -> Variável: ...
 *
 */

type FormUser = { email: string; password: string };

export const ConnectsPlusPage = () => {
  const [document, setDocument] = useState<string>("");

  const [formUser, setFormUser] = useState<FormUser>({
    email: "",
    password: "",
  });

  // Guarda a resposta de validação do documento.
  const [b280775a0f, setB280775a0f] = useState<ConnectPlusValidateResponse | null>(null);

  const { session } = useSession();

  // Valida o documento do cliente no conecta mais.
  const { mutate: handleValidateDocument, isPending: validateDocumentStatus } = useMutation({
    mutationFn: async () => {
      setB280775a0f(null);

      const response = await supabase.functions.invoke("validate-connect-plus", {
        body: {
          document,
        },
      });

      setB280775a0f(response.data);
    },
  });

  // Efetua o login do usuário se o mesmo já possui conta.
  const { mutate: handleSignIn, isPending: signInStatus } = useMutation({
    mutationFn: async () => {
      if (!formUser.email || !formUser.password) {
        // setErrorMessage("Por favor, preencha todos os campos.");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: formUser.email,
        password: formUser.password,
      });

      if (error) {
        // setErrorMessage(translateMessages.ptBR[error.code || error.message]);
        return;
      }
    },
  });

  // Efetua o registro do usuário na plataforma antes da ativação.
  const { mutate: handleSignUp, isPending: signUpStatus } = useMutation({
    mutationFn: async () => {
      if (!formUser.email || !formUser.password) {
        // setErrorMessage("Por favor, preencha todos os campos.");
        return;
      }

      const { error } = await supabase.auth.signUp({
        email: formUser.email,
        password: formUser.password,
      });

      if (error) {
        // setErrorMessage(translateMessages.ptBR[error.code || error.message]);
        console.log(error);

        return;
      }
    },
  });

  useEffect(() => {
    setFormUser({
      email: b280775a0f?.user.email ?? "",
      password: "",
    });
  }, [b280775a0f]);

  return (
    <ActivateLayout>
      <div>
        <div className="flex flex-col gap-4">
          <h2 className="text-md text-gray-400">
            Para ativar seu benefício, informe seu CPF ou CNPJ abaixo:
          </h2>

          {/* Formulário de validação do documento */}
          <ValidateDocument
            value={document}
            onChange={setDocument}
            isPending={validateDocumentStatus}
            onValidate={handleValidateDocument}
          />

          {/* Skeleton de status de validação da conta e acesso ao Sva*/}
          {validateDocumentStatus && <Skeleton className="h-10 w-full bg-neutral-900" />}

          {b280775a0f?.connect_plus_access && (
            <>
              {!session.session ? (
                <>
                  {/* Formulário de login */}
                  {b280775a0f && b280775a0f.app_profile_exists && (
                    <>
                      <div className="rounded-2xl border border-white/10 bg-neutral-800 p-4 md:p-8">
                        <div className="w-full">
                          <span>Efetuar login</span>
                        </div>

                        <Separator className="my-2" />

                        <div className="flex w-full flex-col gap-4 md:flex-row">
                          <label className="flex flex-col gap-2">
                            <span className="text-sm text-neutral-400">Email</span>
                            <input
                              type="email"
                              placeholder="email"
                              value={formUser.email}
                              onChange={(e) =>
                                setFormUser((prev) => {
                                  const newData = {
                                    ...prev,
                                    email: e.target.value,
                                  };
                                  return newData;
                                })
                              }
                              className={cn(
                                "rounded-md border border-neutral-500/60 bg-neutral-900 px-4 py-2 text-sm placeholder:text-neutral-500/70",
                              )}
                            />
                          </label>

                          <label className="flex flex-col gap-2">
                            <span className="text-sm text-neutral-400">Senha</span>
                            <input
                              id="password"
                              type="password"
                              placeholder="senha"
                              value={formUser.password}
                              onChange={(e) =>
                                setFormUser((prev) => {
                                  const newData = {
                                    ...prev,
                                    password: e.target.value,
                                  };
                                  return newData;
                                })
                              }
                              className={cn(
                                "rounded-md border border-neutral-500/60 bg-neutral-900 px-4 py-2 text-sm placeholder:text-neutral-500/70",
                              )}
                            />
                          </label>

                          <div className="flex items-end">
                            <button
                              onClick={() => handleSignIn()}
                              disabled={signInStatus}
                              className="flex cursor-pointer items-center gap-2 rounded-4xl bg-neutral-700 px-4 py-2 text-sm hover:bg-neutral-600 disabled:opacity-70"
                            >
                              <FormButtonLoading
                                action="POST"
                                processing={signInStatus}
                                messages={{
                                  create: "Efetuar login",
                                  creating: "Aguarde...",
                                }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      {signInStatus && <Skeleton className="h-10 w-full bg-neutral-900" />}
                    </>
                  )}

                  {/* Formulário de registro */}
                  {b280775a0f && !b280775a0f.app_profile_exists && (
                    <>
                      <div className="rounded-2xl border border-white/10 bg-neutral-800 p-4 md:p-8">
                        <div className="w-full">
                          <span>Criar uma conta</span>
                        </div>

                        <Separator className="my-2" />

                        <div className="flex w-full flex-col gap-4 md:flex-row">
                          <label className="flex flex-col gap-2">
                            <span className="text-sm text-neutral-400">Email</span>
                            <input
                              type="email"
                              placeholder="email"
                              value={formUser.email}
                              onChange={(e) =>
                                setFormUser((prev) => {
                                  const newData = {
                                    ...prev,
                                    email: e.target.value,
                                  };
                                  return newData;
                                })
                              }
                              className={cn(
                                "rounded-md border border-neutral-500/60 bg-neutral-900 px-4 py-2 text-sm placeholder:text-neutral-500/70",
                              )}
                            />
                          </label>

                          <label className="flex flex-col gap-2">
                            <span className="text-sm text-neutral-400">Senha</span>
                            <input
                              id="password"
                              type="password"
                              placeholder="senha"
                              value={formUser.password}
                              onChange={(e) =>
                                setFormUser((prev) => {
                                  const newData = {
                                    ...prev,
                                    password: e.target.value,
                                  };
                                  return newData;
                                })
                              }
                              className={cn(
                                "rounded-md border border-neutral-500/60 bg-neutral-900 px-4 py-2 text-sm placeholder:text-neutral-500/70",
                              )}
                            />
                          </label>

                          <div className="flex items-end">
                            <button
                              onClick={() => handleSignUp()}
                              disabled={signUpStatus}
                              className="flex cursor-pointer items-center gap-2 rounded-4xl bg-neutral-700 px-4 py-2 text-sm hover:bg-neutral-600 disabled:opacity-70"
                            >
                              <FormButtonLoading
                                action="POST"
                                processing={signUpStatus}
                                messages={{
                                  create: "Criar conta",
                                  creating: "Aguarde...",
                                }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      {signUpStatus && <Skeleton className="h-10 w-full bg-neutral-900" />}
                    </>
                  )}
                </>
              ) : (
                <>
                  <ProfileUser />
                  {/* Listar o benefício. */}
                  <FormSelectSva response={b280775a0f} />
                </>
              )}
            </>
          )}

          {/* Formulário de confirmação de ativação do benefício */}
        </div>
      </div>
    </ActivateLayout>
  );
};

const ProfileUser = () => {
  const { session } = useSession();

  // Efetuar o sign-out quando o usuário clicar em "Trocar de conta?".
  const { mutate: handleSignOut, isPending: signOutStatus } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        // setErrorMessage(translateMessages.ptBR[error.code || error.message]);
        return;
      }
    },
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-800 p-4 md:p-8">
      <p>Você está logado com o e-mail: {session.user?.email}</p>
      <button
        onClick={() => handleSignOut()}
        className="text-secondary cursor-pointer hover:underline"
      >
        Trocar de conta?
      </button>
    </div>
  );
};

const FormSelectSva = ({ response }: { response: ConnectPlusValidateResponse }) => {
  const { mutate: handleSelect, isPending: selectStatus } = useMutation({
    mutationFn: async ({ productId }: { productId: number }) => {
      const response = await supabase.functions.invoke("activate-connect-plus", {
        body: {
          product_id: productId,
        },
      });

      console.log(response);
    },
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-800 p-4 md:p-8">
      <div className="w-full">
        <span>Selecione um benefício</span>
      </div>

      <Separator className="my-2" />

      <div className="flex flex-col gap-4">
        {response.access &&
          response.access.map((access) => (
            <div
              key={access.id}
              className="flex items-center justify-between gap-4 border-b border-white/20 pb-2"
            >
              <div className="flex-1">
                <p>{access.product.descricao}</p>
              </div>

              <button
                disabled={selectStatus}
                onClick={() => handleSelect({ productId: access.product.id })}
                className="flex cursor-pointer items-center gap-2 rounded-4xl bg-neutral-700 px-4 py-2 text-sm hover:bg-neutral-600 disabled:opacity-70"
              >
                <FormButtonLoading
                  action="POST"
                  processing={selectStatus}
                  messages={{
                    create: "Escolher esse",
                    creating: "Aguarde...",
                  }}
                />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
