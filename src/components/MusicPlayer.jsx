import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Music2,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { tracks } from '../data/tracks.js';
import styles from './MusicPlayer.module.css';

const VOLUME_KEY = 'music-volume';
const LAST_TRACK_KEY = 'music-last-track';

/** 126.4 → "2:06". Falls back to 0:00 until the browser knows the length. */
function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

function readStoredVolume() {
  try {
    const stored = localStorage.getItem(VOLUME_KEY);
    if (stored === null) return 0.85; // never saved — don't let Number(null) read as 0
    const parsed = Number(stored);
    if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 1) return parsed;
  } catch {
    /* storage blocked (private mode) — fall through to the default */
  }
  return 0.85;
}

function readLastTrackIndex() {
  try {
    const parsed = Number(localStorage.getItem(LAST_TRACK_KEY));
    if (Number.isInteger(parsed) && parsed >= 0 && parsed < tracks.length) return parsed;
  } catch {
    /* storage blocked — fall through */
  }
  return null;
}

/**
 * The opener: a random track on every load/refresh, skipping the one that
 * played last visit so a refresh always brings something fresh. When storage
 * is unavailable this degrades to a plain random pick.
 */
function randomStartIndex() {
  const last = readLastTrackIndex();
  if (Number.isInteger(last) && tracks.length > 1) {
    let pick = Math.floor(Math.random() * (tracks.length - 1));
    if (pick >= last) pick += 1;
    return pick;
  }
  return Math.floor(Math.random() * tracks.length);
}

