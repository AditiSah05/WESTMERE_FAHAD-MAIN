import type { LegalSection } from './LegalPage'

export const privacyIntro =
  'This policy explains what personal information Westmere collects through this website and the customer account area, why we collect it, and the choices you have. By using the site you agree to this policy.'

export const privacySections: LegalSection[] = [
  {
    heading: 'Who we are',
    body: ['Westmere is a growth and creative agency based at C-547, Gera Imperium Gateway, Near Bhosari Metro Station (Nashik Phata), Kasarwadi, Bhosari, Pune, Maharashtra 411034, India. You can reach us at hello@westmere.io or +91 96546 64191.'],
  },
  {
    heading: 'What we collect',
    body: [
      'We collect only what we need to respond to you, deliver what you buy and keep the site secure:',
      [
        'Contact form: your name, email, mobile number, company (optional), the service you are interested in and your message.',
        'Account: your name, email, mobile number and a password (stored only as a one-way hash). If you sign in with Google, we receive your name and verified email from Google.',
        'Orders and billing: the products you buy, payment status, billing address, country, state, postal code and GSTIN if you provide one.',
        'Support and reviews: tickets you raise and reviews you write.',
        'Technical data: IP address, browser type and sign-in session details, used for security, rate limiting and to keep you signed in.',
      ],
    ],
  },
  {
    heading: 'How we use it',
    body: [
      [
        'To reply to enquiries and to scope, quote and deliver projects.',
        'To create and run your account, process orders, give access to downloads and licences, and send order and payment confirmations.',
        'To provide support, publish approved reviews and improve our products.',
        'To prevent fraud and abuse, and to meet legal and tax obligations.',
      ],
      'We do not sell your personal information.',
    ],
  },
  {
    heading: 'Cookies',
    body: ['We use only the cookies needed to run the site, mainly the one that keeps you signed in to your account or the admin area. We do not use advertising cookies. If we add analytics later, we will update this page.'],
  },
  {
    heading: 'Payments',
    body: ['Payments are handled by our payment partner. Card, UPI and bank details go to the payment provider, not to Westmere, and we do not store them. We keep the order, amount and status.'],
  },
  {
    heading: 'Who we share it with',
    body: [
      'We share information only with service providers that help us run the site, under their own privacy terms, and only as needed:',
      ['Hosting and database providers.', 'The payment provider that processes your payment.', 'Form and email delivery services that pass your messages to us.', 'Google, when you choose to sign in with Google, and for showing our business reviews.'],
      'We may also disclose information when the law requires it or to protect our rights.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: ['We keep enquiries and account data for as long as your account is active or we need it to serve you. Order and invoice records are kept for the period tax and accounting laws require. You can ask us to delete your account; we will remove what we are not required to keep.'],
  },
  {
    heading: 'Security',
    body: ['Passwords are hashed, sessions are checked on the server, and admin access uses extra protections. No system is completely secure, so please use a strong, unique password.'],
  },
  {
    heading: 'Your choices and rights',
    body: [
      'Under applicable Indian law, including the Digital Personal Data Protection Act, 2023, you can:',
      ['Access and correct your details in My Profile.', 'Download a copy of your data from Account Settings.', 'Request deletion of your account from Account Settings.', 'Withdraw consent, or opt out of marketing emails, at any time.'],
      'For any other request or complaint, write to hello@westmere.io and we will respond within a reasonable time.',
    ],
  },
  {
    heading: 'Children',
    body: ['Our services are for businesses and adults. We do not knowingly collect information from children under 18.'],
  },
  {
    heading: 'Changes to this policy',
    body: ['We may update this policy. The date at the top shows the latest version, and we will tell account holders about significant changes.'],
  },
]
