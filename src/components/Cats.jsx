import { useEffect, useRef, useState } from 'react';
import { cats } from '../data/cats.js';
import PixelPet from './PixelPet.jsx';
import styles from './Cats.module.css';

/**
 * Four retro pixel-art cats for the About section — Mocha (brown), Mochi
 * (white), MonMon (black) and PotPot (black-and-white kitten). All four are
 * the same standing side-view cat drawn as character-map sprite layers —
 * tail, body, patches, head, two ears and an eye — recoloured per palette
 * and facing left, so the clowder looks across the companions row at the
 * dogs. Rendered by PixelPet.jsx; every motion lives in Cats.module.css and
 * targets the sprite's [data-part] groups.
 */

const CAT_SPRITE = {
  width: 30,
  height: 23,
  parts: [
    {
      // Tail held up in an alert curve with a tipped end; sways from the base.
      name: 'tail',
      origin: [26, 11],
      map: [
        '......................ggg.......',
        '........................ggg.....',
        '.........................TTT....',
        '.........................TTT....',
        '.........................TTT....',
        '.........................TTT....',
        '.........................TTT....',
        '.........................TTT....',
        '.........................TTT....',
        '.........................TTT....',
        '.........................TTT....',
      ],
    },
    {
      // Torso, four legs and paws, plus the ground shadow row. The top edge
      // slopes down toward the head so the neck reads as its own dip.
      name: 'body',
      map: [
        '.............bbbbbbbbbbbbbbb....',
        '...........bbbbbbbbbbbbbbbbb....',
        '..........bbbbbbbbbbbbbbbbbb....',
        '.........hhhhhbbbbbbbbbbbbbb....',
        '.........hhhhhbbbbbbbbbbbbbb....',
        '..........hhhhbbbbbbbbbbbbb.....',
        '..........bbbbbbbbbbbbbbb.......',
        '..........bbbbbbbbbbbbbb........',
        '...........bb.bb.....bb.bb......',
        '...........bb.bb.....bb.bb......',
        '..........bbbbbb....bbbbbb......',
        '..........pppppp....pppppp......',
        '.........ddddddddddddddddddd....',
      ],
    },
    {
      // Optional breed markings (PotPot's saddle, Mocha's stripes).
      name: 'patches',
      map: [],
    },
    {
      // Head with a protruding muzzle and nose at the tip; bobs from the neck.
      name: 'head',
      origin: [12, 11],
      map: [
        '......bbbb....................',
        '.....bbbbbb...................',
        '....bbbbbbbb..................',
        '....bbbbbbbbb.................',
        '.nhbbbbbbbbb..................',
        '.hhbbbbbbbbb..................',
        '....bbbbbbbb..................',
        '.....bbbbbbb..................',
        '......bbbbb...................',
      ],
    },
    {
      // Far ear; twitches independently of the near one.
      name: 'earL',
      origin: [9, 4],
      map: [
        '.........b....................',
        '........bib...................',
        '........bbb...................',
        '........bbb...................',
      ],
    },
    {
      // Near ear; twitches independently of the far one.
      name: 'earR',
      origin: [5, 4],
      map: [
        '.....b........................',
        '....bib.......................',
        '....bbb.......................',
        '....bbb.......................',
      ],
    },
    {
      // Side-view eye with a one-pixel shine; blinks by squashing shut.
      name: 'eye',
      origin: [7, 9],
      map: [
        '......we......................',
        '......ee......................',
      ],
    },
  ],
};

// PotPot's black saddle across the back.
const CAT_TUX_PATCHES = [
  '...............kkkkkkkkk......',
  '...............kkkkkkkkk......',
  '..............kkkkkkkk........',
  '..............kkkkkkkk........',
];

// Mocha's tabby stripes along the back.
const CAT_BROWN_PATCHES = [
  '..................sss.........',
  '...................sss........',
  '.................sss..........',
];

