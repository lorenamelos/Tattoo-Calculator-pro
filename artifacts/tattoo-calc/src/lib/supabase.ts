import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sfkmhujivjvsdxuxrygv.supabase.co";
const supabaseKey = "sb_publishable_NbO5XHh7MH0aQPGYi7rl_Q_5ZvntAjo";

export const supabase = createClient(supabaseUrl, supabaseKey);
