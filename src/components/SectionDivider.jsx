/**
 * The dotted-horizon boundary rendered at the top of every section: a thin
 * rule with scattered dots of varying size and opacity, echoing the site's
 * dotted backdrop. Purely decorative — hidden from assistive tech and static
 * (no animation), so it costs nothing under reduced motion.
 *
 * The dots are a fixed hand-placed array rather than Math.random(), so every
 * render — and both StrictMode passes — draws the identical horizon.
 * `preserveAspectRatio: slice` keeps the centre anchored and crops the sparse
 * edges on narrow screens.
 */
import styles from './Section.module.css';

const LINE_Y = 28;

// [cx, cy, r, opacity] — looser at the edges, denser mid-band, a few larger
// bright dots like the reference.
const DOTS = [
  [30, 40, 2.4, 0.3],
  [95, 14, 1.6, 0.22],
  [150, 36, 3.2, 0.5],
  [205, 22, 1.4, 0.25],
  [262, 42, 2.2, 0.4],
  [318, 12, 1.8, 0.3],
  [368, 30, 4.2, 0.75],
  [415, 44, 1.6, 0.3],
  [462, 18, 2.6, 0.55],
  [510, 34, 1.4, 0.28],
  [556, 26, 3.4, 0.65],
  [604, 46, 1.8, 0.3],
  [648, 14, 1.4, 0.22],
  [692, 32, 2.4, 0.5],
  [740, 22, 4.4, 0.8],
  [788, 44, 1.6, 0.3],
  [832, 16, 2.8, 0.6],
  [876, 36, 1.4, 0.26],
  [918, 26, 3.6, 0.7],
  [964, 42, 1.8, 0.3],
  [1006, 12, 1.6, 0.24],
  [1046, 30, 2.6, 0.55],
  [1090, 44, 1.4, 0.28],
  [1130, 20, 4, 0.75],
  [1176, 36, 1.6, 0.3],
  [1218, 28, 2.4, 0.5],
  [1262, 46, 1.4, 0.24],
  [1304, 16, 2, 0.35],
  [1344, 34, 1.4, 0.26],
  [1386, 24, 2.8, 0.45],
  [1428, 40, 1.6, 0.3],
];

export default function SectionDivider() {
  return (
    <svg
      className={styles.divider}
      viewBox="0 0 1440 56"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <line className={styles.dividerLine} x1="0" y1={LINE_Y} x2="1440" y2={LINE_Y} />
      {DOTS.map(([cx, cy, r, opacity], index) => (
        <circle key={index} className={styles.dividerDot} cx={cx} cy={cy} r={r} opacity={opacity} />
      ))}
    </svg>
  );
}
