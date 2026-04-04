'use client'

import { useLanguage } from '@/components/language-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BookOpen, ShoppingBag, Truck, MessageCircle, Bell, Settings, 
  ChevronRight, Zap, Shield, Globe, Rocket, CheckCircle2, Info,
  ExternalLink, Copy
} from 'lucide-react'
import { useState } from 'react'

interface StepProps {
  number: number
  title: string
  description: string
  children?: React.ReactNode
}

function Step({ number, title, description, children }: StepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center shrink-0">
        <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
          {number}
        </div>
        <div className="flex-1 w-[2px] bg-primary/20 mt-2"></div>
      </div>
      <div className="pb-10">
        <h4 className="font-bold text-lg text-foreground mb-1">{title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed mb-3">{description}</p>
        {children}
      </div>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-xs font-medium transition-colors"
    >
      {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function Accordion({ title, icon: Icon, children, defaultOpen = false }: { title: string, icon: React.ElementType, children: React.ReactNode, defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <Card className="rounded-2xl border-border overflow-hidden shadow-sm">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors text-left">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-bold text-lg text-foreground">{title}</h3>
        </div>
        <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && (
        <CardContent className="pt-0 pb-6 px-5 border-t border-border/50 animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </CardContent>
      )}
    </Card>
  )
}

export default function GuidePage() {
  const { lang, t } = useLanguage()
  const isAr = lang === 'ar'

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {isAr ? 'دليل الاستخدام' : 'User Guide'}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {isAr ? 'كل ما تحتاج معرفته لاستخدام منصة Flowmerce' : 'Everything you need to know to use Flowmerce'}
            </p>
          </div>
        </div>
      </div>

      {/* Platform Introduction */}
      <Card className="rounded-2xl border-primary/20 bg-gradient-to-br from-primary/5 to-background mb-8 overflow-hidden shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Rocket className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">
              {isAr ? 'ما هي Flowmerce؟' : 'What is Flowmerce?'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground leading-relaxed">
            {isAr 
              ? 'Flowmerce هي منصة SaaS احترافية لأتمتة عمليات التوصيل لأصحاب متاجر Shopify. تقوم المنصة بربط متجرك الإلكتروني مع شركات التوصيل وواتساب بزنس لإرسال إشعارات تلقائية لعملائك في كل مرحلة من مراحل الطلب.'
              : 'Flowmerce is a professional SaaS platform for automating delivery operations for Shopify store owners. The platform connects your online store with delivery companies and WhatsApp Business to send automatic notifications to your customers at every stage of the order.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {[
              { icon: Zap, label: isAr ? 'مزامنة فورية' : 'Instant Sync', desc: isAr ? 'ربط تلقائي مع Shopify' : 'Auto-sync with Shopify' },
              { icon: Truck, label: isAr ? 'تتبع ذكي' : 'Smart Tracking', desc: isAr ? 'تتبع حالة كل طرد' : 'Track every package status' },
              { icon: MessageCircle, label: isAr ? 'إشعارات واتساب' : 'WhatsApp Alerts', desc: isAr ? 'إبلاغ العملاء تلقائياً' : 'Notify customers automatically' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border/50">
                <item.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      <div className="space-y-4">
        
        {/* 1. Registration */}
        <Accordion title={isAr ? '📝 كيفية التسجيل في المنصة' : '📝 How to Register'} icon={Globe} defaultOpen>
          <div className="mt-4 space-y-0">
            <Step number={1} 
              title={isAr ? 'انتقل لصفحة التسجيل' : 'Go to the Registration Page'}
              description={isAr ? 'من صفحة تسجيل الدخول، اضغط على "Sign Up" في الأسفل للانتقال لصفحة إنشاء الحساب.' : 'From the login page, click "Sign Up" at the bottom to navigate to the account creation page.'}
            />
            <Step number={2}
              title={isAr ? 'املأ بياناتك الشخصية' : 'Fill in Your Personal Info'}
              description={isAr ? 'أدخل الاسم الأول، اللقب، ورقم الهاتف مع اختيار كود الدولة المناسب من القائمة المنسدلة.' : 'Enter your first name, last name, and phone number with the appropriate country code from the dropdown list.'}
            />
            <Step number={3}
              title={isAr ? 'أدخل البريد الإلكتروني وكلمة المرور' : 'Enter Email & Password'}
              description={isAr ? 'اختر بريداً إلكترونياً صالحاً وكلمة مرور قوية (6 أحرف على الأقل). ثم اضغط "Create Account".' : 'Choose a valid email address and a strong password (at least 6 characters). Then click "Create Account".'}
            />
            <Step number={4}
              title={isAr ? 'تأكيد البريد الإلكتروني' : 'Confirm Your Email'}
              description={isAr ? 'ستتلقى رسالة تأكيد على بريدك الإلكتروني. اضغط على الرابط الموجود في الرسالة لتفعيل حسابك، ثم يمكنك تسجيل الدخول.' : 'You will receive a confirmation email. Click the link in the email to activate your account, then you can log in.'}
            />
          </div>
        </Accordion>

        {/* 2. Shopify Setup */}
        <Accordion title={isAr ? '🛍️ ربط متجر Shopify' : '🛍️ Connect Shopify Store'} icon={ShoppingBag}>
          <div className="mt-4 space-y-0">
            <Step number={1}
              title={isAr ? 'سجّل الدخول في Shopify' : 'Log into Shopify'}
              description={isAr ? 'ادخل إلى لوحة تحكم Shopify الخاصة بمتجرك عبر الرابط: https://admin.shopify.com' : 'Go to your Shopify admin panel at: https://admin.shopify.com'}
            />
            <Step number={2}
              title={isAr ? 'إنشاء تطبيق مخصص (Custom App)' : 'Create a Custom App'}
              description={isAr ? 'اذهب إلى Settings ← Apps & Sales Channels ← Develop Apps ← Create an App. أعطِ التطبيق اسم "Flowmerce Integration".' : 'Go to Settings → Apps & Sales Channels → Develop Apps → Create an App. Name it "Flowmerce Integration".'}
            />
            <Step number={3}
              title={isAr ? 'تفعيل الصلاحيات (Scopes)' : 'Configure API Scopes'}
              description={isAr ? 'اذهب إلى Configure Admin API Scopes وفعّل الصلاحيات التالية: read_orders, write_orders, read_fulfillments, write_fulfillments. ثم اضغط Save.' : 'Go to Configure Admin API Scopes and enable: read_orders, write_orders, read_fulfillments, write_fulfillments. Then click Save.'}
            >
              <div className="bg-muted/50 rounded-xl p-3 border border-border/50 text-xs font-mono space-y-1">
                <p className="text-primary">read_orders, write_orders</p>
                <p className="text-primary">read_fulfillments, write_fulfillments</p>
              </div>
            </Step>
            <Step number={4}
              title={isAr ? 'تثبيت التطبيق ونسخ التوكن' : 'Install App & Copy Token'}
              description={isAr ? 'اضغط Install App وانسخ Admin API Access Token. ⚠️ هام: هذا التوكن يظهر مرة واحدة فقط! قم بحفظه فوراً.' : 'Click Install App and copy the Admin API Access Token. ⚠️ Important: This token is shown only once! Save it immediately.'}
            />
            <Step number={5}
              title={isAr ? 'أدخل البيانات في Flowmerce' : 'Enter Details in Flowmerce'}
              description={isAr ? 'اذهب إلى الإعدادات ← Shopify Configuration. أدخل رابط متجرك (مثل: mystore.myshopify.com) والتوكن، ثم اضغط "حفظ الإعدادات".' : 'Go to Settings → Shopify Configuration. Enter your store URL (e.g., mystore.myshopify.com) and the token, then click "Save Configuration".'}
            />
          </div>
        </Accordion>

        {/* 3. Delivery Company */}
        <Accordion title={isAr ? '🚚 ربط شركة التوصيل' : '🚚 Connect Delivery Company'} icon={Truck}>
          <div className="mt-4 space-y-0">
            <Step number={1}
              title={isAr ? 'اختر شركة التوصيل' : 'Choose Your Delivery Partner'}
              description={isAr ? 'المنصة تدعم العديد من شركات التوصيل. تواصل مع شركة التوصيل الخاصة بك واطلب منهم بيانات API الخاصة بهم (مفتاح API ورابط API Endpoint).' : 'The platform supports many delivery companies. Contact your delivery partner and request their API credentials (API Key and API Endpoint URL).'}
            />
            <Step number={2}
              title={isAr ? 'احصل على مفتاح API' : 'Get Your API Key'}
              description={isAr ? 'معظم شركات التوصيل توفر لك مفتاح API من لوحة التحكم الخاصة بهم. ابحث عن قسم "Developer" أو "API" أو "Integrations" في لوحة تحكم الشركة.' : 'Most delivery companies provide you with an API key from their dashboard. Look for the "Developer", "API", or "Integrations" section in their control panel.'}
            />
            <Step number={3}
              title={isAr ? 'أدخل البيانات في Flowmerce' : 'Enter Details in Flowmerce'}
              description={isAr ? 'اذهب إلى الإعدادات ← إعدادات شركة التوصيل. اختر اسم الشركة، أدخل مفتاح API ورابط API Endpoint، ثم اضغط "حفظ الإعدادات".' : 'Go to Settings → Delivery Configuration. Select the company name, enter the API Key and API Endpoint URL, then click "Save Configuration".'}
            />
          </div>
        </Accordion>

        {/* 4. WhatsApp Token */}
        <Accordion title={isAr ? '💬 الحصول على توكن واتساب' : '💬 Get WhatsApp Token'} icon={MessageCircle}>
          <div className="mt-4 space-y-0">
            <Step number={1}
              title={isAr ? 'إنشاء حساب Meta Business' : 'Create Meta Business Account'}
              description={isAr ? 'ادخل إلى https://business.facebook.com وأنشئ حساب أعمال إذا لم يكن لديك واحد.' : 'Go to https://business.facebook.com and create a business account if you don\'t have one.'}
            >
              <a href="https://business.facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary text-sm hover:underline">
                <ExternalLink className="h-4 w-4" /> business.facebook.com
              </a>
            </Step>
            <Step number={2}
              title={isAr ? 'الدخول إلى Meta for Developers' : 'Go to Meta for Developers'}
              description={isAr ? 'ادخل إلى https://developers.facebook.com وأنشئ تطبيقاً جديداً من نوع "Business". اختر "WhatsApp" كحالة استخدام.' : 'Go to https://developers.facebook.com and create a new app of type "Business". Select "WhatsApp" as the use case.'}
            >
              <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary text-sm hover:underline">
                <ExternalLink className="h-4 w-4" /> developers.facebook.com
              </a>
            </Step>
            <Step number={3}
              title={isAr ? 'إعداد WhatsApp Business API' : 'Set Up WhatsApp Business API'}
              description={isAr ? 'من قائمة المنتجات في تطبيقك، اضغط "Set Up" بجانب WhatsApp. اتبع الخطوات لربط رقم هاتفك بالتطبيق.' : 'From the Products menu in your app, click "Set Up" next to WhatsApp. Follow the steps to link your phone number to the app.'}
            />
            <Step number={4}
              title={isAr ? 'نسخ التوكن ورقم التعريف' : 'Copy Token & Phone Number ID'}
              description={isAr ? 'من لوحة تحكم WhatsApp في التطبيق، ستجد "Temporary Access Token" و "Phone Number ID". انسخهما. ⚠️ ملاحظة: التوكن المؤقت ينتهي بعد 24 ساعة. للاستخدام الدائم، أنشئ System User Token من Business Settings.' : 'From the WhatsApp dashboard in the app, you\'ll find "Temporary Access Token" and "Phone Number ID". Copy them. ⚠️ Note: Temporary token expires after 24 hours. For permanent use, create a System User Token from Business Settings.'}
            />
            <Step number={5}
              title={isAr ? 'أدخل البيانات في Flowmerce' : 'Enter Details in Flowmerce'}
              description={isAr ? 'اذهب إلى الإعدادات ← الإشعارات. أدخل WhatsApp Token و Phone Number ID، ثم اضغط "حفظ الإعدادات".' : 'Go to Settings → Notifications. Enter the WhatsApp Token and Phone Number ID, then click "Save Configuration".'}
            />
          </div>
          <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">
                {isAr ? 'نصيحة مهمة' : 'Important Tip'}
              </p>
              <p className="text-muted-foreground">
                {isAr 
                  ? 'للحصول على توكن دائم لا ينتهي: اذهب إلى Business Settings ← System Users ← أنشئ System User جديد ← Generate Token مع صلاحية whatsapp_business_messaging.'
                  : 'To get a permanent token: Go to Business Settings → System Users → Create new System User → Generate Token with whatsapp_business_messaging permission.'}
              </p>
            </div>
          </div>
        </Accordion>

        {/* 5. Email Notifications */}
        <Accordion title={isAr ? '📧 إعداد إشعارات البريد' : '📧 Email Notifications Setup'} icon={Bell}>
          <div className="mt-4 space-y-0">
            <Step number={1}
              title={isAr ? 'أدخل بريدك الإلكتروني' : 'Enter Your Email'}
              description={isAr ? 'اذهب إلى الإعدادات ← الإشعارات. أدخل بريدك الإلكتروني في حقل "البريد الإلكتروني للإشعارات" وستتلقى تنبيهات عند حدوث أي مشكلة في الطلبات.' : 'Go to Settings → Notifications. Enter your email in the "Notification Email" field and you\'ll receive alerts when any issue occurs with orders.'}
            />
          </div>
        </Accordion>

        {/* 6. Security */}
        <Accordion title={isAr ? '🔒 نصائح أمنية' : '🔒 Security Tips'} icon={Shield}>
          <div className="mt-4">
            <ul className="space-y-3">
              {(isAr ? [
                'لا تشارك مفاتيح API الخاصة بك مع أي شخص.',
                'استخدم كلمة مرور قوية ومختلفة عن كلمات المرور الأخرى.',
                'قم بتغيير توكن واتساب بشكل دوري للحماية.',
                'تأكد من تعطيل التطبيقات غير المستخدمة في Shopify.',
                'راجع سجل الطلبات بشكل دوري للتأكد من عدم وجود نشاط مشبوه.',
              ] : [
                'Never share your API keys with anyone.',
                'Use a strong password different from your other passwords.',
                'Rotate your WhatsApp token periodically for protection.',
                'Make sure to disable unused apps in Shopify.',
                'Review your order logs regularly to check for suspicious activity.',
              ]).map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </Accordion>
      </div>

      {/* Footer Note */}
      <div className="mt-10 p-5 rounded-2xl bg-muted/30 border border-border/50 text-center">
        <p className="text-sm text-muted-foreground">
          {isAr
            ? '💡 هل تحتاج مساعدة إضافية؟ تواصل معنا عبر البريد الإلكتروني: Flouwmerce@gmail.com'
            : '💡 Need more help? Contact us via email: Flouwmerce@gmail.com'}
        </p>
      </div>
    </div>
  )
}
