import MicroSlats from './MicroSlats.jsx';
import PatternWaves from './PatternWaves.jsx';
import { getPatternInk } from './patternTheme.js';
import styles from './Background.module.css';

/**
 * The single background surface for the whole site. Only one backdrop is
 * mounted at a time, so the page always owns exactly one WebGL context no
 * matter which option is selected. "dots" and "plain" need no canvas: the
 * dotted pattern is CSS on the body, and plain is the page background itself.
 */
export default function Background({ appearance }) {
  const kind = appearance?.backdrop ?? 'waves';
  const isDark = (appearance?.theme ?? 'light') === 'dark';
  const ink = getPatternInk(appearance);

  if (kind !== 'waves' && kind !== 'slats') return null;

  return (
    <div
      className={`${styles.layer} ${kind === 'slats' ? styles.slats : ''}`.trim()}
      aria-hidden="true"
      data-backdrop={kind}
    >
      {kind === 'slats' ? (
        <MicroSlats
          preset="tide"
          color={ink}
          glintColor="#ffffff"
          backgroundColor="transparent"
          slatWidth={7}
          slatHeight={16}
          gap={11}
          roundness={0.9}
          speed={0.4}
          scale={1.35}
          direction={262}
          chop={0.35}
          stretch={0.18}
          glint={0.6}
          contrast={1.15}
          perspective={0.45}
          fog={0.55}
          interactive
          cursorStrength={0.9}
          cursorSize={45}
          swirl={0.35}
          trail={1.6}
          lean={0.25}
        />
      ) : (
        <PatternWaves
          preset="silk"
          color={ink}
          backgroundColor="transparent"
          spacing={18}
          markSize={0.45}
          depth={0.9}
          shine={0.85}
          contrast={1.2}
          speed={0.22}
          scale={1.15}
          fade="edges"
          fadeSize={0.65}
          opacity={isDark ? 0.3 : 0.2}
          interactive
          cursorSize={60}
          cursorStrength={0.45}
        />
      )}
    </div>
  );
}
