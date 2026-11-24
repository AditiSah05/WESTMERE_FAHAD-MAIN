import type { LegalSection } from './LegalPage'

export const termsIntro =
  'These terms govern your use of the Westmere website, your customer account and anything you buy from us. By using the site or placing an order you agree to them.'

export const termsSections: LegalSection[] = [
  {
    heading: 'Our services',
    body: ['Westmere designs and builds websites, mobile apps, workflow automation and custom software, and sells ready-made websites, applications and tools. Custom projects are governed by the written proposal, scope and timeline agreed with you, which prevail over these terms where they differ.'],
  },
  {
    heading: 'Your account',
    body: ['You must give accurate details, including a working email and mobile number, and keep your password private. You are responsible for activity under your account. Tell us at once if you suspect it has been misused.'],
  },
  {
    heading: 'Products and licences',
    body: [
      'When you buy a ready-made product you receive a licence to use it, not ownership of it. Unless your plan says otherwise:',
      ['You may use it for your own business or project and for your own clients, as your licence type allows.', 'You may not resell, redistribute or share the source code, files or licence keys.', 'A licence may be tied to registered domains or devices and may expire or need renewal.', 'Access to downloads and updates is granted only after payment is confirmed.'],
    ],
  },
  {
    heading: 'Prices and payment',
    body: ['Prices are shown in the currency on the product page and include or exclude taxes as stated at checkout. Payment status and delivery status are tracked separately. If a payment fails, we keep the order record but do not give access to protected files until payment succeeds.'],
  },
  {
    heading: 'Cancellations and refunds',
    body: ['You can request a cancellation or refund from My Orders. We review each request against the order status and the nature of the product. Digital products that have already been delivered or downloaded may not be refundable, except where the law says otherwise or the product is faulty. Approved refunds go back through the original payment method.'],
  },
  {
    heading: 'Custom projects',
    body: [
      'For custom work:',
      ['Scope, price, milestones and deadlines are agreed in writing before work starts.', 'Payment is due as agreed, in full or by milestone.', 'You provide content, access and timely feedback; delays on your side may move delivery dates.', 'Revisions beyond the agreed number, or changes to scope, may be quoted separately.'],
    ],
  },
  {
    heading: 'Intellectual property',
    body: ['Westmere keeps all rights in its website, brand, code and materials. For custom projects, ownership of the final deliverables passes to you once payment in full is received, except for our pre-existing tools, libraries and third-party or open-source components, which stay under their own licences.'],
  },
  {
    heading: 'Acceptable use',
    body: ['Do not misuse the site: no attempts to break or probe security, no scraping, no unlawful or harmful content, and no sharing of licensed files. We may suspend accounts that break these rules.'],
  },
  {
    heading: 'Reviews',
    body: ['Reviews must be honest and about a product you have bought. We may reject or remove reviews that are abusive, false or off-topic.'],
  },
  {
    heading: 'Third-party services',
    body: ['The site may link to or rely on third parties such as payment providers and Google. We do not control them and are not responsible for their services or policies.'],
  },
  {
    heading: 'Disclaimers and liability',
    body: ['We work to deliver reliable products and services, but they are provided as described and without any guarantee that they will be uninterrupted or error-free. To the extent the law allows, Westmere is not liable for indirect or consequential loss, and our total liability for any claim is limited to the amount you paid us for the product or service concerned.'],
  },
  {
    heading: 'Changes and ending',
    body: ['We may update these terms or the site at any time; continued use means you accept the updated terms. We may suspend or end access if these terms are broken, and you can close your account from Account Settings.'],
  },
  {
    heading: 'Governing law',
    body: ['These terms are governed by the laws of India. Courts at Pune, Maharashtra have jurisdiction over any dispute.'],
  },
  {
    heading: 'Contact',
    body: ['Questions about these terms: hello@westmere.io or +91 96546 64191.'],
  },
]
