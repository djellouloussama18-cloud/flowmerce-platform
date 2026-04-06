import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Package, Zap, BarChart3 } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 lg:px-14 h-20 flex items-center border-b border-border/50 glass-panel mt-4 mx-4 mb-8 bg-background/80 backdrop-blur-md">
        <Link className="flex items-center" href="/">
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src="/logo.png" alt="DeliveryPro Logo" className="h-10 w-auto object-contain" />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login">
            <Button variant="ghost" className="text-md">Login</Button>
          </Link>
          <Link href="/login">
            <Button className="bg-primary hover:bg-primary/90 text-md rounded-full px-6">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-5xl mx-auto w-full space-y-12 text-center">
          <div className="space-y-6">
            <div className="inline-block glass-panel px-4 py-1.5 text-sm font-medium text-primary mb-4 rounded-full bg-background">
              ✨ The Future of Shopify Automation
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-muted-foreground">
              Automate Your Deliveries <br /> With Precision.
            </h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Connect your Shopify store, automate n8n workflows, and track every order in real-time. Experience a seamless and powerful multi-tenant platform tailored for modern merchants.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl bg-primary hover:bg-primary/90">
                Start Automating Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left">
            <div className="glass-card p-6 rounded-3xl bg-card">
              <Zap className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Instant Sync</h3>
              <p className="text-muted-foreground">Orders sync instantly from Shopify to our platform via lightning-fast webhooks.</p>
            </div>
            <div className="glass-card p-6 rounded-3xl bg-card">
              <Package className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Smart Tracking</h3>
              <p className="text-muted-foreground">Keep your customers in the loop with automated WhatsApp tracking updates.</p>
            </div>
            <div className="glass-card p-6 rounded-3xl bg-card">
              <BarChart3 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Detailed Analytics</h3>
              <p className="text-muted-foreground">Make informed decisions with real-time logs, analytics, and tracking dashboards.</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border mt-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} DeliveryPro Platform. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
