# Email Templates - GoldenWing Creative Studios

Professional email templates for customer inquiries and internal notifications.

## Features

- **Customer Confirmation Email**: Beautifully designed email sent to customers when they submit a contact form
- **Team Notification Email**: Internal notification for the GoldenWing team with all inquiry details
- **Mobile-Responsive**: Works perfectly on all devices and email clients
- **Brand-Consistent**: Uses GoldenWing's gold/amber color scheme and premium design aesthetic

## Setup

### 1. Configure Resend API Key

Add your Resend API key to `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

To get your API key:
1. Sign up at [resend.com](https://resend.com)
2. Navigate to API Keys section
3. Create a new API key
4. Copy and paste into your `.env.local` file

### 2. Verify Domain (Production)

For production use, you need to verify your domain with Resend:

1. Go to Resend Dashboard > Domains
2. Add your domain (goldenwing.at)
3. Add the provided DNS records to your domain
4. Wait for verification (usually takes a few minutes)

For development, you can use Resend's test mode which sends to verified email addresses only.

### 3. Configure Team Email

By default, notifications are sent to `deni@goldenwing.at`. To change this, edit:

`/src/lib/email/send.ts`:
```typescript
const EMAIL_CONFIG = {
  from: 'GoldenWing Creative Studios <noreply@goldenwing.at>',
  teamEmail: 'your-team-email@goldenwing.at', // Change this
  replyTo: 'deni@goldenwing.at',
}
```

## File Structure

```
src/lib/email/
├── templates/
│   ├── customer-confirmation.tsx  # Customer-facing email template
│   └── team-notification.tsx      # Internal team notification template
├── send.ts                        # Email sending utilities
├── index.ts                       # Module exports
└── README.md                      # This file
```

## Email Templates

### Customer Confirmation Email

Sent to customers when they submit the contact form. Includes:

- GoldenWing branding and logo
- Personalized greeting
- Summary of their inquiry (service, budget, message)
- Next steps and what to expect
- Contact information (email, phone, website)
- Social media links (Facebook, Instagram, LinkedIn, WhatsApp)
- Professional footer with company details

### Team Notification Email

Sent to the GoldenWing team. Includes:

- All customer contact details
- Service requested and budget range
- Full project description
- Quick action buttons (reply via email, call)
- Next steps checklist
- Submission metadata (timestamp, IP address)
- Priority indicator based on budget

## Usage

The email system is automatically integrated into the contact form API route:

`/src/app/api/contact/route.ts`

When a contact form is submitted:
1. Form data is validated and sanitized
2. Both emails are sent in parallel
3. Errors are logged but don't block the submission
4. Success response is returned to the user

### Manual Usage

You can also use the email functions directly:

```typescript
import { sendContactFormEmails } from '@/lib/email'

const result = await sendContactFormEmails(
  {
    name: 'Max Mustermann',
    email: 'max@example.com',
    phone: '+43 664 123 4567',
    service: 'webdesign',
    message: 'Ich benötige eine neue Website...',
    budget: '5000-10000',
  },
  {
    ipAddress: '123.45.67.89',
  }
)

if (result.success) {
  console.log('Emails sent:', result.customerEmailId, result.teamEmailId)
} else {
  console.error('Email error:', result.error)
}
```

## Email Client Compatibility

These templates are tested and work in:

- Gmail (Web, iOS, Android)
- Apple Mail (macOS, iOS)
- Outlook (Windows, Web, macOS)
- Yahoo Mail
- Thunderbird
- ProtonMail

## Customization

### Changing Colors

Both templates use inline styles for maximum compatibility. To change the gold accent color:

Find and replace `#D4A574` with your preferred color in:
- `/src/lib/email/templates/customer-confirmation.tsx`
- `/src/lib/email/templates/team-notification.tsx`

### Modifying Content

Each template is a React component returning HTML. You can modify:
- Text content
- Layout structure
- Images and logos
- Social media links
- Footer information

### Adding New Templates

1. Create new template in `/src/lib/email/templates/your-template.tsx`
2. Export it in `/src/lib/email/index.ts`
3. Add sending function in `/src/lib/email/send.ts` if needed

## Development & Testing

### Test Emails Locally

During development with Resend's test mode:

1. Add your email to verified senders in Resend dashboard
2. Submit a test form
3. Check your inbox

### Preview Templates

To preview templates without sending:

```typescript
import { renderToStaticMarkup } from 'react-dom/server'
import { CustomerConfirmationEmail } from '@/lib/email/templates/customer-confirmation'

const html = renderToStaticMarkup(
  CustomerConfirmationEmail({
    name: 'Test User',
    email: 'test@example.com',
    service: 'webdesign',
    message: 'Test message',
  })
)

// Save to file or log
console.log(html)
```

## Troubleshooting

### Emails not sending

1. Check `RESEND_API_KEY` is set in `.env.local`
2. Verify API key is valid in Resend dashboard
3. Check server logs for error messages
4. Ensure "from" domain is verified (production)

### Emails going to spam

1. Verify your domain with Resend
2. Set up SPF, DKIM, and DMARC records
3. Avoid spam trigger words in content
4. Warm up your domain with gradual sending

### Styling issues

1. Use inline styles (already done)
2. Avoid CSS classes and external stylesheets
3. Test in multiple email clients
4. Use tables for layout (already done)

## Best Practices

- **Always use inline styles** - Email clients strip `<style>` tags
- **Use tables for layout** - Flexbox/Grid don't work in email
- **Test in multiple clients** - Outlook renders differently than Gmail
- **Keep images small** - Large images may be blocked
- **Include alt text** - For when images don't load
- **Use web-safe fonts** - Stick to system fonts
- **Mobile-first design** - Most users read email on mobile

## Security

- All user input is sanitized before rendering
- XSS prevention in place
- Honeypot spam protection
- Rate limiting on form submission
- IP address logging for abuse prevention

## Performance

- Emails sent in parallel (don't block each other)
- Failures logged but don't block form submission
- Lazy import of email module (reduces API route bundle)

## License

Proprietary - GoldenWing Creative Studios
