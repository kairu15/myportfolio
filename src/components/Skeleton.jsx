/**
 * Skeleton primitives — the shared building blocks behind every loading
 * placeholder on the site.
 *
 * This portfolio ships its content inside the bundle, so placeholders only
 * show at the genuine loading points: while images download and while the
 * code-split case-study and résumé views stream in. Nothing here invents an
 * artificial delay.
 */

import { useEffect, useRef, useState } from 'react';
import styles from './Skeleton.module.css';

export default function Skeleton({ className, style }) {
  return (
    <span
      className={className ? `${styles.box} ${className}` : styles.box}
      style={style}
      aria-hidden="true"
    />
  );
}

/**
 * An <img> with a matching skeleton over it until the browser finishes
 * loading. Because the real image mounts immediately (just faded out), the
 * swap-in is a cross-fade with no layout shift: space is reserved by the
 * caller's classes plus the image's width/height or aspect-ratio.
 *
 * `className`      sizes the wrapper (width, radius, inline context).
 * `imageClassName` passes through to the real <img>.
 * `overlayClassName` tweaks the shimmer (e.g. a minimum height for images
 *                    whose height is unknown until they load).
 * `onError`        forwarded so callers can keep their own error fallbacks.
 */
export function SkeletonImage({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  overlayClassName,
  style,
  imageStyle,
  onError,
  ...imgProps
}) {
  const imgRef = useRef(null);
  // 'loading' | 'loaded' | 'error'
  const [state, setState] = useState('loading');

  // Even with lazy loading, an already-cached image can complete before React
  // attaches the load handler — trust the DOM state once it mounts.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setState('loaded');
    else setState('loading');
  }, [src]);

  return (
    <span
      className={className ? `${styles.imageWrap} ${className}` : styles.imageWrap}
      style={style}
    >
      <img
        ref={imgRef}
        className={`${styles.image} ${imageClassName ?? ''} ${
          state === 'loaded' ? styles.imageReady : ''
        }`}
        src={src}
        alt={state === 'error' ? '' : alt}
        width={width ? String(width) : undefined}
        height={height ? String(height) : undefined}
        style={imageStyle}
        onLoad={() => setState((prev) => (prev === 'error' ? prev : 'loaded'))}
        onError={() => {
          setState('error');
          onError?.(new Error(`Image failed to load: ${src}`));
        }}
        {...imgProps}
      />
      {state !== 'loaded' ? (
        <span
          className={`${styles.box} ${styles.overlay} ${overlayClassName ?? ''} ${
            state === 'error' ? styles.broken : ''
          }`}
          aria-hidden="true"
        />
      ) : null}
    </span>
  );
}
