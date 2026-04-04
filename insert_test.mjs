import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hjxiwrjmzhpnfeuwjlzh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqeGl3cmptemhwbmZldXdqbHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3OTIzMTMsImV4cCI6MjA5MDM2ODMxM30.Y-WTV8lG8E3hM6H149ik8oVSP8potae9EGHGw4cbeP0'
const supabase = createClient(supabaseUrl, supabaseKey)

async function insertTestOrders() {
  console.log("Logging in as odjemake@gmail.com...")
  const { data: { session }, error: authError } = await supabase.auth.signInWithPassword({
    email: 'odjemake@gmail.com',
    password: 'Anfal_bou13'
  })

  if (authError || !session) {
    console.error("Login failed:", authError)
    return
  }

  console.log("Inserting test orders...")
  const { error: insertError } = await supabase.from('orders').insert([
    {
      user_id: session.user.id,
      shopify_order_id: 'Test-1001',
      status: 'created',
      customer_name: 'Ahmed Test',
      customer_phone: '+213555222111',
      customer_email: 'ahmed@test.dz'
    },
    {
      user_id: session.user.id,
      shopify_order_id: 'Test-1002',
      status: 'shipped',
      tracking_id: 'TRK-DZ-9988',
      customer_name: 'Kamal Demo',
      customer_phone: '+213777888999',
      customer_email: 'kamal@demo.dz'
    }
  ])

  if (insertError) {
    console.error("Insert failed:", insertError)
  } else {
    console.log("Success! 2 Test Orders Inserted into Supabase.")
  }
}

insertTestOrders()
