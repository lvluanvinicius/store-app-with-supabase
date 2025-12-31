// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const CONNECT_PLUS_API = Deno.env.get("CONNECT_PLUS_API");

const supabaseUrl = Deno.env.get("SUPABASE_URL")! as string;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! as string;

Deno.serve(async (req) => {
  try {
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const { document } = await req.json();

    // Recupera pelo documento os dados do cliente e o acesso ao sva.
    const response = await fetch(`${CONNECT_PLUS_API}/in/validate-customer-benefits`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ document }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: true, data }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Valida se o email foi retornado pelo portal conecta mais.
    const email = data.data
      ? data.data.user && data.data.user.email
        ? data.data.user.email
        : null
      : null;

    // Se e-mail não existir, a validação deve ser interrompida.
    if (!email) {
      throw new Error("Your email was not found on Connect Plus Portal.", {
        cause: "error_email_as_not_fount_connect_plus",
      });
    }

    // TODO:
    // - Validar se o usuário existe no sistema interno
    const { data: profileData, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("email", email)
      .limit(1)
      .maybeSingle();

    return new Response(JSON.stringify({ ...data.data, app_profile_exists: !!profileData }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: true,
        connect_plus_access: false,
        message: err.message,
        code: err.cause,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
});
