import { supabase } from "@/services/supabase-client";
import { UserProfile } from "@/types/application";
import type { Session, User } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export interface SessionInterface {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
}

interface ISessionContext {
  session: SessionInterface;
}

export const SessionContext = createContext({} as ISessionContext);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<SessionInterface>({
    loading: true,
    session: null,
    user: null,
    profile: null,
  });

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error(error);
        setSession({ session: null, user: null, loading: false, profile: null });
      } else {
        setSession({
          session: data.session,
          user: data.session?.user ?? null,
          loading: false,
          profile: null,
        });
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!mounted) return;
        setSession({
          session,
          user: session?.user ?? null,
          loading: false,
          profile: null,
        });
      });

      // Carregar o perfil.
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.session?.user.id)
        .limit(1)
        .maybeSingle();

      if (profileError) {
        setSession({ session: null, user: null, loading: false, profile: null });
      } else {
        setSession({
          session: data.session,
          user: data.session?.user ?? null,
          loading: false,
          profile: profileData,
        });
      }

      return () => {
        subscription.unsubscribe();
      };
    };

    const cleanupPromise = init();

    return () => {
      mounted = false;
      cleanupPromise.then((cleanup) => {
        if (typeof cleanup === "function") cleanup();
      });
    };
  }, []);

  return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
};
