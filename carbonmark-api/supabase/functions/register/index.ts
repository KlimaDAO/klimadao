// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- Since the function is invoked serverless there is no node_modules
//@ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_PUBLIC_ANON_KEY
);

/**
 * This edge function is triggered on insert to the auth.users table
 * It generates an API key for the user and inserts it in to the "keys" table
 * It also generates a custodial wallet and records the address in the "wallets" table
 */
Deno.serve(async (req) => {
  console.log("Triggered");
  const { record } = await req.json();
  const user_id = record.id;

  // Generate a secure random API key
  const apiKey = crypto.randomUUID();

  // Insert the apiKey into the "keys" table using the user_id as the primary key
  await supabase.from("keys").insert([{ id: user_id, key: apiKey }]);

  return new Response(JSON.stringify("Success"), {
    headers: { "Content-Type": "application/json" },
  });
});
