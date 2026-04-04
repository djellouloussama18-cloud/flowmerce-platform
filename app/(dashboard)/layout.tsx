'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Package, LayoutDashboard, Settings, LogOut, Loader2, Menu, Search, BookOpen } from 'lucide-react'
import { LanguageProvider, useLanguage } from '@/components/language-provider'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </LanguageProvider>
  )
}

function DashboardLayoutInner({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
        setLoading(false)
      }
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const navItems = [
    { href: '/dashboard', label: t('overview'), icon: LayoutDashboard },
    { href: '/orders', label: t('orders'), icon: Package },
  ]

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex text-foreground">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-[260px] bg-card border-r rtl:border-l rtl:border-r-0 border-border h-screen sticky top-0 shrink-0">
        <div className="h-[80px] flex items-center px-5 shrink-0 border-b border-border/50">
          <Link href="/" className="flex items-center w-full">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src="/logo.png" alt="Flowmerce Logo" className="h-10 w-auto object-contain hover:scale-105 transition-transform" />
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4 px-4 space-y-1">
          <div className="text-[10px] font-bold text-muted-foreground tracking-widest mb-4 px-4 mt-2">{t('overview').toUpperCase()}</div>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors font-medium ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}>
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </div>
              </Link>
            )
          })}
          
          <div className="text-[10px] font-bold text-muted-foreground tracking-widest mt-8 mb-4 px-4">{t('settings').toUpperCase()}</div>
           <Link href="/settings">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors font-medium ${pathname === '/settings' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
               <Settings className="h-5 w-5" />
               {t('settings')}
            </div>
           </Link>
           <Link href="/guide">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors font-medium ${pathname === '/guide' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
               <BookOpen className="h-5 w-5" />
               {t('guide')}
            </div>
           </Link>
           <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 px-4 py-3 h-auto mt-2 rounded-2xl font-medium" onClick={handleSignOut}>
            <LogOut className="rtl:ml-3 ltr:mr-3 h-5 w-5" />
            {t('logout')}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-background pb-12">
        <header className="h-[70px] flex items-center justify-between px-6 md:px-10 sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
          <div className="flex items-center gap-4 w-full max-w-xl">
             <Button variant="ghost" size="icon" className="md:hidden border border-border bg-card" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="md:hidden flex items-center flex-1">
               <img src="/logo.png" alt="Flowmerce Logo" className="h-8 w-auto object-contain" />
            </div>
            <div className="hidden md:flex items-center w-full bg-white dark:bg-card rounded-full px-5 py-3 shadow-sm border border-transparent focus-within:border-primary/20 transition-all">
               <Search className="h-4 w-4 text-muted-foreground rtl:ml-3 ltr:mr-3" />
               <input type="text" placeholder={t('search_placeholder')} className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground text-foreground" />
            </div>
          </div>
          
          <div className="flex items-center gap-4 shrink-0 bg-white dark:bg-card px-4 py-2 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
            <ModeToggle />
            <Button variant="ghost" size="sm" className="hidden sm:flex rounded-full text-foreground hover:bg-muted font-bold" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}>
              {lang === 'en' ? 'AR' : 'EN'}
            </Button>
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center ml-2 border border-border">
              <span className="text-xs font-bold text-foreground">JR</span>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-background border-r border-white/10 shadow-xl overflow-y-auto">
              {/* ...mobile sidebar content matching desktop... */}
               <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
                <span className="font-bold text-lg">Menu</span>
              </div>
              <div className="flex-1 py-6 px-4 space-y-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}>
                    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                      pathname === item.href ? 'bg-primary/20 text-primary font-medium' : 'text-muted-foreground hover:bg-white/5'
                    }`}>
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="p-4 border-t border-white/10 shrink-0">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
