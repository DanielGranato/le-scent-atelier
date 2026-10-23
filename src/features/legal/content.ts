// Copy for the Legal page: Terms and Privacy. A first draft written for a fictional portfolio project.

export const LEGAL_META = {
  title: 'Legal | Le Scent Atelier',
  description:
    'Terms of use and privacy notes for Le Scent Atelier, a fictional brand created for a portfolio project. No real products are sold.',
}

export type LegalSectionId = 'terms' | 'privacy'

export interface LegalSection {
  id: LegalSectionId
  title: string
  updated: string
  intro: string
  items: { heading: string; text: string }[]
}

export const isLegalSectionId = (value: string | undefined): value is LegalSectionId =>
  value === 'terms' || value === 'privacy'

export const LEGAL_SECTIONS: LegalSection[] = [
  {
    id: 'terms',
    title: 'Terms',
    updated: 'Last updated: October 2026',
    intro: 'These terms are short because the shop is imaginary. By using this website you agree to them.',
    items: [
      {
        heading: 'What this site is',
        text: 'Le Scent Atelier is a fictional brand created for a portfolio project. The perfumes, prices, stories and people on this site are invented. It is not affiliated with any real brand.',
      },
      {
        heading: 'No real purchases',
        text: 'Nothing on this site can be bought. There is no checkout, no payment and no delivery. Prices and sizes are only here to show how a store could look.',
      },
      {
        heading: 'Using the site',
        text: 'You are welcome to look around. Please do not try to break the site, overload it or use it for anything unlawful.',
      },
      {
        heading: 'Content',
        text: 'The texts, photographs, logo and design belong to the author of this portfolio project. Please do not copy or reuse them without asking. Some images were generated with AI tools.',
      },
      {
        heading: 'No guarantees',
        text: 'The site is provided as it is, with no promise that it will always be available or free of mistakes. Please do not make decisions based on what you read here.',
      },
      {
        heading: 'Changes and questions',
        text: 'These terms or the site may change at any time. The date above shows the last update. For questions, use the contact page.',
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    updated: 'Last updated: October 2026',
    intro: 'Short version: we do not collect your personal data. Longer version below.',
    items: [
      {
        heading: 'What we collect',
        text: 'Nothing is sent to a server. The contact form and the newsletter field only check what you type in your own browser, show you a message, and forget it. Nothing is stored on a server, sold or shared.',
      },
      {
        heading: 'Cookies and local storage',
        text: "This site does not set cookies. If you create a demo account, your name, your email and a scrambled version of your password (a hash) are saved in your browser's local storage, on your own device, and nothing is sent anywhere. It is a demo, not real security: please do not use a password you use elsewhere. You can remove it at any time by clearing this site's data in your browser.",
      },
      {
        heading: 'Fonts and hosting',
        text: 'The Jost typeface is loaded from Google Fonts, so Google receives your IP address when a page opens. The site is hosted on GitHub Pages, which may keep basic technical logs. We have no access to those logs.',
      },
      {
        heading: 'Analytics and ads',
        text: 'There are no analytics, trackers or ads on this site.',
      },
      {
        heading: 'Your choices',
        text: 'Since we keep no data about you, there is nothing to access or delete. You can block cookies and local storage in your browser at any time.',
      },
      {
        heading: 'Changes',
        text: 'If any of this changes, we will update this page and the date above.',
      },
    ],
  },
]
