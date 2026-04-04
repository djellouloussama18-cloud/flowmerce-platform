'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'ar'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Sidebar
    overview: 'Overview',
    orders: 'Orders',
    settings: 'Settings',
    guide: 'Guide',
    logout: 'Logout',
    search_placeholder: 'Search your orders...',
    
    // Dashboard
    sharpen_delivery: 'Sharpen Your Delivery\nWith Professional SaaS',
    delivery_automation: 'Delivery Automation',
    check_orders: 'Check Orders',
    total_processed: 'Total Processed',
    in_transit: 'In Transit',
    delivered: 'Delivered',
    recent_deliveries: 'Recent Deliveries',
    no_recent: 'No recent deliveries to display.',
    package_bound: 'Package bound for',
    statistic: 'Statistic',
    good_morning: 'Good Morning 👋',
    continue_automating: 'Continue automating to achieve your target!',
    your_statuses: 'Your Statuses',
    see_all: 'See All',
    successfully_reached: 'Successfully reached',
    out_for_delivery: 'Out for delivery',
    returned_packages: 'Returned packages',
    failed: 'Failed',
    shipped: 'Shipped',
    total_orders: 'total orders',
    completed: 'completed',
    active: 'active',
    
    // Orders page
    manage_orders: 'Manage and track your Shopify orders here.',
    filter: 'Filter',
    order_id: 'Order ID',
    customer: 'Customer',
    tracking_id: 'Tracking ID',
    date: 'Date',
    status: 'Status',
    no_orders: 'No orders found.',
    
    // Settings page
    settings_desc: 'Configure your store, delivery, and notification settings.',
    shopify_config: 'Shopify Configuration',
    shopify_desc: 'Connect your Shopify store to enable automatic order syncing.',
    shop_domain: 'Shop Domain',
    shopify_token: 'Shopify Admin API Token',
    delivery_config: 'Delivery Configuration',
    delivery_desc: 'Connect to your preferred delivery partner API.',
    delivery_company: 'Delivery Company',
    api_key: 'API Key',
    api_endpoint: 'API Endpoint',
    notifications: 'Notifications',
    notifications_desc: 'Configure WhatsApp Business API and email alerts.',
    whatsapp_token: 'WhatsApp Token',
    whatsapp_phone_id: 'WhatsApp Phone Number ID',
    notification_email: 'Notification Email',
    webhook_endpoints: 'Your Webhook Endpoints',
    webhook_desc: 'Add these URLs to your Shopify and Delivery provider dashboards.',
    shopify_order_creation: 'Shopify Order Creation',
    delivery_tracking_update: 'Delivery Tracking Update',
    save_configuration: 'Save Configuration',
    config_saved: 'Configuration saved successfully!',
    error_saving: 'Error saving configuration'
  },
  ar: {
    // Sidebar
    overview: 'نظرة عامة',
    orders: 'الطلبات',
    settings: 'الإعدادات',
    guide: 'دليل الاستخدام',
    logout: 'تسجيل الخروج',
    search_placeholder: 'ابحث في طلباتك...',
    
    // Dashboard
    sharpen_delivery: 'طوّر أداء التوصيل لديك\nبواسطة منصتنا الاحترافية',
    delivery_automation: 'أتمتة التوصيل',
    check_orders: 'تحقق من الطلبات',
    total_processed: 'إجمالي الطلبات',
    in_transit: 'قيد التوصيل',
    delivered: 'تم التوصيل',
    recent_deliveries: 'آخر عمليات التوصيل',
    no_recent: 'لا يوجـد عمليات توصيل حديثة لعرضها.',
    package_bound: 'طرد مرسل إلى',
    statistic: 'الإحصائيات',
    good_morning: 'صباح الخير 👋',
    continue_automating: 'استمر في الأتمتة لتحقيق أهدافك!',
    your_statuses: 'حالات الطرود',
    see_all: 'عرض الكل',
    successfully_reached: 'وصلت بنجاح',
    out_for_delivery: 'في الطريق للعميل',
    returned_packages: 'طرود مرتجعة',
    failed: 'فشل التوصيل',
    shipped: 'تم الشحن',
    total_orders: 'إجمالي الطلبات',
    completed: 'مكتملة',
    active: 'نشطة',
    
    // Orders page
    manage_orders: 'أدر وتتبع طلبات شوبيفاي الخاصة بك هنا.',
    filter: 'تصفية',
    order_id: 'رقم الطلب',
    customer: 'العميل',
    tracking_id: 'رقم التتبع',
    date: 'التاريخ',
    status: 'الحالة',
    no_orders: 'لا يوجـد طلبات.',
    
    // Settings page
    settings_desc: 'قم بتهيئة إعدادات متجرك، التوصيل، والإشعارات.',
    shopify_config: 'إعدادات شوبيفاي',
    shopify_desc: 'اربط متجر شوبيفاي الخاص بك لتفعيل مزامنة الطلبات التلقائية.',
    shop_domain: 'رابط المتجر',
    shopify_token: 'رمز وصول API شوبيفاي',
    delivery_config: 'إعدادات شركة التوصيل',
    delivery_desc: 'اربط حسابك مع API شركة التوصيل المفضلة لديك.',
    delivery_company: 'شركة التوصيل',
    api_key: 'مفتاح API',
    api_endpoint: 'رابط API',
    notifications: 'الإشعارات',
    notifications_desc: 'قم بتهيئة إشعارات واتساب والبريد الإلكتروني.',
    whatsapp_token: 'رمز وصول واتساب',
    whatsapp_phone_id: 'رقم تعريف هاتف واتساب',
    notification_email: 'البريد الإلكتروني للإشعارات',
    webhook_endpoints: 'روابط Webhook الخاصة بك',
    webhook_desc: 'أضف هذه الروابط في لوحة تحكم شوبيفاي وشركة التوصيل.',
    shopify_order_creation: 'إنشاء طلب شوبيفاي',
    delivery_tracking_update: 'تحديثات تتبع التوصيل',
    save_configuration: 'حفظ الإعدادات',
    config_saved: 'تم حفظ الإعدادات بنجاح!',
    error_saving: 'حدث خطأ أثناء حفظ الإعدادات'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en')

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const t = (key: string) => {
    return translations[lang][key as keyof typeof translations['en']] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div className={lang === 'ar' ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
