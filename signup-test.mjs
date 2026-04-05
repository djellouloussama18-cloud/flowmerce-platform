import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function test() {
  const { data, error } = await supabase.auth.signUp({
    email: 'test_auto_signup_deliverypro123@example.com',
    password: 'password1234',
    options: {
      emailRedirectTo: `http://localhost:3000/auth/callback`
    }
  })
  if (error) {
    console.error("Signup error:", error)
  } else {
    console.log("Signup success:", data)
  }
}

test()
