// Copy for the About page.

export const ABOUT_META = {
  title: 'About | Le Scent Atelier',
  description:
    'Le Scent Atelier makes perfume that elevates the everyday: honest notes, small batches and a small size to start with. A fictional brand for a portfolio project.',
}

export const INTRO = {
  title: 'Elevating everyday.',
  text: "Perfume isn't only for big occasions. It's for the cup of tea at 4 a.m., the Sunday market, the first summer rain on a hot rooftop. Le Scent Atelier is a small perfume brand that lifts ordinary moments one notch higher.",
}

export const IDEA = {
  title: 'The idea',
  text: "Most perfume is sold with a yacht, a desert or a movie star. We start from something you actually did last Tuesday and lift it. A scent won't change your day, it just makes it a little better than it was.",
  // Not on the page for now (the section shows only the text above):
  //   'Small Hours is tea at four in the morning. The Library is leather and old paper. Embers is what's left of a bonfire after everyone has gone to sleep. Same days, one notch higher. No yachts.'
  image: {
    // a resized WebP copy of about01.jpg (the original is 6 MB)
    src: 'images/about01.webp',
    alt: 'A green velvet armchair on a lawn, with a basket of flowers on the grass',
  },
};

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
  image: {
    // a resized WebP copy of about02.jpg (the original is 3.8 MB)
    src: 'images/about02.webp',
    alt: 'A woman in a white knit top mixing a scent with glass bottles and beakers on a wooden table',
  },
  items: [
    { lead: 'Small batches.', text: 'Made in few bottles, so nothing sits on a shelf for years.' },
    { lead: 'Honest notes.', text: 'What we list is what you smell.' },
    { lead: 'Start small.', text: 'Every scent comes in 10 mL, so you can live with it before you pick a bigger bottle.' },
  ],
}

export const FAMILIES_INTRO = {
  title: 'Four families, one rule',
  text: 'Fresh, Floral, Woody and Amber. Not sure where to start? Start with the one that sounds like your Sunday.',
  primaryButton: 'Find your everyday',
}

export const DISCLAIMER =
  'Le Scent Atelier is a fictional brand created for a portfolio project. No real products are sold.'

// Other short texts from the brief. Not used on this page yet:
//   Footer line:               "Elevating everyday."
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
