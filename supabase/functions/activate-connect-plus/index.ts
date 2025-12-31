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
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    global: {
      headers: { Authorization: req.headers.get("Authorization") ?? "" },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { product_id } = await req.json();

  return new Response(JSON.stringify({}), { headers: { "Content-Type": "application/json" } });
});
