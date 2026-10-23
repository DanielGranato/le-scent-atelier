// Copy for the Shipping page. The brand is fictional: these are example terms, nothing is really shipped.

export const SHIPPING_META = {
  title: 'Shipping | Le Scent Atelier',
  description:
    'How a Le Scent Atelier order would reach you: where we ship, how long it takes and what it costs. A fictional brand for a portfolio project.',
}

export const INTRO = {
  title: 'Shipping',
  text: 'How an order from Le Scent Atelier would reach you: where we would ship, how long it takes and what it costs.',
  note: 'Le Scent Atelier is a fictional brand, so nothing is really shipped. This page shows how shipping would work in a real store.',
}

export const OPTIONS = {
  title: 'Delivery options',
  caption: 'Delivery options, with time and cost',
  columns: { method: 'Method', time: 'Time', cost: 'Cost' },
  rows: [
    { method: 'Standard', time: '5 to 8 business days', cost: '$6, free over $120' },
    { method: 'Express', time: '2 to 3 business days', cost: '$14' },
  ],
}

export const NOTES = {
  title: 'Good to know',
  items: [
    {
      heading: 'Where we ship',
      text: 'We would ship to the United States, Canada and most of Europe. Other countries are not available yet.',
    },
    {
      heading: 'When it leaves',
      text: 'Orders placed on a business day before 2 p.m. leave our atelier the same day. Later orders leave the next business day.',
    },
    {
      heading: 'Packaging',
      text: 'Each bottle is wrapped in recycled paper and sent in a sturdy cardboard box, closed with paper tape. No plastic filling.',
    },
    {
      heading: 'Perfume and travel',
      text: 'Perfume contains alcohol, so many carriers will not send it by air. In some places this makes delivery a little slower than the times above.',
    },
    {
      heading: 'Tracking',
      text: 'You would get a tracking link by email as soon as your order leaves the atelier.',
    },
    {
      heading: 'Damaged or lost',
      text: 'If a bottle arrives broken, or never arrives, write to us through the contact page and we would send a new one.',
    },
  ],
}

export const HELP = {
  title: 'Questions about an order?',
  text: 'Write to us and we will point you the right way.',
  button: 'Contact us',
}
