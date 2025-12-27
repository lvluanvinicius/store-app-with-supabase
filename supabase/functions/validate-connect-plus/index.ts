// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const CONNECT_PLUS_API = Deno.env.get('CONNECT_PLUS_API');

Deno.serve(async (req) => {
  const { document } = await req.json();

  // Recuperar dados no conectas-plus com base no documento informado.
  const response = await fetch(`${CONNECT_PLUS_API}/in/validate-customer-benefits`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    body: JSON.stringify({document}),
  })

 if (response.ok) {
   const data = await response.json();

  console.log(data);
 } else  {
  console.log(response)
 }
  

  // Com os dados do conecta-plus, validar se o usuário existe no sistema interno.

  // Se existir, recuperar os dados e retornar um token JWT para o frontend, dando acesso aos seus dados e o plano atual.

  // Se não existir, retornar o informe ao usuário para que seja criado em outra ação pelo frontend.
 

  return new Response(
    JSON.stringify({}),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/validate-connect-plus' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
