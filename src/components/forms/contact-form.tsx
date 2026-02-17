'use client'

import { useState } from 'react'
import { Link } from '@/lib/i18n-navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const contactSchema = z.object({
  name: z.string().min(2, 'validation.nameRequired').max(100),
  email: z.string().email('validation.emailInvalid').max(255),
  phone: z.string().max(30).optional(),
  service: z.string().min(1, 'validation.serviceRequired').max(50),
  message: z.string().min(10, 'validation.messageMin').max(5000),
  budget: z.string().max(50).optional(),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'validation.privacyRequired',
  }),
  // Honeypot field - should always be empty (bots fill this)
  website: z.string().max(0).optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const t = useTranslations('contact.form')
  const tCommon = useTranslations('common')
  const tServices = useTranslations('services')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [honeypot, setHoneypot] = useState('')

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      budget: '',
      website: '',
    },
  })

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true)

    try {
      // Include honeypot field
      const submitData = { ...data, website: honeypot }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) {
        throw new Error('Fehler beim Senden')
      }

      toast.success(t('success'))
      form.reset()
    } catch {
      toast.error(t('error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field - hidden from humans, visible to bots */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website">Website (leave empty)</label>
          <input
            type="text"
            id="website"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('name')} *</FormLabel>
                <FormControl>
                  <Input placeholder={t('name')} autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')} *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={t('email')} autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('service')} *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={tCommon('pleaseSelect')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="branding">{tServices('branding.title')}</SelectItem>
                  <SelectItem value="webdesign">{tServices('webdesign.title')}</SelectItem>
                  <SelectItem value="digital-marketing">{tServices('digitalMarketing.title')}</SelectItem>
                  <SelectItem value="seo-content">{tServices('seoContent.title')}</SelectItem>
                  <SelectItem value="web-app-entwicklung">{tServices('webAppDevelopment.title')}</SelectItem>
                  <SelectItem value="it-cloud-services">{tServices('itCloudServices.title')}</SelectItem>
                  <SelectItem value="other">{t('serviceOther')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('phone')}</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+43 ..." autoComplete="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('budget')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={tCommon('pleaseSelect')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="<5000">{t('budgetOptions.under5k')}</SelectItem>
                    <SelectItem value="5000-10000">{t('budgetOptions.5kTo10k')}</SelectItem>
                    <SelectItem value="10000-25000">{t('budgetOptions.10kTo25k')}</SelectItem>
                    <SelectItem value=">25000">{t('budgetOptions.over25k')}</SelectItem>
                    <SelectItem value="unsure">{t('budgetOptions.unsure')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('message')} *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('message')}
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">
                  {t('privacyConsent')}{' '}
                  <Link href="/datenschutz" className="underline hover:text-primary">
                    {t('learnMore')}
                  </Link>{' '}
                  *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('sending')}
            </>
          ) : (
            t('submit')
          )}
        </Button>
      </form>
    </Form>
  )
}