const CAT_PALETTES = {
  brown: {
    b: '#c8844b',
    s: '#8b4f26',
    h: '#fff7eb',
    p: '#cbaa89',
    n: '#3a2a23',
    w: '#ffffff',
    e: '#2c2622',
    T: '#b26d36',
    g: '#f2e2c8',
    i: '#a9592c',
    k: '#8b4f26',
    d: 'rgba(12, 10, 18, 0.28)',
  },
  white: {
    b: '#f2eee7',
    s: '#d5cec3',
    h: '#ffffff',
    p: '#d9d2c7',
    n: '#2a2623',
    w: '#ffffff',
    e: '#2c2622',
    T: '#f2eee7',
    g: '#f2eee7',
    i: '#e6b7b3',
    k: '#d5cec3',
    d: 'rgba(20, 20, 24, 0.22)',
  },
  black: {
    b: '#3c3742',
    s: '#26222b',
    h: '#4d4650',
    p: '#2a2630',
    n: '#16141a',
    w: '#ffffff',
    e: '#e0b054',
    T: '#2c2830',
    g: '#2c2830',
    i: '#6d5e6e',
    k: '#26222b',
    d: 'rgba(0, 0, 0, 0.32)',
  },
  tux: {
    b: '#f2eee7',
    s: '#d5cec3',
    h: '#ffffff',
    p: '#d9d2c7',
    n: '#2a2623',
    w: '#ffffff',
    e: '#2c2622',
    T: '#262229',
    g: '#262229',
    i: '#e6b7b3',
    k: '#262229',
    d: 'rgba(20, 20, 24, 0.22)',
  },
};

const VARIANT_PATCHES = {
  brown: CAT_BROWN_PATCHES,
  tux: CAT_TUX_PATCHES,
};

function Cat({ variant, excited = false }) {
  const patches = VARIANT_PATCHES[variant];
  const sprite = patches
    ? {
        ...CAT_SPRITE,
        parts: CAT_SPRITE.parts.map((part) => (part.name === 'patches' ? { ...part, map: patches } : part)),
      }
    : CAT_SPRITE;
  return (
    <PixelPet
      sprite={sprite}
      palette={CAT_PALETTES[variant]}
      className={`${styles.cat} ${styles[variant]} ${excited ? styles.excited : ''}`}
    />
  );
}

export default function Cats() {
  const [hovered, setHovered] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const timer = useRef(null);
  const leaveTimer = useRef(null);

  useEffect(() => () => {
    clearTimeout(timer.current);
    clearTimeout(leaveTimer.current);
  }, []);

  // Same interaction model as the dogs: a click (or tap) greets for a fixed
  // while; hovering any cat excites them, debounced across the gaps between
  // sprites so the reaction never resets mid-motion.
  const greet = () => {
    clearTimeout(timer.current);
    setGreeting(true);
    timer.current = setTimeout(() => setGreeting(false), 2600);
  };

  const petEnter = (event) => {
    clearTimeout(leaveTimer.current);
    if (event.pointerType !== 'touch') setHovered(true);
  };

  const petLeave = () => {
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHovered(false), 140);
  };

  const excited = hovered || greeting;
  const names = `${cats.brown}, ${cats.white}, ${cats.black} & ${cats.tux}`;

  return (
    <figure className={styles.clowderWrap}>
      <div
        className={styles.clowder}
        onPointerEnter={petEnter}
        onPointerLeave={petLeave}
        onPointerDown={greet}
      >
        <Cat variant="brown" excited={excited} />
        <Cat variant="white" excited={excited} />
        <Cat variant="black" excited={excited} />
        <Cat variant="tux" excited={excited} />
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.names}>{names}</span>
        <span className={styles.note}>{cats.note}</span>
      </figcaption>
      <button
        type="button"
        className={styles.sayHi}
        aria-label={`Say hi to ${cats.brown}, ${cats.white}, ${cats.black} and ${cats.tux}`}
        onClick={greet}
      >
        Say hi
      </button>
    </figure>
  );
}
