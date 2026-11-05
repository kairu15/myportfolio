import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TOUR_STEPS } from '../hooks/useTour.js';
import styles from './TourOverlay.module.css';

const SPOT_PAD = 10;
const CARD_MARGIN = 16;
const MOBILE_BREAKPOINT = 640;

/**
 * Shrinks an element's rect to the interesting part: tall sections are
 * clamped to a viewport-centred window so the spotlight ring stays elegant
 * instead of covering the whole page.
 */
function measureSpot(el) {
  const rect = el.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const maxHeight = Math.min(vh * 0.72, rect.height);
  const clampedTop = rect.height > maxHeight ? rect.top + (rect.height - maxHeight) / 2 : rect.top;
  return {
    left: Math.max(6, rect.left - SPOT_PAD),
    top: Math.max(6, clampedTop - SPOT_PAD),
    width: Math.min(vw - 12, rect.width + SPOT_PAD * 2),
    height: Math.min(vh - 12, maxHeight + SPOT_PAD * 2),
  };
}

/** Places the card below the spotlight, then above, then beside it, clamped. */
function placeCard(spot, cardWidth, cardHeight) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const below = spot.top + spot.height + 14;
  const above = spot.top - cardHeight - 14;
  let top;
  if (below + cardHeight <= vh - CARD_MARGIN) top = below;
  else if (above >= CARD_MARGIN) top = above;
  else top = Math.max(CARD_MARGIN, vh - cardHeight - CARD_MARGIN);
  const left = Math.max(CARD_MARGIN, Math.min(vw - cardWidth - CARD_MARGIN, spot.left));
  return { left, top };
}

/**
 * The portfolio guided tour: a first-visit welcome card plus a step-by-step
 * walkthrough that spotlights real sections (selectors come from useTour.js,
 * the same ids the nav rail links to). Everything is custom — a moving
 * spotlight box whose giant box-shadow dims the page, and one floating card —
 * so there is no dependency to maintain.
 */
export default function TourOverlay({ tour }) {
  const { phase, step, total } = tour;
  const isWelcome = phase === 'welcome';
  const stepDef = TOUR_STEPS[step];
  const isLast = step === total - 1;

  const [spot, setSpot] = useState(null);
  const [cardPos, setCardPos] = useState(null);
  const cardRef = useRef(null);
  const restoreRef = useRef(null);

  // Remember where the tour was started from and hand focus back when it ends.
  useEffect(() => {
    if (phase !== 'idle' && restoreRef.current === null) {
      restoreRef.current = document.activeElement;
    }
  }, [phase]);

  const end = (completed) => {
    restoreRef.current?.focus?.();
    restoreRef.current = null;
    if (completed) tour.finish();
    else tour.skip();
  };

  // Spotlight: scroll the target into view and keep the ring glued to it while
  // the smooth scroll (or any resize) moves it. A missing element degrades to
  // a centred card instead of a broken tour.
  useLayoutEffect(() => {
    if (phase !== 'active') {
      setSpot(null);
      return undefined;
    }
    const el = stepDef ? document.querySelector(stepDef.selector) : null;
    if (!el) {
      setSpot(null);
      return undefined;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    const update = () => setSpot(measureSpot(el));
    update();
    // Extra ticks catch the tail of the smooth scroll.
    const timers = [320, 700, 1250].map((delay) => setTimeout(update, delay));
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [phase, step]);

  // Card position (desktop): beside the spotlight. Small screens anchor the
  // card to the bottom instead, handled by CSS when cardPos is null.
  useLayoutEffect(() => {
    if (phase !== 'active' || !spot) {
      setCardPos(null);
      return undefined;
    }
    const compute = () => {
      const card = cardRef.current;
      if (!card || window.innerWidth < MOBILE_BREAKPOINT) {
        setCardPos(null);
        return;
      }
      setCardPos(placeCard(spot, card.offsetWidth || 372, card.offsetHeight || 200));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [phase, spot, step]);

  // Keyboard: arrows step, Enter continues, Escape leaves. Enter is skipped
  // when a card button has focus — the native click already handles it.
  useEffect(() => {
    if (phase === 'idle') return undefined;
    const onKey = (event) => {
      if (phase === 'welcome') {
        if (event.key === 'Enter') {
          event.preventDefault();
          tour.start();
        } else if (event.key === 'Escape') {
          tour.dismissWelcome();
        }
        return;
      }
      const onCardButton =
        event.target instanceof HTMLElement && cardRef.current?.contains(event.target);
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (isLast) end(true);
        else tour.next();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        tour.prev();
      } else if (event.key === 'Escape') {
        end(false);
      } else if (event.key === 'Enter' && !onCardButton) {
        event.preventDefault();
        if (isLast) end(true);
        else tour.next();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, step, isLast, tour]);

  // Move focus into the card on open and on every step, and keep Tab inside it.
  useEffect(() => {
    if (phase === 'idle') return;
    cardRef.current?.querySelector('[data-primary]')?.focus({ preventScroll: true });
  }, [phase, step]);

  const trapTab = (event) => {
    if (event.key !== 'Tab') return;
    const card = cardRef.current;
    if (!card) return;
    const focusables = card.querySelectorAll('button, a[href]');
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (phase === 'idle') return null;

  if (isWelcome) {
    return (
      <div className={styles.welcome} role="dialog" aria-modal="true" aria-label="Welcome">
        <div className={styles.welcomeCard} ref={cardRef} onKeyDown={trapTab}>
          <h2 className={styles.welcomeTitle}>Welcome to my little corner of the web.</h2>
          <p className={styles.welcomeBody}>
            I&rsquo;m Kylle, an aspiring web developer who enjoys building websites, exploring
            technologies, and creating useful digital experiences.
          </p>
          <p className={styles.welcomeBody}>Take a quick interactive tour to explore it with me.</p>
          <div className={styles.welcomeActions}>
            <button type="button" className="btn btn-primary" data-primary onClick={tour.start}>
              Start the tour
            </button>
            <button type="button" className={styles.ghost} onClick={tour.dismissWelcome}>
              Maybe later
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tour}>
      <div
        className={`${styles.blocker} ${spot ? '' : styles.dimmed}`}
        aria-hidden="true"
      />
      {spot ? (
        <div
          className={styles.spot}
          style={{
            transform: `translate(${spot.left}px, ${spot.top}px)`,
            width: `${spot.width}px`,
            height: `${spot.height}px`,
          }}
          aria-hidden="true"
        />
      ) : null}

      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Portfolio tour — ${stepDef.title}`}
        className={`${styles.card} ${cardPos ? styles.cardPlaced : ''} ${spot ? '' : styles.cardCenter}`}
        style={cardPos ? { left: cardPos.left, top: cardPos.top } : undefined}
        onKeyDown={trapTab}
      >
        <span className={styles.progress} style={{ width: `${((step + 1) / total) * 100}%` }} />
        <p className={styles.eyebrow}>
          Step {step + 1} of {total}
        </p>
        <div className={styles.content} key={step}>
          <h2 className={styles.title}>{stepDef.title}</h2>
          <p className={styles.body}>{stepDef.body}</p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.ghost} onClick={() => end(false)}>
            Skip tour
          </button>
          <div className={styles.controls}>
            {step > 0 ? (
              <button type="button" className={styles.back} onClick={tour.prev}>
                Back
              </button>
            ) : null}
            <button
              type="button"
              className="btn btn-primary"
              data-primary
              onClick={() => (isLast ? end(true) : tour.next())}
            >
              {isLast ? 'Finish tour' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