/**
 * Floating music player, docked bottom-right. A compact vinyl pill by default;
 * expanding it reveals seek, volume, shuffle/repeat and the playlist. It is
 * mounted once in App.jsx outside the view switch, so playback keeps going
 * while a case study or the résumé page is open.
 */
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const frameRef = useRef(0);
  const durationsRef = useRef({});
  const rootRef = useRef(null);
  // Set when the browser defers autoplay; consumed by the first page gesture.
  const pendingRef = useRef(false);

  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState(randomStartIndex);
  const [playing, setPlaying] = useState(true); // intent: autoplay on open
  const [awaiting, setAwaiting] = useState(false); // autoplay blocked, waiting for a gesture
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('all'); // 'off' | 'all' | 'one'
  const [volume, setVolume] = useState(readStoredVolume);
  const [muted, setMuted] = useState(false);
  const [durations, setDurations] = useState({});
  const [error, setError] = useState(false);

  const track = tracks[index];

  const rememberDuration = useCallback((src, value) => {
    durationsRef.current = { ...durationsRef.current, [src]: value };
    setDurations(durationsRef.current);
  }, []);

  const goTo = useCallback((nextIndex) => {
    setIndex(nextIndex);
    setPlaying(true);
  }, []);

  const randomIndex = useCallback((from) => {
    let pick = from;
    while (pick === from) pick = Math.floor(Math.random() * tracks.length);
    return pick;
  }, []);

  const next = useCallback(() => {
    if (shuffle) {
      goTo(randomIndex(index));
      return;
    }
    if (index + 1 < tracks.length) goTo(index + 1);
    else if (repeat === 'all') goTo(0);
    else setPlaying(false);
  }, [shuffle, index, repeat, goTo, randomIndex]);

  // Standard UX: a short press of previous rewinds the current track instead
  // of jumping back, so restarting a song never takes two clicks.
  const previous = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setTime(0);
      return;
    }
    if (index - 1 >= 0) goTo(index - 1);
    else if (repeat === 'all') goTo(tracks.length - 1);
    else if (audio) {
      audio.currentTime = 0;
      setTime(0);
    }
  }, [index, repeat, goTo]);

  // Load the selected track. Playback itself is driven by the intent effect
  // below, so this only fires when the selection actually changes.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = track.src;
    setTime(0);
    setDuration(0);
    setError(false);
  }, [track.src]);

  // Keep the element in sync with the play/pause intent (including the OS
  // media keys, which flip the intent through Media Session handlers).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!playing) {
      audio.pause();
      return;
    }
    audio.play().catch((playError) => {
      // Autoplay policy: no gesture yet. Keep the choice of track and wait
      // for the visitor's first interaction instead of erroring out.
      if (playError?.name === 'NotAllowedError') {
        pendingRef.current = true;
        setAwaiting(true);
        setPlaying(false);
        return;
      }
      // Superseded by a newer play() attempt (e.g. quick skip) — ignore.
      if (playError?.name === 'AbortError') return;
      setPlaying(false);
    });
  }, [playing, index]);

  // Autoplay fallback: browsers only allow sound after a user gesture, so the
  // deferred start listens for the first pointer press or key on the page.
  // Interactions inside the player itself are excluded — its own controls
  // (play/pause/playlist) already speak for the visitor.
  useEffect(() => {
    const tryStart = (event) => {
      if (!pendingRef.current) return;
      if (rootRef.current && event.target instanceof Node && rootRef.current.contains(event.target)) {
        return;
      }
      pendingRef.current = false;
      setAwaiting(false);
      setPlaying(true);
    };
    const gestures = ['pointerdown', 'touchstart', 'keydown'];
    for (const type of gestures) document.addEventListener(type, tryStart, true);
    return () => {
      for (const type of gestures) document.removeEventListener(type, tryStart, true);
    };
  }, []);

  // Smooth progress: rAF while playing, throttled to ~10 updates a second so
  // the seek bar glides without re-rendering the playlist sixty times over.
  useEffect(() => {
    if (!playing) return undefined;
    let last = -1;
    const tick = () => {
      const audio = audioRef.current;
      if (audio) {
        const current = audio.currentTime;
        if (Math.abs(current - last) > 0.1) {
          last = current;
          setTime(current);
        }
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [playing]);

  // Volume applies to the element immediately and survives reloads.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.muted = muted;
    }
    try {
      localStorage.setItem(VOLUME_KEY, String(volume));
    } catch {
      /* storage blocked — keep the choice for this session only */
    }
  }, [volume, muted]);

  // Duration badges for the playlist: probe the file headers of tracks that
  // have not played yet, once the card is first expanded.
  useEffect(() => {
    if (!expanded) return undefined;
    const probes = [];
    for (const item of tracks) {
      if (item.src === track.src) continue; // the main <audio> supplies this one
      if (durationsRef.current[item.src] != null) continue;
      const el = new Audio();
      el.preload = 'metadata';
      el.addEventListener(
        'loadedmetadata',
        () => rememberDuration(item.src, el.duration),
        { once: true },
      );
      el.src = item.src;
      probes.push(el);
    }
    return () => {
      for (const el of probes) {
        el.removeAttribute('src');
        el.load();
      }
    };
  }, [expanded, track.src, rememberDuration]);

  // OS-level media controls (lock screen, media keys) when the browser
  // supports the Media Session API.
  useEffect(() => {
    if (!('mediaSession' in navigator)) return undefined;
    const session = navigator.mediaSession;
    try {
      session.metadata = new window.MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: 'Kylle Ian Acibron — Portfolio',
      });
      session.playbackState = playing ? 'playing' : 'paused';
    } catch {
      /* metadata unsupported — the audio still plays */
    }
    return undefined;
  }, [track, playing]);

  useEffect(() => {
    if (!('mediaSession' in navigator)) return undefined;
    const session = navigator.mediaSession;
    const handlers = {
      play: () => setPlaying(true),
      pause: () => setPlaying(false),
      previoustrack: previous,
      nexttrack: next,
    };
    try {
      for (const [action, handler] of Object.entries(handlers)) {
        session.setActionHandler(action, handler);
      }
    } catch {
      /* action unsupported — ignore */
    }
    return () => {
      try {
        for (const action of Object.keys(handlers)) session.setActionHandler(action, null);
      } catch {
        /* ignore */
      }
    };
  }, [next, previous]);

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
    rememberDuration(track.src, audio.duration);
  };

  const handleEnded = () => {
    if (repeat === 'one') {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => setPlaying(false));
      }
      return;
    }
    next();
  };

  const handleError = () => {
    setError(true);
    setPlaying(false);
  };

  const toggle = () => {
    if (!error) setPlaying((current) => !current);
  };

  const seek = (event) => {
    const audio = audioRef.current;
    const target = Number(event.target.value);
    if (audio) audio.currentTime = target;
    setTime(target);
  };

  const changeVolume = (event) => {
    const value = Number(event.target.value);
    setVolume(value);
    if (value > 0) setMuted(false);
  };

  const playRow = (rowIndex) => {
    if (rowIndex === index) {
      // Selecting the current row restarts it.
      const audio = audioRef.current;
      if (audio) audio.currentTime = 0;
      setTime(0);
      setPlaying(true);
      return;
    }
    goTo(rowIndex);
  };

  const progressPercent = duration > 0 ? (time / duration) * 100 : 0;

  return (
    <div
      ref={rootRef}
      className={`${styles.player} ${playing ? styles.isPlaying : ''} ${
        awaiting && !playing ? styles.isWaiting : ''
      }`}
      aria-label="Music player"
    >
      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
        onPlay={() => {
          pendingRef.current = false;
          setAwaiting(false);
          setPlaying(true);
          try {
            localStorage.setItem(LAST_TRACK_KEY, String(index));
          } catch {
            /* storage blocked — the no-repeat opener just degrades to random */
          }
        }}
        onPause={() => setPlaying(false)}
      />

      {expanded ? (
        <section className={styles.card} aria-label="Now playing">
          <header className={styles.cardHeader}>
            <p className={styles.cardTitle}>
              <Music2 size={15} strokeWidth={1.9} aria-hidden="true" />
              Music
            </p>
            <button
              type="button"
              className={styles.cardClose}
              onClick={() => setExpanded(false)}
              aria-label="Minimize player"
            >
              <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          </header>

          <div className={styles.now}>
            <span className={`${styles.disc} ${styles.discLarge}`} aria-hidden="true" />
            <div className={styles.nowMeta}>
              <p className={styles.nowTitle} aria-live="polite">
                {track.title}
              </p>
              <p className={styles.nowArtist}>{track.artist}</p>
              <span className={styles.eq} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </span>
            </div>
          </div>

          {error ? (
            <p className={styles.note} role="status">
              This track could not be loaded. Try another one from the playlist.
            </p>
          ) : null}

          <input
            className={styles.range}
            style={{ '--fill': `${progressPercent}%` }}
            type="range"
            min={0}
            max={duration || 1}
            step="any"
            value={Math.min(time, duration || 1)}
            onChange={seek}
            aria-label="Seek"
          />
          <div className={styles.times}>
            <span>{formatTime(time)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={`${styles.ctrl} ${shuffle ? styles.ctrlOn : ''}`}
              onClick={() => setShuffle((on) => !on)}
              aria-pressed={shuffle}
              aria-label="Shuffle"
              title="Shuffle"
            >
              <Shuffle size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.ctrl}
              onClick={previous}
              aria-label="Previous track"
              title="Previous"
            >
              <SkipBack size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.playMain}
              onClick={toggle}
              aria-label={playing ? 'Pause' : 'Play'}
              title={playing ? 'Pause' : 'Play'}
            >
              {playing ? (
                <Pause size={20} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Play size={20} strokeWidth={2} aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              className={styles.ctrl}
              onClick={next}
              aria-label="Next track"
              title="Next"
            >
              <SkipForward size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${styles.ctrl} ${repeat !== 'off' ? styles.ctrlOn : ''}`}
              onClick={() =>
                setRepeat((mode) => (mode === 'off' ? 'all' : mode === 'all' ? 'one' : 'off'))
              }
              aria-pressed={repeat !== 'off'}
              aria-label={`Repeat: ${repeat === 'off' ? 'off' : repeat === 'all' ? 'all tracks' : 'one track'}`}
              title={repeat === 'off' ? 'Repeat off' : repeat === 'all' ? 'Repeat all' : 'Repeat one'}
            >
              {repeat === 'one' ? (
                <Repeat1 size={16} strokeWidth={1.8} aria-hidden="true" />
              ) : (
                <Repeat size={16} strokeWidth={1.8} aria-hidden="true" />
              )}
            </button>
          </div>

          <div className={styles.volumeRow}>
            <button
              type="button"
              className={styles.ctrl}
              onClick={() => setMuted((on) => !on)}
              aria-pressed={muted}
              aria-label={muted ? 'Unmute' : 'Mute'}
              title={muted ? 'Unmute' : 'Mute'}
            >
              {muted || volume === 0 ? (
                <VolumeX size={16} strokeWidth={1.8} aria-hidden="true" />
              ) : (
                <Volume2 size={16} strokeWidth={1.8} aria-hidden="true" />
              )}
            </button>
            <input
              className={styles.range}
              style={{ '--fill': `${(muted ? 0 : volume) * 100}%` }}
              type="range"
              min={0}
              max={1}
              step="any"
              value={muted ? 0 : volume}
              onChange={changeVolume}
              aria-label="Volume"
            />
          </div>

          <div className={styles.listWrap}>
            <p className={styles.legend} id="playlist-label">
              Playlist
            </p>
            <ol className={styles.list} aria-labelledby="playlist-label">
              {tracks.map((item, itemIndex) => {
                const current = itemIndex === index;
                const cached = durations[item.src];
                return (
                  <li key={item.src}>
                    <button
                      type="button"
                      className={`${styles.row} ${current ? styles.rowActive : ''}`}
                      onClick={() => playRow(itemIndex)}
                      aria-current={current ? 'true' : undefined}
                    >
                      <span className={styles.num} aria-hidden="true">
                        {current ? (
                          <span className={styles.eqMini}>
                            <span />
                            <span />
                            <span />
                          </span>
                        ) : (
                          itemIndex + 1
                        )}
                      </span>
                      <span className={styles.rowText}>
                        <span className={styles.rowTitle}>{item.title}</span>
                        <span className={styles.rowArtist}>{item.artist}</span>
                      </span>
                      <span className={styles.rowDur}>
                        {Number.isFinite(cached) ? formatTime(cached) : '–:––'}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      ) : (
        <div className={styles.pill}>
          <button
            type="button"
            className={styles.pillInfo}
            onClick={() => setExpanded(true)}
            aria-label={
              awaiting
                ? `Expand player — ready to play ${track.title} by ${track.artist}. Press play or interact with the page to start.`
                : `Expand player — now playing ${track.title} by ${track.artist}`
            }
            title={awaiting ? 'Click anywhere or press play to start the music' : undefined}
          >
            <span className={styles.disc} aria-hidden="true" />
            <span className={styles.pillText}>
              <span className={styles.pillTitle}>{track.title}</span>
              <span className={styles.pillArtist}>{track.artist}</span>
            </span>
          </button>
          <button
            type="button"
            className={styles.pillPlay}
            onClick={toggle}
            aria-label={playing ? 'Pause' : 'Play'}
            title={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <Pause size={15} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Play size={15} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            className={styles.pillBtn}
            onClick={() => setExpanded(true)}
            aria-label="Open playlist"
            aria-expanded={expanded}
            title="Open playlist"
          >
            <ChevronUp size={15} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
