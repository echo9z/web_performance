const base = '/imgs';
const width = 1500;
const dir = 'big';
// const dir = 'small';

// All images are public domain.
// https://www.pexels.com/photo/fish-seafood-market-sea-85528/
// https://www.pexels.com/photo/burrito-chicken-delicious-dinner-461198/
// https://www.pexels.com/photo/vegetables-italian-pizza-restaurant-2232/
// https://www.pexels.com/photo/appetizer-bowl-bread-breakfast-539451/

const model = [
  {
    name: 'Fesh',
    // image: `https://storage.googleapis.com/webfundamentals-assets/tools/chrome-devtools/load-performance/${dir}/fesh.jpg`,
    image: 'https://images.pexels.com/photos/85528/pexels-photo-85528.jpeg',
    body: 'Salty goodness',
    route: 'fesh',
    pros: [
      'Salty',
      'Shiny'
    ],
    cons: [
      'Tough to hold',
      'Sometimes runs away'
    ]
  },
  {
    name: 'Brrto',
    // image: `https://storage.googleapis.com/webfundamentals-assets/tools/chrome-devtools/load-performance/${dir}/brrto.jpg`,
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
    body: 'Portable noms',
    route: 'brrto',
    pros: [
      'Many flavor',
      'Travels well'
    ],
    cons: [
      'Often wrapped in scary shiny metal',
      'Heavy'
    ]
  },
  {
    name: 'Pezza',
    // image: `https://storage.googleapis.com/webfundamentals-assets/tools/chrome-devtools/load-performance/${dir}/pezza.jpg`,
    image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg',
    body: 'Gooey hotness',
    route: 'pezza',
    pros: [
      'Maximum chees',
      'Still good after many days'
    ],
    cons: [
      'Too much hot',
      'Hard to lick'
    ]
  },
  {
    name: 'Soop',
    //image: `http://storage.googleapis.com/webfundamentals-assets/tools/chrome-devtools/load-performance/${dir}/soop.jpg`,
    image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg',
    body: 'Cozy warm',
    route: 'soop',
    pros: [
      'Smooth on tongue',
      'Pretty'
    ],
    cons: [
      'Cannot put in pockets',
      'Makes your face messy'
    ]
  }
];

export default model;
