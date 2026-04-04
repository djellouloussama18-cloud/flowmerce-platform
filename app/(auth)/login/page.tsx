'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background z-0"></div>
      
      <Card className="w-full max-w-md glass-card border-white/10 z-10">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-5 bg-muted/30 rounded-2xl border border-border/50">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src="/logo.png" alt="Flowmerce Logo" className="h-14 w-auto object-contain" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 pt-4">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="merchant@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus-visible:ring-primary h-12"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus-visible:ring-primary h-12"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 mt-2">
            <Button type="submit" className="w-full h-12 text-md rounded-xl" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Sign In'}
            </Button>
            <div className="text-center text-sm text-muted-foreground w-full">
              Don&apos;t have an account? <Link href="/register" className="text-primary hover:underline font-medium">Sign Up</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
