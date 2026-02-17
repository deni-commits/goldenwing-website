/**
 * Email module for GoldenWing Creative Studios
 *
 * This module handles all email functionality including:
 * - Customer confirmation emails
 * - Team notification emails
 * - Email sending via Resend
 *
 * @module email
 */

export {
  sendContactFormEmails,
  sendCustomerConfirmation,
  sendTeamNotification,
  sendSeoReportEmail,
  type ContactFormData,
  type SeoReportData,
} from './send'

export { CustomerConfirmationEmail } from './templates/customer-confirmation'
export { TeamNotificationEmail } from './templates/team-notification'
