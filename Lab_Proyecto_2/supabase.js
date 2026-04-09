import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://cduxnxqyxpbmygigrcea.supabase.co";
const supabaseKey = "sb_publishable_68nvn0u4xCkrglX_wKE4kw_Re_IQeft";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;