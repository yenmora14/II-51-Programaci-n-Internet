import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zoglxveblpsuqzlfzcwf.supabase.co";
const supabaseKey = "sb_publishable_AxmTBx2_wAl-2zfg6gzH0g_egDaN4YR";

export const supabase = createClient(supabaseUrl, supabaseKey);
