'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Store, Truck, MessageSquare, Save, Loader2, Webhook } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useLanguage } from '@/components/language-provider'

export default function SettingsPage() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    shopDomain: '',
    shopifyToken: '',
    deliveryCompany: 'Aramex', // default for now
    deliveryApiKey: '',
    deliveryEndpoint: '',
    whatsappToken: '',
    whatsappPhoneId: '',
    notificationEmail: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const supabase = createClient()

  const handleSave = async () => {
    try {
      setLoading(true)
      
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error("No active session")

      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://djeloul-oussama-n8n.hawiyat.org'
      
      const payload = {
        user_id: session.user.id,
        shop_domain: formData.shopDomain,
        shopify_token: formData.shopifyToken,
        delivery_company: formData.deliveryCompany,
        delivery_api_key: formData.deliveryApiKey,
        delivery_endpoint: formData.deliveryEndpoint,
        whatsapp_token: formData.whatsappToken,
        whatsapp_phone_number_id: formData.whatsappPhoneId,
        notification_email: formData.notificationEmail
      }

      const response = await fetch(`${webhookUrl}/webhook/merchant/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(t('error_saving'))
      }
      
      alert(t('config_saved'))
    } catch (error: any) {
      alert("Error: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings')}</h1>
        <p className="text-muted-foreground mt-2">{t('settings_desc')}</p>
      </div>

      <div className="grid gap-6">
        {/* Shopify Config */}
        <Card className="rounded-2xl border-border bg-card shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Store className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">{t('shopify_config')}</CardTitle>
            </div>
            <CardDescription className="pt-2">{t('shopify_desc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-2">
              <Label htmlFor="shopDomain">{t('shop_domain')}</Label>
              <Input id="shopDomain" name="shopDomain" placeholder="your-store.myshopify.com" value={formData.shopDomain} onChange={handleChange} className="bg-background border-border h-11" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="shopifyToken">{t('shopify_token')}</Label>
              <Input id="shopifyToken" name="shopifyToken" type="password" placeholder="shpat_..." value={formData.shopifyToken} onChange={handleChange} className="bg-background border-border h-11" />
            </div>
          </CardContent>
        </Card>

        {/* Delivery Config */}
        <Card className="rounded-2xl border-border bg-card shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border">
             <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">{t('delivery_config')}</CardTitle>
            </div>
            <CardDescription className="pt-2">{t('delivery_desc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-2">
              <Label htmlFor="deliveryCompany">{t('delivery_company')}</Label>
              <Input id="deliveryCompany" name="deliveryCompany" value={formData.deliveryCompany} onChange={handleChange} className="bg-background border-border h-11" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="deliveryApiKey">{t('api_key')}</Label>
                <Input id="deliveryApiKey" name="deliveryApiKey" type="password" value={formData.deliveryApiKey} onChange={handleChange} className="bg-background border-border h-11" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deliveryEndpoint">{t('api_endpoint')}</Label>
                <Input id="deliveryEndpoint" name="deliveryEndpoint" placeholder="https://api.delivery.local/v1" value={formData.deliveryEndpoint} onChange={handleChange} className="bg-background border-border h-11" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp & Email Config */}
        <Card className="rounded-2xl border-border bg-card shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border">
             <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">{t('notifications')}</CardTitle>
            </div>
            <CardDescription className="pt-2">{t('notifications_desc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="whatsappToken">{t('whatsapp_token')}</Label>
                <Input id="whatsappToken" name="whatsappToken" type="password" value={formData.whatsappToken} onChange={handleChange} className="bg-background border-border h-11" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="whatsappPhoneId">{t('whatsapp_phone_id')}</Label>
                <Input id="whatsappPhoneId" name="whatsappPhoneId" value={formData.whatsappPhoneId} onChange={handleChange} className="bg-background border-border h-11" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notificationEmail">{t('notification_email')}</Label>
              <Input id="notificationEmail" name="notificationEmail" type="email" placeholder="admin@store.com" value={formData.notificationEmail} onChange={handleChange} className="bg-background border-border h-11" />
            </div>
          </CardContent>
        </Card>

        {/* Action Bottom Bar */}
        <div className="flex justify-end pt-4 pb-12">
          <Button onClick={handleSave} size="lg" className="px-8 rounded-full h-12 shadow-lg" disabled={loading}>
            {loading ? <Loader2 className="rtl:ml-2 ltr:mr-2 h-5 w-5 animate-spin" /> : <Save className="rtl:ml-2 ltr:mr-2 h-5 w-5" />}
            {t('save_configuration')}
          </Button>
        </div>
      </div>
    </div>
  )
}
