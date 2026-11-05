import { useEffect, useRef, useState } from 'react';
import { pets } from '../data/pets.js';
import PixelPet from './PixelPet.jsx';
import styles from './Pets.module.css';

/**
 * Two retro pixel-art companions for the About section: Dumbo (brown) and
 * Joy (white with a black saddle). Both are the same standing side-view dog
 * drawn as character-map sprite layers — tail, body, patches, head, ear and
 * eye — recoloured per palette, facing right so the pair looks toward the
 * cats across the companions row. Rendered by PixelPet.jsx; every motion
 * lives in Pets.module.css and targets the sprite's [data-part] groups.
 */

const DOG_SPRITE = {
  width: 32,
  height: 23,
  parts: [
    {
      // Raised, slightly curved tail with an accent tip; wags from the base.
      name: 'tail',
      origin: [8, 10],
      map: [
        '...ggg..........................',
        '..ggTTTT........................',
        '..TTTTT.........................',
        '..TTTT..........................',
        '..TTTT..........................',
        '...TTTT.........................',
        '...TTTT.........................',
        '....TTTT........................',
        '....TTTT........................',
        '.....TTT........................',
      ],
    },
    {
      // Torso, four legs and paws, plus the ground shadow row.
      name: 'body',
      map: [
        '........bbbbbbbbbbbbbbbb........',
        '......bbbbbbbbbbbbbbbbbbb.......',
        '.....bbbbbbbbbbbbbbbbbbbbbb.....',
        '.....bbbbbbbbbbbbbbbbbbbbbb.....',
        '.....bbbbbbbbbbbbbbbbhhhhbb.....',
        '.....bbbbbbbbbbbbbbbbhhhhbb.....',
        '......bbbbbbbbbbbbbhhhhbb.......',
        '......bbbbbbbbbbbbbbbbbb........',
        '.......bbbbbbbbbbbbbbbb.........',
        '.......bb..bb....bb..bb.........',
        '.......bb..bb....bb..bb.........',
        '.......bbb.bbb...bbb.bbb........',
        '.......ppp.ppp...ppp.ppp........',
        '......dddddddddddddddddddd......',
      ],
    },
    {
      // Optional breed marking over the back (Joy's black saddle + brow patch).
      name: 'patches',
      map: [],
    },
    {
      // Head sitting into the shoulder line (top at y4, overlapping the body's
      // front) with a light muzzle protruding and the nose at its tip. The
      // leading empty rows position the head on the grid; it bobs from the
      // neck.
      name: 'head',
      origin: [20, 10],
      map: [
        '................................',
        '................................',
        '................................',
        '................................',
        '.........................bbbb...',
        '........................bbbbbbb.',
        '........................bbbbbbb.',
        '........................bbbbbhhh',
        '........................bbbbbhhn',
        '........................bbbbbb..',
        '........................bbbb....',
      ],
    },
    {
      // Floppy ear draped over the side of the head; swings from its top.
      name: 'ear',
      origin: [27, 5],
      map: [
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '..........................ss....',
        '..........................sss...',
        '..........................sss...',
        '..........................sss...',
      ],
    },
    {
      // Side-view eye with a one-pixel shine; blinks by squashing shut.
      name: 'eye',
      origin: [25, 8],
      map: [
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '................................',
        '........................wn......',
        '........................nn......',
      ],
    },
  ],
};

// Joy's markings: a saddle across the shoulders (the black ear and tail tip
// come from the palette's shade/tail-tip colours).
const DOG_MONO_PATCHES = [
  '..........kkkkkkk...............',
  '........kkkkkkkkkk..............',
  '........kkkkkkkkkk..............',
  '.........kkkkkkkk...............',
  '..........kkkkk.................',
];

const DOG_PALETTES = {
  brown: {
    b: '#c8844b',
    s: '#8b4f26',
    h: '#fff7eb',
    p: '#cbaa89',
    n: '#3a2a23',
    w: '#ffffff',
    T: '#b26d36',
    g: '#f2e2c8',
    k: '#262229',
    d: 'rgba(35, 26, 16, 0.28)',
  },
  mono: {
    b: '#f2eee7',
    s: '#262229',
    h: '#ffffff',
    p: '#d5cec3',
    n: '#2a2623',
    w: '#ffffff',
    T: '#e3dcd2',
    g: '#262229',
    k: '#262229',
    d: 'rgba(20, 20, 24, 0.26)',
  },
};

function Dog({ variant, excited = false }) {
  const sprite =
    variant === 'mono'
      ? { ...DOG_SPRITE, parts: DOG_SPRITE.parts.map((part) => (part.name === 'patches' ? { ...part, map: DOG_MONO_PATCHES } : part)) }
      : DOG_SPRITE;
  return (
    <PixelPet
      sprite={sprite}
      palette={DOG_PALETTES[variant]}
      className={`${styles.dog} ${styles[variant]} ${excited ? styles.excited : ''}`}
    />
  );
}

export default function Pets() {
  const [hovered, setHovered] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const timer = useRef(null);
  const leaveTimer = useRef(null);

  useEffect(() => () => {
    clearTimeout(timer.current);
    clearTimeout(leaveTimer.current);
  }, []);

  // Click (and tap) keeps the greeting going on its own for a fixed while.
  const greet = () => {
    clearTimeout(timer.current);
    setGreeting(true);
    timer.current = setTimeout(() => setGreeting(false), 2600);
  };

  // Hovering either dog excites them. The leave is debounced so crossing the
  // small gap between the two sprites doesn't reset the wag mid-wag.
  const petEnter = (event) => {
    clearTimeout(leaveTimer.current);
    if (event.pointerType !== 'touch') setHovered(true);
  };

  const petLeave = () => {
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHovered(false), 140);
  };

  const excited = hovered || greeting;

  return (
    <figure className={styles.companions}>
      <div
        className={styles.pair}
        onPointerEnter={petEnter}
        onPointerLeave={petLeave}
        onPointerDown={greet}
      >
        <Dog variant="brown" excited={excited} />
        <Dog variant="mono" excited={excited} />
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.names}>
          {pets.brown} &amp; {pets.mono}
        </span>
        <span className={styles.note}>{pets.note}</span>
      </figcaption>
      <button
        type="button"
        className={styles.sayHi}
        aria-label={`Say hi to ${pets.brown} and ${pets.mono}`}
        onClick={greet}
      >
        Say hi
      </button>
    </figure>
  );
}
