/* ============================================================
   FILE 2: SUPABASE CLIENT SETUP (src/utils/supabaseClient.js)
   
   After adding your keys to .env, we initialize the Supabase
   client here so our app can talk to our hosted Auth service.
   
   Follow the steps below in order from top to bottom.
   ============================================================ */

/* ------------------------------------------------------------
   STEP 1: IMPORT THE SUPABASE SDK
   Import { createClient } from '@supabase/supabase-js'.
   ------------------------------------------------------------ */

import { createClient } from "@supabase/supabase-js";
import { createMockSupabase, isSupabaseConfigured } from "./helper";

/* ------------------------------------------------------------
   STEP 2: READ PROJECT CREDENTIALS FROM .env
   Read REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY
   from process.env into constants named supabaseUrl and
   supabaseAnonKey.
   ------------------------------------------------------------ */

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

/* ------------------------------------------------------------
   STEP 3: INITIALIZE & EXPORT THE SUPABASE CLIENT
   Export a constant named "supabase" initialized by calling
   createClient(supabaseUrl, supabaseAnonKey).
   ------------------------------------------------------------ */
console.log(supabaseUrl, supabaseAnonKey);
export const supabase = isSupabaseConfigured(supabaseUrl, supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabase();
