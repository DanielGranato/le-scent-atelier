// Copy for the About page.

export const ABOUT_META = {
  title: 'About | Le Scent Atelier',
  description:
    'Le Scent Atelier makes perfume that elevates the everyday: honest notes, small batches and samples first. A fictional brand for a portfolio project.',
}

export const INTRO = {
  title: 'Elevating everyday.',
  text: "Perfume isn't only for big occasions. It's for the cup of tea at 4 a.m., the Sunday market, the first summer rain on a hot rooftop. Le Scent Atelier is a small perfume brand that lifts ordinary moments one notch higher.",
}

export const IDEA = {
  title: 'The idea',
  paragraphs: [
    'Most perfume is sold with a yacht, a desert or a movie star. We start from something you actually did last Tuesday and lift it. A scent won\'t change your day, it just makes it a little better than it was.',
    'Small Hours is tea at four in the morning. The Library is leather and old paper. Embers is what\'s left of a bonfire after everyone has gone to sleep. Same days, one notch higher. No yachts.',
  ],
}

export const STEPS = {
  title: 'How we make it',
  items: [
    { lead: 'Pick an everyday moment.', text: 'We start with a scene you already know, not a formula.' },
    { lead: 'Build the notes.', text: 'Top, heart and base, each chosen to lift that scene.' },
    {
      lead: 'Test it on skin.',
      text: "If it doesn't make the moment better after a few hours, it goes back to step two.",
    },
  ],
}

export const PROMISES = {
  title: 'What we promise',
  items: [
    { lead: 'Small batches.', text: 'Made in few bottles, so nothing sits on a shelf for years.' },
    { lead: 'Honest notes.', text: 'What we list is what you smell.' },
    { lead: 'Samples first.', text: 'Try before you commit to a full bottle.' },
  ],
}

export const FAMILIES_INTRO = {
  title: 'Four families, one rule',
  text: 'Fresh, Floral, Woody and Amber. Not sure where to start? Start with the one that sounds like your Sunday.',
  primaryButton: 'Find your everyday',
  secondaryButton: 'Build your sample set',
}

export const DISCLAIMER =
  'Le Scent Atelier is a fictional brand created for a portfolio project. No real products are sold.'

// Other short texts from the brief. Not used on this page yet:
//   Footer line:               "Elevating everyday."
//   Announcement bar:          "Free samples with every order"
//   Alternative hero subtitle: "Four families. Fifteen everyday moments, one notch higher."

/** The two photos of the hero, side by side, full screen (paths are relative to public/). */
export const HERO_IMAGES = [
  {
    src: 'images/4am-tea-bw.webp',
    alt: 'A woman holding a cup of tea at a kitchen table, rain on the window behind her',
  },
  {
    src: 'images/sunday-market-rain-bw.webp',
    alt: 'A woman smiling at a rainy Sunday market, carrying flowers',
  },
];

/**
 * MOCK images: photos we already have, only to fill the layout of the sections below the hero.
 * Replace them with the real About photos later (paths are relative to public/).
 */
export const MOCK_IMAGES = {
  moments: [
    { slug: 'small-hours', name: 'Small Hours', caption: 'Tea at four in the morning', image: 'images/products/small-hours.webp' },
    { slug: 'the-library', name: 'The Library', caption: 'Leather and old paper', image: 'images/products/the-library.webp' },
    { slug: 'embers', name: 'Embers', caption: "What's left of a bonfire", image: 'images/products/embers.webp' },
  ],
}
