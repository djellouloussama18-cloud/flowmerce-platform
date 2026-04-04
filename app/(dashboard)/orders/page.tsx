'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Package, Search, Filter, Loader2 } from 'lucide-react'
import { useEffect } from 'react'

import { createClient } from '@/lib/supabase'
import { useLanguage } from '@/components/language-provider'

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()
  const supabase = createClient()

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
        
        if (data) setOrders(data)
      }
      setLoading(false)
    }
    fetchOrders()
  }, [])

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'created': return 'bg-blue-500/20 text-blue-500 border-blue-500/20'
      case 'shipped': return 'bg-purple-500/20 text-purple-500 border-purple-500/20'
      case 'in_transit': return 'bg-amber-500/20 text-amber-500 border-amber-500/20'
      case 'delivered': return 'bg-green-500/20 text-green-500 border-green-500/20'
      case 'failed': return 'bg-red-500/20 text-red-500 border-red-500/20'
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/20'
    }
  }

  const filteredOrders = orders.filter(
    (order) => 
      (order.customer_name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (order.shopify_order_id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.tracking_id || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('orders')}</h1>
          <p className="text-muted-foreground mt-2">{t('manage_orders')}</p>
        </div>
      </div>

      <Card className="glass-card border-white/10">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={t('search_placeholder')} 
                className="pl-10 rtl:pr-10 rtl:pl-4 bg-background border-border focus-visible:ring-primary w-full shadow-sm rounded-xl h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto bg-background border-border hover:bg-muted shadow-sm rounded-xl">
              <Filter className="rtl:ml-2 ltr:mr-2 h-4 w-4" /> {t('filter')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="font-semibold text-foreground py-4">{t('order_id')}</TableHead>
                  <TableHead className="font-semibold text-foreground py-4">{t('customer')}</TableHead>
                  <TableHead className="font-semibold text-foreground py-4">{t('tracking_id')}</TableHead>
                  <TableHead className="font-semibold text-foreground py-4">{t('date')}</TableHead>
                  <TableHead className="font-semibold text-foreground py-4 rtl:text-left ltr:text-right">{t('status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                     <TableCell colSpan={5} className="h-24 text-center">
                       <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                     </TableCell>
                  </TableRow>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="font-semibold text-primary">#{order.shopify_order_id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{order.customer_name || 'No Name'}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{order.customer_phone}</div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{order.tracking_id || 'N/A'}</TableCell>
                      <TableCell className="text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="rtl:text-left ltr:text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status || 'created')}`}>
                          {(order.status || 'created').replace('_', ' ')}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground font-medium">
                      {t('no_orders')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
