import { useEffect, useRef, useState } from 'react';
import { cats } from '../data/cats.js';
import styles from './Cats.module.css';

/**
 * Four decorative illustrated cats for the About section — Mocha (brown),
 * Mochi (white), MonMon (black) and PotPot (black-and-white) — sitting under
 * the two dogs. One shared sitting-cat drawing is recoloured per palette, so
 * all four read as the same hand. Drawn as inline SVG: no extra network
 * requests, crisp at every size. Like the dogs they are purely ornamental,
 * animated by Cats.module.css, and the figure's caption and Say-hi button
 * mirror the dogs' behaviour.
 */

const CAT_HEAD =
  'M100 22 C126 22 143 38 143 61 C143 84 124 100 100 100 C76 100 57 84 58 61 C59 38 74 22 100 22 Z';
const CAT_BODY =
  'M100 90 C121 90 134 106 139 129 C144 152 146 175 141 188 C137 199 122 204 100 204 C78 204 63 199 59 188 C54 175 56 152 61 129 C66 106 79 90 100 90 Z';

const PALETTES = {
  brown: {
    fur: ['#e0a56b', '#bd783e', '#8b4f26'],
    head: ['#eab77f', '#c8844b', '#9c5b2a'],
    chest: ['#fff7eb', '#ecd5b6'],
    paw: ['#fff7eb', '#f2e2c8'],
    earInner: ['#a9592c', '#8b4a22'],
    nose: '#3a2a23',
    mouth: '#6b4226',
    whisker: '#6b4226',
    iris: '#d9a441',
    patch: '#7a4520',
    sheen: '#f6cb99',
    tip: '#f2e2c8',
    toes: '#cbaa89',
    eyeR: 6.9,
    mature: true,
    stripes: true,
  },
  white: {
    fur: ['#ffffff', '#f2eee7', '#ded8ce'],
    head: ['#ffffff', '#f6f2ec', '#e0d9cf'],
    chest: ['#ffffff', '#f7f3ec'],
    paw: ['#ffffff', '#efe9e0'],
    earInner: ['#e6b7b3', '#cf9998'],
    nose: '#2a2623',
    mouth: '#4a3d36',
    whisker: '#9a938a',
    iris: '#7fa8c9',
    patch: '#c9c2b7',
    sheen: '#ffffff',
    tip: '#f2eee7',
    toes: '#d5cfc5',
    eyeR: 6.9,
    mature: true,
    outline: '#e7e0d6',
  },
  black: {
    fur: ['#4d4650', '#2c2830', '#16141a'],
    head: ['#565064', '#2e2a34', '#191519'],
    chest: ['#3c3742', '#26222b'],
    paw: ['#3c3742', '#2a2630'],
    earInner: ['#6d5e6e', '#514554'],
    nose: '#1c1a1f',
    mouth: '#0f0d12',
    whisker: '#8b95a4',
    iris: '#e0b054',
    patch: '#565064',
    sheen: '#6a6276',
    tip: '#3c3742',
    toes: '#3c3742',
    eyeR: 6.9,
    mature: true,
    outline: '#4d4650',
  },
  tux: {
    fur: ['#ffffff', '#f2eee7', '#ded8ce'],
    head: ['#ffffff', '#f6f2ec', '#e0d9cf'],
    chest: ['#ffffff', '#f7f3ec'],
    paw: ['#ffffff', '#efe9e0'],
    earInner: ['#e6b7b3', '#cf9998'],
    nose: '#2a2623',
    mouth: '#4a3d36',
    whisker: '#9a938a',
    iris: '#8fb573',
    patch: '#262229',
    sheen: '#ffffff',
    tip: '#f2eee7',
    toes: '#d5cfc5',
    eyeR: 7.8,
    outline: '#e7e0d6',
    blackPatches: true,
    kitten: true,
  },
};

