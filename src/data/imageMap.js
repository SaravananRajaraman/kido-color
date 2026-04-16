/**
 * data/imageMap.js
 *
 * Maps each letter A–Z to a display name and SVG illustration file.
 * SVG files live in src/assets/svgs/.
 *
 * To add a new illustration:
 *   1. Drop the .svg file into src/assets/svgs/
 *   2. Add one entry to IMAGE_MAP below: { letter, name, svg: svg('your-filename') }
 */

// Eagerly loads all SVGs in src/assets/svgs/ as raw strings at build time.
// No individual import lines needed — just add a file and map it below.
const svgs = import.meta.glob('../assets/svgs/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** @param {string} file  filename without .svg extension */
function svg(file) {
  return svgs[`../assets/svgs/${file}.svg`] ?? '';
}

export const IMAGE_MAP = [
  { letter: 'A', name: 'Apple',     svg: svg('a-apple')     },
  { letter: 'B', name: 'Ball',      svg: svg('b-ball')      },
  { letter: 'C', name: 'Cat',       svg: svg('c-cat')       },
  { letter: 'D', name: 'Dog',       svg: svg('d-dog')       },
  { letter: 'E', name: 'Elephant',  svg: svg('e-elephant')  },
  { letter: 'F', name: 'Fish',      svg: svg('f-fish')      },
  { letter: 'G', name: 'Giraffe',   svg: svg('g-giraffe')   },
  { letter: 'H', name: 'House',     svg: svg('h-house')     },
  { letter: 'I', name: 'Ice Cream', svg: svg('i-icecream')  },
  { letter: 'J', name: 'Jellyfish', svg: svg('j-jellyfish') },
  { letter: 'K', name: 'Kite',      svg: svg('k-kite')      },
  { letter: 'L', name: 'Lion',      svg: svg('l-lion')      },
  { letter: 'M', name: 'Moon',      svg: svg('m-moon')      },
  { letter: 'N', name: 'Nest',      svg: svg('n-nest')      },
  { letter: 'O', name: 'Owl',       svg: svg('o-owl')       },
  { letter: 'P', name: 'Pig',       svg: svg('p-pig')       },
  { letter: 'Q', name: 'Crown',     svg: svg('q-crown')     },
  { letter: 'R', name: 'Rainbow',   svg: svg('r-rainbow')   },
  { letter: 'S', name: 'Sun',       svg: svg('s-sun')       },
  { letter: 'T', name: 'Train',     svg: svg('t-train')     },
  { letter: 'U', name: 'Umbrella',  svg: svg('u-umbrella')  },
  { letter: 'V', name: 'Volcano',   svg: svg('v-volcano')   },
  { letter: 'W', name: 'Whale',     svg: svg('w-whale')     },
  { letter: 'X', name: 'Xylophone', svg: svg('x-xylophone') },
  { letter: 'Y', name: 'Yak',       svg: svg('y-yak')       },
  { letter: 'Z', name: 'Zebra',     svg: svg('z-zebra')     },
];
