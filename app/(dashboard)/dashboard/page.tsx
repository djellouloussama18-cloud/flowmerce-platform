'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { createClient } from '@/lib/supabase'
import { Package, TrendingUp, Clock, AlertTriangle, ChevronRight, CheckCircle2, ChevronLeft, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/components/language-provider'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    delivered: 0,
    inTransit: 0,
    failed: 0
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const router = useRouter()
  const { t } = useLanguage()
  
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data } = await supabase
          .from('orders')
          .select('id, status, shopify_order_id, created_at, customer_name')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
        
        if (data) {
          const total = data.length
          const delivered = data.filter((o: any) => o.status === 'delivered').length
          const inTransit = data.filter((o: any) => o.status === 'in_transit' || o.status === 'shipped').length
          const failed = data.filter((o: any) => o.status === 'failed').length
          
          setStats({ total, delivered, inTransit, failed })
          setRecentOrders(data.slice(0, 5))
        }
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* LEFT COLUMN - MAIN CONTENT */}
      <div className="flex-1 space-y-8">
        
        {/* BIG PURPLE BANNER */}
        <div className="relative rounded-[2rem] bg-[#6b4efb] p-8 md:p-12 overflow-hidden shadow-xl text-white">
          <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
            {/* Simple abstract stars/blobs using SVG */}
            <svg viewBox="0 0 400 400" className="absolute -top-20 -right-20 w-96 h-96 opacity-50">
              <path d="M200,0 L220,180 L400,200 L220,220 L200,400 L180,220 L0,200 L180,180 Z" fill="white" opacity="0.3" />
            </svg>
            <svg viewBox="0 0 400 400" className="absolute top-20 left-40 w-48 h-48 opacity-20">
              <path d="M200,0 L220,180 L400,200 L220,220 L200,400 L180,220 L0,200 L180,180 Z" fill="white" opacity="0.3" />
            </svg>
          </div>
          
          <div className="relative z-10 max-w-xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 opacity-90 border border-white/20 rounded-full px-3 py-1">{t('delivery_automation')}</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8 whitespace-pre-line">
              {t('sharpen_delivery')}
            </h1>
            <Button onClick={() => router.push('/orders')} className="rounded-full bg-black hover:bg-black/80 text-white border-0 px-8 py-6 text-base shadow-lg">
              {t('check_orders')}
              <div className="bg-white text-black rounded-full p-1 rtl:mr-3 rtl:-ml-2 ltr:ml-3 ltr:-mr-2">
                <ChevronRight className="h-4 w-4" />
              </div>
            </Button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <Card className="rounded-3xl border-none shadow-[0_4px_24px_rgba(0,0,0,0.04)] bg-card text-card-foreground">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[#6b4efb]/10 flex items-center justify-center shrink-0">
                <Package className="h-5 w-5 text-[#6b4efb]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">{stats.total} {t('total_orders')}</p>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{t('total_processed')}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-[0_4px_24px_rgba(0,0,0,0.04)] bg-card text-card-foreground">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-pink-500/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-pink-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">{stats.inTransit} {t('active')}</p>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{t('in_transit')}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-[0_4px_24px_rgba(0,0,0,0.04)] bg-card text-card-foreground">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-sky-500/10 flex items-center justify-center shrink-0">
                <TrendingUp className="h-5 w-5 text-sky-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">{stats.delivered} {t('completed')}</p>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{t('delivered')}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* RECENT ACTIVITY SECTION (LIKE "CONTINUE WATCHING") */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{t('recent_deliveries')}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full border-border bg-transparent"><ChevronLeft className="h-4 w-4" /></Button>
              <Button size="icon" className="rounded-full bg-[#6b4efb] text-white hover:bg-[#5b3ceb]"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentOrders.length > 0 ? recentOrders.slice(0,3).map((order) => (
              <Card key={order.id} className="rounded-3xl overflow-hidden border-none shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all">
                <div className="h-40 bg-gradient-to-br from-indigo-100 to-purple-50 dark:from-indigo-950 dark:to-purple-900 relative p-4 flex flex-col justify-between">
                   <div className="flex justify-end">
                      <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                   </div>
                   {/* Abstract Box Icon */}
                   <Package className="h-16 w-16 text-foreground/10 absolute -bottom-4 -right-4" />
                </div>
                <CardContent className="p-5">
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#6b4efb]/10 text-[#6b4efb] mb-3">
                    {t('order_id')} {order.shopify_order_id}
                  </div>
                  <h3 className="font-bold text-lg mb-4 line-clamp-2">
                    {t('package_bound')} {order.customer_name || 'Customer'}
                  </h3>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold">{order.customer_name?.substring(0,1) || 'C'}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{order.status}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) : (
               <div className="col-span-3 py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-3xl">{t('no_recent')}</div>
            )}
          </div>
        </div>
        
      </div>

      {/* RIGHT COLUMN - SIDEBAR */}
      <div className="w-full xl:w-[350px] shrink-0 space-y-8">
        
        {/* STATISTIC CARD */}
        <Card className="rounded-[2rem] border-none shadow-[0_4px_24px_rgba(0,0,0,0.04)] bg-card overflow-hidden">
          <CardContent className="p-8 pb-0">
            <h3 className="font-bold text-lg mb-8">{t('statistic')}</h3>
            
            <div className="flex flex-col items-center justify-center mb-8">
               <div className="relative h-32 w-32 rounded-full border-8 border-muted/30 flex items-center justify-center mb-6">
                 {/* Fake Progress Ring */}
                 <div className="absolute inset-0 rounded-full border-8 border-[#6b4efb] border-t-transparent border-r-transparent rotate-45"></div>
                 <div className="absolute -top-2 right-2 bg-[#6b4efb] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {stats.total > 0 ? Math.round((stats.delivered / stats.total)*100) : 0}%
                 </div>
                 
                 <div className="h-20 w-20 bg-primary/20 rounded-full flex items-center justify-center">
                   <Package className="h-8 w-8 text-primary" />
                 </div>
               </div>
               
               <div className="text-center">
                 <h2 className="text-xl font-bold mb-1">{t('good_morning')}</h2>
                 <p className="text-xs text-muted-foreground max-w-[200px] mx-auto">{t('continue_automating')}</p>
               </div>
            </div>
            
            {/* Mock Bar Chart */}
            <div className="h-32 flex items-end justify-between gap-2 px-2 pb-6 border-b border-border/50">
               {[40, 20, 60, 30, 80, 20].map((h, i) => (
                 <div key={i} className="flex flex-col items-center gap-2 flex-1">
                   <div className={`w-full rounded-md transition-all hover:opacity-80 ${h > 50 ? 'bg-[#6b4efb]' : 'bg-[#6b4efb]/20'}`} style={{ height: `${h}%` }}></div>
                 </div>
               ))}
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground px-2 py-4">
              <span>1-10 Aug</span>
              <span>11-20 Aug</span>
              <span>21-30 Aug</span>
            </div>
          </CardContent>
        </Card>

        {/* YOUR MENTOR / COURIERS */}
        <Card className="rounded-[2rem] border-none shadow-[0_4px_24px_rgba(0,0,0,0.04)] bg-card p-6">
           <div className="flex items-center justify-between mb-6">
             <h3 className="font-bold text-lg">{t('your_statuses')}</h3>
             <Button variant="outline" size="icon" className="rounded-full h-8 w-8 border-border">
               <Plus className="h-4 w-4" />
             </Button>
           </div>
           
           <div className="space-y-4">
              {[
                { name: t('delivered'), desc: t('successfully_reached'), tag: stats.delivered },
                { name: t('shipped'), desc: t('out_for_delivery'), tag: stats.inTransit },
                { name: t('failed'), desc: t('returned_packages'), tag: stats.failed },
              ].map((m, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border/50">
                   <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                       <CheckCircle2 className="h-5 w-5 text-primary" />
                     </div>
                     <div>
                       <p className="text-sm font-bold">{m.name}</p>
                       <p className="text-[10px] text-muted-foreground">{m.desc}</p>
                     </div>
                   </div>
                   <Button variant="outline" size="sm" className="rounded-full h-8 text-xs font-semibold px-4 text-[#6b4efb] border-[#6b4efb]/20 bg-[#6b4efb]/5 hover:bg-[#6b4efb]/10 hover:text-[#6b4efb]">
                      {m.tag}
                   </Button>
                 </div>
              ))}
              
              <Button onClick={() => router.push('/orders')} className="w-full rounded-2xl bg-[#6b4efb]/5 hover:bg-[#6b4efb]/10 text-[#6b4efb] border-none shadow-none h-12 mt-2 font-bold">
                {t('see_all')}
              </Button>
           </div>
        </Card>

      </div>
    </div>
  )
}