function Cat({ variant, excited = false }) {
  const p = PALETTES[variant];
  const id = `cat-${variant}`;
  const stroke = (width) => (p.outline ? { stroke: p.outline, strokeWidth: width } : {});

  return (
    <svg
      className={`${styles.cat} ${styles[variant]} ${excited ? styles.excited : ''}`}
      viewBox="0 0 200 212"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-fur`} x1="0.2" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor={p.fur[0]} />
          <stop offset="0.45" stopColor={p.fur[1]} />
          <stop offset="1" stopColor={p.fur[2]} />
        </linearGradient>
        <radialGradient id={`${id}-head`} cx="0.36" cy="0.28" r="0.85">
          <stop offset="0" stopColor={p.head[0]} />
          <stop offset="0.55" stopColor={p.head[1]} />
          <stop offset="1" stopColor={p.head[2]} />
        </radialGradient>
        <linearGradient id={`${id}-chest`} x1="0.25" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor={p.chest[0]} />
          <stop offset="1" stopColor={p.chest[1]} />
        </linearGradient>
        <linearGradient id={`${id}-paw`} x1="0.3" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor={p.paw[0]} />
          <stop offset="1" stopColor={p.paw[1]} />
        </linearGradient>
        <linearGradient id={`${id}-ear`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor={p.earInner[0]} />
          <stop offset="1" stopColor={p.earInner[1]} />
        </linearGradient>
        <radialGradient id={`${id}-shadow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#0c0a12" stopOpacity="0.32" />
          <stop offset="1" stopColor="#0c0a12" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-head-clip`}>
          <path d={CAT_HEAD} />
        </clipPath>
        <clipPath id={`${id}-body-clip`}>
          <path d={CAT_BODY} />
        </clipPath>
      </defs>

      <ellipse cx="100" cy="203" rx="62" ry="8.5" fill={`url(#${id}-shadow)`} />

      {/* Tail curled around the front paws, swaying from its attachment. */}
      <g className={styles.tail}>
        <path
          d="M134 162 C156 166 170 180 152 196"
          fill="none"
          stroke={variant === 'tux' ? p.patch : `url(#${id}-fur)`}
          strokeWidth="13.5"
          strokeLinecap="round"
        />
        <circle cx="151" cy="196" r="6.8" fill={p.tip} />
      </g>

      {/* Torso: one group so a single animation drives the breathing */}
      <g className={styles.breath}>
        <path d={CAT_BODY} fill={`url(#${id}-fur)`} {...stroke(1.5)} />
        <ellipse cx="134" cy="156" rx="20" ry="42" fill={p.patch} opacity="0.14" />
        {variant === 'tux' && (
          <g clipPath={`url(#${id}-body-clip)`}>
            <path
              d="M100 90 C84 90 72 98 66 110 C60 121 58 134 60 146 C62 155 69 159 76 155 C83 150 84 139 88 130 C92 120 98 112 104 106 C110 99 108 90 100 90 Z"
              fill={p.patch}
            />
          </g>
        )}
        {variant === 'brown' && (
          <g
            clipPath={`url(#${id}-body-clip)`}
            opacity="0.45"
            fill="none"
            stroke={p.patch}
            strokeWidth="5"
            strokeLinecap="round"
          >
            <path d="M48 140 C60 135 74 135 86 140" />
            <path d="M50 162 C62 157 76 157 88 162" />
          </g>
        )}

        {/* Chest ruff */}
        <path
          d="M100 100 C114 100 124 115 126 133 C128 150 121 163 113 169 C109 172 106 167 100 171 C94 167 91 172 87 169 C79 163 72 150 74 133 C77 115 86 100 100 100 Z"
          fill={`url(#${id}-chest)`}
          opacity="0.94"
        />

        {/* Where the head rests on the chest */}
        <ellipse cx="100" cy="100" rx="34" ry="10" fill={p.patch} opacity="0.15" />

        {/* Front legs — grouped so the paws can knead while greeting. The
            kitten keeps one paw raised off the ground: a permanent playful
            pose, pivoting outward from the shoulder. */}
        <g className={styles.legs}>
          <rect x="80" y="150" width="19" height="50" rx="9.5" fill={`url(#${id}-fur)`} />
          <ellipse cx="89.5" cy="198" rx="11" ry="7.5" fill={`url(#${id}-paw)`} />
          <path
            d="M86 195 v5 M92 195 v5"
            stroke={p.toes}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.75"
          />
          <g transform={variant === 'tux' ? 'rotate(-12 110.5 153)' : undefined}>
            <rect x="101" y="150" width="19" height="50" rx="9.5" fill={`url(#${id}-fur)`} />
            <ellipse cx="110.5" cy="198" rx="11" ry="7.5" fill={`url(#${id}-paw)`} />
            <path
              d="M107 195 v5 M113 195 v5"
              stroke={p.toes}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.75"
            />
          </g>
        </g>
      </g>

      {/* Head. The kitten (tux) carries a bigger head-to-body ratio — the inner
          group scales it up around the neck — and a more pronounced curious
          tilt; the CSS tilt animation overrides the static pose when motion is
          allowed, using the same base angle via --tilt-base. */}
      <g
        className={styles.head}
        transform={variant === 'tux' ? 'rotate(-7 100 88)' : 'rotate(-2 100 88)'}
      >
        <g
          transform={
            variant === 'tux'
              ? 'translate(100 92) scale(1.07) translate(-100 -92)'
              : undefined
          }
        >
        <g className={styles.earL}>
          <path
            d="M62 48 C55 30 61 11 73 10 C84 9 92 25 93 39 C93 45 91 50 87 53 C78 46 70 45 62 48 Z"
            fill={`url(#${id}-fur)`}
            {...stroke(1.4)}
          />
          <path
            d="M69 40 C67 28 71 18 77 17 C83 17 88 26 89 35 C89 39 87 43 84 46 C78 42 73 41 69 40 Z"
            fill={`url(#${id}-ear)`}
          />
        </g>
        <g className={styles.earR}>
          <path
            d="M138 48 C145 30 139 11 127 10 C116 9 108 25 107 39 C107 45 109 50 113 53 C122 46 130 45 138 48 Z"
            fill={`url(#${id}-fur)`}
            {...stroke(1.4)}
          />
          <path
            d="M131 40 C133 28 129 18 123 17 C117 17 112 26 111 35 C111 39 113 43 116 46 C122 42 127 41 131 40 Z"
            fill={`url(#${id}-ear)`}
          />
        </g>

        {/* Head */}
        <path d={CAT_HEAD} fill={`url(#${id}-head)`} {...stroke(1.5)} />

        <g clipPath={`url(#${id}-head-clip)`}>
          {/* Crown sheen and a soft chin shadow for volume */}
          <ellipse
            cx="90"
            cy="34"
            rx="20"
            ry="11"
            fill={p.sheen}
            opacity="0.3"
            transform="rotate(-18 90 34)"
          />
          <ellipse cx="100" cy="94" rx="31" ry="8" fill={p.patch} opacity="0.12" />
          {variant === 'tux' && (
            <path
              d="M58 44 C58 30 74 18 92 20 C104 21 112 26 111 32 C110 38 100 36 90 38 C78 40 68 44 63 48 C60 48 58 46 58 44 Z"
              fill={p.patch}
            />
          )}
          {variant === 'black' && (
            <path
              d="M64 50 C66 40 76 32 88 31 C98 30 108 32 114 36 C106 34 92 34 80 38 C72 41 67 46 64 50 Z"
              fill={p.sheen}
              opacity="0.4"
            />
          )}
          {variant === 'brown' && (
            <g opacity="0.5" fill="none" stroke={p.patch} strokeWidth="4" strokeLinecap="round">
              <path d="M78 28 C82 24 88 22 94 23" />
              <path d="M100 24 C106 24 112 26 116 30" />
            </g>
          )}
        </g>

        {/* Whiskers, grouped per side so they can wiggle while greeting */}
        <g className={styles.whiskersL}>
          <path d="M64 61 C54 57 45 56 37 58" fill="none" stroke={p.whisker} strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
          <path d="M64 66 C54 66 44 68 36 71" fill="none" stroke={p.whisker} strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
          <path d="M64 71 C55 75 47 80 41 86" fill="none" stroke={p.whisker} strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
        </g>
        <g className={styles.whiskersR}>
          <path d="M136 61 C146 57 155 56 163 58" fill="none" stroke={p.whisker} strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
          <path d="M136 66 C146 66 156 68 164 71" fill="none" stroke={p.whisker} strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
          <path d="M136 71 C145 75 153 80 159 86" fill="none" stroke={p.whisker} strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
        </g>

        {/* Cheek fluff — a mature-cat cue the kitten does not have yet */}
        {p.mature && (
          <>
            <path
              d="M60 72 C54 78 51 87 54 94 C57 87 62 84 67 85 C63 81 61 76 60 72 Z"
              fill={`url(#${id}-head)`}
            />
            <path
              d="M140 72 C146 78 149 87 146 94 C143 87 138 84 133 85 C137 81 139 76 140 72 Z"
              fill={`url(#${id}-head)`}
            />
          </>
        )}

        {/* Muzzle */}
        <ellipse cx="100" cy="75" rx="21" ry="13" fill={`url(#${id}-chest)`} />
        <ellipse cx="100" cy="60" rx="12" ry="8" fill={p.patch} opacity="0.18" />

        {/* Nose */}
        <path
          d="M94 63 C94 58 106 58 106 63 C106 68 103 71.5 100 71.5 C97 71.5 94 68 94 63 Z"
          fill={p.nose}
        />
        <ellipse cx="97" cy="61.5" rx="3" ry="1.6" fill="#ffffff" opacity="0.45" />

        {/* Mouth: a resting ω smile replaced by an open meow while greeting */}
        <g className={styles.mouthRest}>
          <path d="M100 71 V76" stroke={p.mouth} strokeWidth="2.3" strokeLinecap="round" />
          <path
            d="M100 76 C97 82 89 82 86 75"
            fill="none"
            stroke={p.mouth}
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <path
            d="M100 76 C103 82 111 82 114 75"
            fill="none"
            stroke={p.mouth}
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </g>
        <g className={styles.mouthMeow}>
          <path d="M91 73 C94 77 106 77 109 73 C110 86 90 86 91 73 Z" fill="#3d2b28" />
          <path d="M96 81 C98 84.5 102 84.5 104 81 C101.5 79.5 98.5 79.5 96 81 Z" fill="#e88f97" />
        </g>

        {/* Eyes — grouped so the pair can blink together; slit pupils for the
            cat look, iris coloured per cat. The kitten's eyes are larger for a
            young, wide-eyed look. */}
        <g className={styles.eyes}>
          <circle cx="86" cy="53" r={p.eyeR} fill={p.iris} />
          <circle cx="114" cy="53" r={p.eyeR} fill={p.iris} />
          <ellipse cx="86" cy="53" rx={p.eyeR * 0.33} ry={p.eyeR * 0.81} fill="#1c1a1f" />
          <ellipse cx="114" cy="53" rx={p.eyeR * 0.33} ry={p.eyeR * 0.81} fill="#1c1a1f" />
          <circle cx={86 - p.eyeR * 0.35} cy={53 - p.eyeR * 0.46} r={p.eyeR * 0.33} fill="#ffffff" opacity="0.9" />
          <circle cx={114 - p.eyeR * 0.35} cy={53 - p.eyeR * 0.46} r={p.eyeR * 0.33} fill="#ffffff" opacity="0.9" />
          <circle cx={86 + p.eyeR * 0.36} cy={53 + p.eyeR * 0.58} r={p.eyeR * 0.17} fill="#ffffff" opacity="0.4" />
          <circle cx={114 + p.eyeR * 0.36} cy={53 + p.eyeR * 0.58} r={p.eyeR * 0.17} fill="#ffffff" opacity="0.4" />
        </g>
        </g>
      </g>
    </svg>
  );
}

export default function Cats() {
  const [hovered, setHovered] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Same interaction model as the dogs: the Say-hi button greets on click
  // (and tap) for a fixed while; hovering the button previews the reaction.
  const greet = () => {
    clearTimeout(timer.current);
    setGreeting(true);
    timer.current = setTimeout(() => setGreeting(false), 2600);
  };

  const excited = hovered || greeting;
  const names = `${cats.brown}, ${cats.white}, ${cats.black} & ${cats.tux}`;

  return (
    <figure className={styles.clowderWrap}>
      <div className={styles.clowder}>
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
        onPointerEnter={(event) => {
          if (event.pointerType !== 'touch') setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
      >
        Say hi
      </button>
    </figure>
  );
}
