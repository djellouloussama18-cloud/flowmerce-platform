import fs from 'fs'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hjxiwrjmzhpnfeuwjlzh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqeGl3cmptemhwbmZldXdqbHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3OTIzMTMsImV4cCI6MjA5MDM2ODMxM30.Y-WTV8lG8E3hM6H149ik8oVSP8potae9EGHGw4cbeP0'
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkDb() {
  console.log("Checking the Database securely...");
  const { data: { session }, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'odjemake@gmail.com',
    password: 'Anfal_bou13'
  })

  if (authErr) {
    console.error("Auth Error:", authErr.message);
    return;
  }

  const { data: stores, error: storesErr } = await supabase.from('stores').select('*')
  const { data: users, error: usersErr } = await supabase.from('users').select('*')
  const out = { stores, storesErr, users, usersErr }
  fs.writeFileSync('clean_out.json', JSON.stringify(out, null, 2))
}
checkDb()
