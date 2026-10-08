import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

/**
 * VideoPlayer — accessible vertical-video player with poster + click-to-play.
 *
 * Starts as a poster image (so nothing autoplays and no bandwidth is spent
 * until the user asks for it). Once playing it is muted by default and loops,
 * with real controls available. Respects prefers-reduced-motion by never
 * autoplaying even after the first click.
 */
export function VideoPlayer({
  src,
  poster,
  caption,
  badge,
  ratio = '9 / 16',
  autoPlayOnView = false,
  className = '',
}) {
  const ref = useRef(null);
  const wrapRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const reduced = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Optionally start (muted) when scrolled into view — skipped for reduced motion.
  useEffect(() => {
    if (!autoPlayOnView || reduced) return;
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { start({ silent: true }); io.unobserve(e.target); }
      });
    }, { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayOnView, reduced]);

  // silent = forced-mute start (autoplay on view). A user-initiated start keeps
  // whatever volume state they last chose, so "volume on" survives pause/play.
  const start = ({ silent = false } = {}) => {
    const v = ref.current;
    if (!v) return;
    if (silent) {
      v.muted = true;
      setMuted(true);
    }
    const p = v.play();
    if (p && p.catch) p.catch(() => { /* user gesture required — stays on poster */ });
    setPlaying(true);
  };

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { start(); } else { v.pause(); setPlaying(false); }
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next && v.volume === 0) v.volume = 1;
    setMuted(next);
  };

  return (
    <figure className={`vplayer ${className}`.trim()} ref={wrapRef}>
      <div className="vplayer-stage" style={{ aspectRatio: ratio }}>
        <video
          ref={ref}
          className="vplayer-video"
          poster={`/assets/video/${poster}`}
          preload="none"
          playsInline
          loop
          muted={muted}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label={caption || 'Protein Tadka video'}
        >
          <source src={`/assets/video/${src}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {!playing && (
          <button className="vplayer-cover" onClick={toggle} aria-label={`Play ${caption || 'video'}`}>
            <img src={`/assets/video/${poster}`} alt="" />
            <span className="vplayer-play"><Icon name="play" size={30} /></span>
            {badge && <span className="vplayer-badge">{badge}</span>}
          </button>
        )}

        {playing && (
          <div className="vplayer-ctrls">
            <button className="vplayer-btn" onClick={toggle} aria-label="Pause video">
              <Icon name="pause" size={17} />
            </button>
            <button className="vplayer-btn" onClick={toggleSound} aria-label={muted ? 'Unmute video' : 'Mute video'}>
              <Icon name={muted ? 'volumeOff' : 'volumeOn'} size={17} />
            </button>
          </div>
        )}
      </div>
      {caption && <figcaption className="vplayer-cap">{caption}</figcaption>}
    </figure>
  );
}

/**
 * ReviewCard — a customer review clip with a name/role/location and a fold-out
 * quote, plus the real vertical video.
 */
export function ReviewCard({ item, index = 0 }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="rcard">
      <VideoPlayer
        src={item.video}
        poster={item.poster}
        badge={item.badge}
        caption={item.title}
        autoPlayOnView={false}
      />
      <div className="rcard-body">
        <div className="rcard-head">
          <div className="avatar">{item.initials}</div>
          <div className="rcard-id">
            <b>{item.name}</b>
            <small>{item.role} · {item.area}</small>
          </div>
        </div>
        <div className="stars" role="img" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" size={17} />)}
        </div>
        <p className="rcard-quote">
          {open ? `“${item.quote}”` : `${item.quote.slice(0, 96)}…`}
        </p>
        <button className="rcard-more" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          {open ? 'Show less' : 'Read full review'} <Icon name="arrowRight" size={14} />
        </button>
        {item.lang && <span className="rcard-lang">{item.lang}</span>}
      </div>
    </article>
  );
}
