import { useEffect, useRef, useState } from 'react';
import { pets } from '../data/pets.js';
import styles from './Pets.module.css';

/**
 * Two decorative illustrated companions for the About section: a fluffy brown
 * dog and a black-and-white dog. Drawn as inline SVG so they inherit no extra
 * network requests and stay crisp at every size. Both are purely ornamental,
 * so the wrapper is hidden from assistive technology.
 */

const brownHead =
  'M104 12 C130 12 148 29 149 53 C150 79 131 98 104 98 C77 98 58 79 59 53 C60 29 78 12 104 12 Z';
const monoHead =
  'M100 16 C124 16 141 32 142 55 C143 79 125 97 100 97 C75 97 57 79 58 55 C59 32 76 16 100 16 Z';
const monoBody =
  'M100 90 C120 90 133 106 138 130 C143 154 145 176 140 190 C136 200 122 204 100 204 C78 204 64 200 60 190 C55 176 57 154 62 130 C67 106 80 90 100 90 Z';

function BrownDog({ excited = false }) {
  return (
    <svg
      className={`${styles.dog} ${styles.brown} ${excited ? styles.excited : ''}`}
      viewBox="0 0 210 224"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="pet-brown-fur" x1="0.2" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#dd9f64" />
          <stop offset="0.45" stopColor="#bd783e" />
          <stop offset="1" stopColor="#8b4f26" />
        </linearGradient>
        <radialGradient id="pet-brown-head" cx="0.36" cy="0.3" r="0.82">
          <stop offset="0" stopColor="#eab77f" />
          <stop offset="0.55" stopColor="#c8844b" />
          <stop offset="1" stopColor="#9c5b2a" />
        </radialGradient>
        <linearGradient id="pet-brown-cream" x1="0.25" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#fff7eb" />
          <stop offset="1" stopColor="#ecd5b6" />
        </linearGradient>
        <linearGradient id="pet-brown-ear" x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#b26d36" />
          <stop offset="1" stopColor="#7a4520" />
        </linearGradient>
        <linearGradient id="pet-brown-leg" x1="0.3" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#dd9f64" />
          <stop offset="1" stopColor="#ab6730" />
        </linearGradient>
        <radialGradient id="pet-brown-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#231a10" stopOpacity="0.32" />
          <stop offset="1" stopColor="#231a10" stopOpacity="0" />
        </radialGradient>
        <clipPath id="pet-brown-head-clip">
          <path d={brownHead} />
        </clipPath>
      </defs>

      <ellipse cx="105" cy="209" rx="70" ry="9" fill="url(#pet-brown-shadow)" />

      {/* Tail, tucked behind the body, with a cream tip. */}
      <g className={styles.tailBrown}>
        <path
          d="M147 172 C168 165 182 178 175 194"
          fill="none"
          stroke="url(#pet-brown-fur)"
          strokeWidth="17"
          strokeLinecap="round"
        />
        <circle cx="171" cy="193" r="9.5" fill="url(#pet-brown-cream)" />
      </g>

      {/* Torso: one group so a single animation drives the breathing */}
      <g className={styles.breathBrown}>
        {/* Body */}
        <path
          d="M104 88 C125 88 139 105 144 129 C149 153 152 177 146 191 C142 202 127 206 104 206 C81 206 66 202 62 191 C56 177 59 153 64 129 C69 105 83 88 104 88 Z"
          fill="url(#pet-brown-fur)"
        />
        {/* Soft volume on the shaded side of the body */}
        <ellipse cx="136" cy="160" rx="22" ry="44" fill="#7d4823" opacity="0.14" />

        {/* Chest ruff */}
        <path
          d="M104 102 C118 102 127 118 129 137 C131 155 123 168 115 174 C111 177 108 172 104 176 C100 172 97 177 93 174 C85 168 77 155 79 137 C81 118 90 102 104 102 Z"
          fill="url(#pet-brown-cream)"
          opacity="0.94"
        />

        {/* Where the head rests on the chest */}
        <ellipse cx="104" cy="102" rx="36" ry="11" fill="#7a4522" opacity="0.15" />

        {/* Front legs — grouped so the paws can shift while greeting */}
        <g className={styles.legsBrown}>
          <rect x="81" y="150" width="19" height="48" rx="9.5" fill="url(#pet-brown-leg)" />
          <rect x="108" y="150" width="19" height="48" rx="9.5" fill="url(#pet-brown-leg)" />
          <ellipse cx="90.5" cy="195" rx="11.5" ry="8" fill="url(#pet-brown-cream)" />
          <ellipse cx="117.5" cy="195" rx="11.5" ry="8" fill="url(#pet-brown-cream)" />
          <path
            d="M87 192 v5 M93 192 v5 M114 192 v5 M120 192 v5"
            stroke="#cbaa89"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.75"
          />
        </g>
      </g>

      <g className={styles.headBrown} transform="rotate(-3 104 90)">
        {/* Ears, drawn before the head so it overlaps their inner edge. Each is a
            group so it can pivot from its attachment on hover. */}
        <g className={styles.earBrownLeft}>
          <path
            d="M70 22 C56 22 44 32 43 50 C42 68 47 86 55 95 C60 100 66 96 64 89 C60 74 61 52 70 36 Z"
            fill="url(#pet-brown-ear)"
          />
          <path
            d="M66 34 C56 35 49 44 49 56 C49 68 52 80 57 87 C59 82 57 70 57 58 C57 47 60 40 66 34 Z"
            fill="#8b4a22"
            opacity="0.55"
          />
        </g>
        <g className={styles.earBrownRight}>
          <path
            d="M138 22 C152 22 164 32 165 50 C166 68 161 86 153 95 C148 100 142 96 144 89 C148 74 147 52 138 36 Z"
            fill="url(#pet-brown-ear)"
          />
          <path
            d="M142 34 C152 35 159 44 159 56 C159 68 156 80 151 87 C149 82 151 70 151 58 C151 47 148 40 142 34 Z"
            fill="#8b4a22"
            opacity="0.55"
          />
        </g>

        {/* Head */}
        <path d={brownHead} fill="url(#pet-brown-head)" />

        <g clipPath="url(#pet-brown-head-clip)">
          {/* Crown sheen and a soft chin shadow for volume */}
          <ellipse
            cx="92"
            cy="32"
            rx="21"
            ry="12"
            fill="#f6cb99"
            opacity="0.28"
            transform="rotate(-18 92 32)"
          />
          <ellipse cx="104" cy="92" rx="34" ry="10" fill="#6d3d1c" opacity="0.12" />
        </g>

        {/* Muzzle */}
        <ellipse cx="104" cy="74" rx="27" ry="18.5" fill="url(#pet-brown-cream)" />
        <ellipse cx="104" cy="60" rx="13" ry="9" fill="#d99a63" opacity="0.22" />

        {/* Nose */}
        <path
          d="M95 64 C95 58 113 58 113 64 C113 69 108 73 104 73 C100 73 95 69 95 64 Z"
          fill="#3a2a23"
        />
        <ellipse cx="99" cy="62.5" rx="3.4" ry="1.8" fill="#ffffff" opacity="0.5" />

        {/* Mouth: a resting smile replaced by an open bark while greeting */}
        <g className={styles.mouthBrownRest}>
          <path d="M104 73 V79" stroke="#6b4226" strokeWidth="2.6" strokeLinecap="round" />
          <path
            d="M104 79 C100 86 90 86 87 78"
            fill="none"
            stroke="#6b4226"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M104 79 C108 86 118 86 121 78"
            fill="none"
            stroke="#6b4226"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>
        <g className={styles.mouthBrownBark}>
          <path d="M95 76 C98 80 110 80 113 76 C113 89 95 89 95 76 Z" fill="#5a2f2a" />
          <path d="M99 84 C101 88 107 88 109 84 C106 82 102 82 99 84 Z" fill="#e88f97" />
        </g>

        {/* Eyes — grouped so the pair can blink together */}
        <g className={styles.eyesBrown}>
          <ellipse cx="88" cy="52" rx="8" ry="9.2" fill="#33241c" />
          <ellipse cx="120" cy="52" rx="8" ry="9.2" fill="#33241c" />
          <circle cx="85.5" cy="48.8" r="2.7" fill="#ffffff" opacity="0.88" />
          <circle cx="117.5" cy="48.8" r="2.7" fill="#ffffff" opacity="0.88" />
          <circle cx="90.5" cy="56" r="1.4" fill="#ffffff" opacity="0.4" />
          <circle cx="122.5" cy="56" r="1.4" fill="#ffffff" opacity="0.4" />
        </g>

        {/* Brows and crown fur */}
        <path
          d="M81 41 C85 38 91 38 95 40"
          fill="none"
          stroke="#7e4a24"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M113 40 C117 38 123 38 127 41"
          fill="none"
          stroke="#7e4a24"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M84 22 C89 18 95 17 100 19"
          fill="none"
          stroke="#f6cb99"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.45"
        />
      </g>
    </svg>
  );
}

function MonoDog({ excited = false }) {
  return (
    <svg
      className={`${styles.dog} ${styles.mono} ${excited ? styles.excited : ''}`}
      viewBox="0 0 200 212"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="pet-mono-white" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#f2eee7" />
          <stop offset="1" stopColor="#ded8ce" />
        </linearGradient>
        <linearGradient id="pet-mono-paw" x1="0.3" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#efe9e0" />
        </linearGradient>
        <linearGradient id="pet-mono-black" x1="0.25" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#3a3540" />
          <stop offset="0.5" stopColor="#262229" />
          <stop offset="1" stopColor="#16141a" />
        </linearGradient>
        <radialGradient id="pet-mono-head" cx="0.36" cy="0.28" r="0.85">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#f6f2ec" />
          <stop offset="1" stopColor="#e0d9cf" />
        </radialGradient>
        <linearGradient id="pet-mono-inner-ear" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#e6b7b3" />
          <stop offset="1" stopColor="#cf9998" />
        </linearGradient>
        <radialGradient id="pet-mono-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#1a1a1a" stopOpacity="0.3" />
          <stop offset="1" stopColor="#1a1a1a" stopOpacity="0" />
        </radialGradient>
        <clipPath id="pet-mono-body-clip">
          <path d={monoBody} />
        </clipPath>
        <clipPath id="pet-mono-head-clip">
          <path d={monoHead} />
        </clipPath>
      </defs>

      <ellipse cx="100" cy="205" rx="64" ry="8.5" fill="url(#pet-mono-shadow)" />

      {/* Tail with a black tip */}
      <g className={styles.tailMono}>
        <path
          d="M139 170 C159 164 172 177 167 191"
          fill="none"
          stroke="#ffffff"
          strokeWidth="15.5"
          strokeLinecap="round"
        />
        <path
          d="M139 170 C159 164 172 177 167 191"
          fill="none"
          stroke="#e2dbd1"
          strokeWidth="16.5"
          strokeLinecap="round"
          opacity="0.35"
        />
        <circle cx="165" cy="191" r="8.5" fill="url(#pet-mono-black)" />
      </g>

      {/* Torso: one group so a single animation drives the breathing */}
      <g className={styles.breathMono}>
        {/* Body with a black saddle across the shoulders */}
        <path d={monoBody} fill="url(#pet-mono-white)" stroke="#e7e0d6" strokeWidth="1.4" />
        <g clipPath="url(#pet-mono-body-clip)">
          <path
            d="M98 92 C84 92 72 100 66 112 C61 122 59 134 60 146 C62 154 68 158 74 154 C81 149 82 138 86 129 C90 119 96 111 102 105 C108 99 106 92 98 92 Z"
            fill="url(#pet-mono-black)"
          />
        </g>

        {/* Chest ruff */}
        <path
          d="M100 102 C113 102 122 118 124 137 C126 154 119 166 111 172 C107 175 104 170 100 174 C96 170 93 175 89 172 C81 166 74 154 76 137 C78 118 87 102 100 102 Z"
          fill="#ffffff"
          opacity="0.75"
        />

        {/* Front legs — grouped so the paws can shift while greeting */}
        <g className={styles.legsMono}>
          <rect x="79" y="148" width="20" height="50" rx="9.5" fill="url(#pet-mono-white)" />
          <rect x="101" y="148" width="20" height="50" rx="9.5" fill="url(#pet-mono-white)" />
          <ellipse cx="87" cy="195" rx="11" ry="7.5" fill="url(#pet-mono-paw)" />
          <ellipse cx="113" cy="195" rx="11" ry="7.5" fill="url(#pet-mono-paw)" />
          <path
            d="M84 192 v5 M90 192 v5 M110 192 v5 M116 192 v5"
            stroke="#d5cfc5"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.9"
          />
        </g>
      </g>

      <g className={styles.headMono} transform="rotate(4 100 88)">
        {/* Black ear on one side, white ear with a pink inner surface on the other */}
        <g className={styles.earMonoLeft}>
          <path
            d="M66 24 C52 24 40 34 39 52 C38 70 43 87 51 96 C56 101 62 97 60 90 C56 75 57 53 66 37 Z"
            fill="url(#pet-mono-black)"
          />
          <path
            d="M62 37 C54 38 48 46 48 57 C48 68 51 80 56 88 C58 83 56 71 56 60 C56 49 58 43 62 37 Z"
            fill="#4d4650"
            opacity="0.75"
          />
        </g>
        <g className={styles.earMonoRight}>
          <path
            d="M134 24 C148 24 160 34 161 52 C162 70 157 87 149 96 C144 101 138 97 140 90 C146 75 145 53 136 37 Z"
            fill="url(#pet-mono-white)"
            stroke="#e4ddd3"
            strokeWidth="1.4"
          />
          <path
            d="M138 38 C148 39 155 47 155 58 C155 70 152 81 147 88 C145 83 147 71 147 59 C147 48 144 42 138 38 Z"
            fill="url(#pet-mono-inner-ear)"
          />
        </g>

        {/* Head */}
        <path d={monoHead} fill="url(#pet-mono-head)" />

        <g clipPath="url(#pet-mono-head-clip)">
          {/* Ambient shading so the white head keeps its volume */}
          <ellipse cx="100" cy="92" rx="31" ry="8" fill="#c9c2b7" opacity="0.22" />
          <ellipse cx="126" cy="72" rx="16" ry="12" fill="#d6cfc4" opacity="0.25" />
          <ellipse
            cx="86"
            cy="30"
            rx="18"
            ry="10"
            fill="#ffffff"
            opacity="0.3"
            transform="rotate(-18 86 30)"
          />
          {/* Patch over the brow, growing out of the black ear */}
          <path
            d="M58 40 C60 30 72 22 85 22 C93 22 99 26 98 31 C97 37 90 40 82 41 C74 42 66 44 61 45 C59 44 58 42 58 40 Z"
            fill="url(#pet-mono-black)"
          />
        </g>

        {/* Cheek fluff */}
        <path
          d="M60 70 C54 76 51 85 54 93 C57 86 62 83 67 84 C63 80 61 76 60 70 Z"
          fill="url(#pet-mono-head)"
        />
        <path
          d="M140 70 C146 76 149 85 146 93 C143 86 138 83 133 84 C137 80 139 76 140 70 Z"
          fill="url(#pet-mono-head)"
        />

        {/* Muzzle, kept readable on the white face with a soft rim and shading */}
        <ellipse
          cx="100"
          cy="74"
          rx="25"
          ry="17"
          fill="#ffffff"
          stroke="#e7e0d6"
          strokeWidth="1.4"
        />
        <ellipse cx="100" cy="87" rx="19" ry="6" fill="#ddd6cb" opacity="0.35" />
        <ellipse cx="100" cy="60" rx="12" ry="8" fill="#ded7cc" opacity="0.3" />

        {/* Nose */}
        <path
          d="M92 64 C92 58 108 58 108 64 C108 69 104 73 100 73 C96 73 92 69 92 64 Z"
          fill="#2a2623"
        />
        <ellipse cx="95.5" cy="62.5" rx="3.1" ry="1.7" fill="#ffffff" opacity="0.5" />

        {/* Mouth: resting smile and tongue replaced by an open bark */}
        <g className={styles.mouthMonoRest}>
          <path d="M100 73 V78" stroke="#4a3d36" strokeWidth="2.4" strokeLinecap="round" />
          <path
            d="M100 78 C97 84 88 84 85 77"
            fill="none"
            stroke="#4a3d36"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M100 78 C103 84 112 84 115 77"
            fill="none"
            stroke="#4a3d36"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path d="M94 81 C94 89 106 89 106 81 C106 78 94 78 94 81 Z" fill="#e88f97" />
          <path d="M100 80 V85" stroke="#cf737c" strokeWidth="1.4" strokeLinecap="round" />
        </g>
        <g className={styles.mouthMonoBark}>
          <path d="M91 76 C94 80 106 80 109 76 C109 89 91 89 91 76 Z" fill="#5a2f2a" />
          <path d="M96 84 C98 88 102 88 104 84 C101 82 99 82 96 84 Z" fill="#e88f97" />
        </g>

        {/* Eyes — grouped so the pair can blink together */}
        <g className={styles.eyesMono}>
          <ellipse cx="85" cy="54" rx="7.8" ry="9" fill="#2c2622" />
          <ellipse cx="115" cy="54" rx="7.8" ry="9" fill="#2c2622" />
          <circle cx="82.6" cy="50.8" r="2.6" fill="#ffffff" opacity="0.9" />
          <circle cx="112.6" cy="50.8" r="2.6" fill="#ffffff" opacity="0.9" />
          <circle cx="87.4" cy="58" r="1.3" fill="#ffffff" opacity="0.4" />
          <circle cx="117.4" cy="58" r="1.3" fill="#ffffff" opacity="0.4" />
        </g>
        <path
          d="M78 44 C82 41 88 41 92 43"
          fill="none"
          stroke="#6f6a64"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d="M108 43 C112 41 118 41 122 44"
          fill="none"
          stroke="#6f6a64"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.4"
        />
      </g>
    </svg>
  );
}

export default function Pets() {
  const [hovered, setHovered] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Click (and tap) keeps the greeting going on its own; hover only lasts while
  // the pointer is on the button. Restarting a click cancels the old timer.
  const greet = () => {
    clearTimeout(timer.current);
    setGreeting(true);
    timer.current = setTimeout(() => setGreeting(false), 2600);
  };

  return (
    <figure className={styles.companions}>
      <div className={styles.pair}>
        <BrownDog excited={hovered || greeting} />
        <MonoDog excited={hovered || greeting} />
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
