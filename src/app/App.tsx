import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';

import bgImg from '../imports/Jar/8e7ebf332deedbbc319f0fa3ad6ae222eaf5406e.png';
import jar1Img from '../imports/Jar/f6b7b72b42cd56976252c336ddcce259473eac95.png';
import jar2Img from '../imports/JarSelection/402368211f626223b6e9f946f1025ff002c10db1.png';
import jar3Img from '../imports/JarSelection/e180000100eab2253bd7ef19aaa1b42314fd49e7.png';
import textureImg from '../imports/Jar/88555d5614cd8f6999b7414e2b1de0a0ebe300fc.png';

// ── Types ──────────────────────────────────────────────────────────────────

type Screen = 'onboarding-intro' | 'onboarding-jar' | 'home' | 'logging' | 'serendipity' | 'list';

interface Win {
  id: string;
  text: string;
  date: string;
  jarType: string;
}

// ── Storage helpers ────────────────────────────────────────────────────────

const WINS_KEY = 'good-jar-wins';
const JAR_KEY = 'good-jar-type';
const DONE_KEY = 'good-jar-onboarded';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// ── Design tokens ──────────────────────────────────────────────────────────

const C = {
  bg: '#E8DDD0',
  cta: '#7A8C6E',
  slip: '#F5F0E8',
  text: '#2C2419',
  textMuted: '#9E9087',
  textWarm: '#493a28',
  overlay: 'rgba(6,6,6,0.08)',
};

const F = {
  display: \"'Louize', 'Cormorant Garamond', Georgia, serif\",
  body: \"'Space Grotesk', system-ui, sans-serif\",
};

// ── Shared sub-components ──────────────────────────────────────────────────

function Background() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.bg, zIndex: 0 }}>
      <img
        src={bgImg}
        alt=\"\"
        style={{
          position: 'absolute',
          width: '996px',
          height: '1244px',
          left: '-310px',
          top: '-73px',
          opacity: 0.18,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

function Logo() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        fontFamily: F.display,
        fontSize: '24px',
        color: C.text,
        lineHeight: 1.1,
        fontStyle: 'italic',
        fontWeight: 400,
        userSelect: 'none',
        zIndex: 5,
        letterSpacing: '0.005em',
      }}
    >
      <div>the good jar</div>
    </div>
  );
}

function TextureOverlay({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', ...style }}>
      <img
        src={textureImg}
        alt=\"\"
        style={{
          position: 'absolute',
          width: '740px',
          height: '494px',
          left: '-168px',
          top: '-200px',
          opacity: 0.5,
          mixBlendMode: 'luminosity',
        }}
      />
    </div>
  );
}

function SlipSurface({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: C.slip,
        borderRadius: '3px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 3px 16px rgba(44,36,25,0.12)',
        ...style,
      }}
    >
      <TextureOverlay />
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}

function CtaButton({
  onClick,
  disabled,
  children,
  style,
}: {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        position: 'absolute',
        bottom: '48px',
        left: '24px',
        right: '24px',
        height: '56px',
        background: disabled ? '#BFC9B4' : C.cta,
        border: 'none',
        borderRadius: '12px',
        fontFamily: F.body,
        fontSize: '15px',
        color: '#FFFFFF',
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.4s ease-in-out',
        zIndex: 10,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ── Jar imagery helpers ────────────────────────────────────────────────────

function jarSrcFor(jarType: string): string {
  if (jarType === 'jar2') return jar2Img;
  if (jarType === 'jar3') return jar3Img;
  return jar1Img;
}

// Container dimensions shared across jar displays
const JAR_W = 310;
const JAR_H = 460;
const JAR_TOP = 155; // distance from screen top

function buildSlips(count: number) {
  return Array.from({ length: Math.min(count, 12) }, (_, i) => ({
    left: 12 + ((i * 47 + i * i * 9) % 60),
    top: 38 + ((i * 31 + 7) % 40),
    rotate: ((i % 5) - 2) * 9,
    opacity: 0.4 + (i / Math.max(count, 1)) * 0.45,
    w: 50 + (i % 3) * 10,
    h: 26 + (i % 2) * 7,
  }));
}

// ── Home jar display ──────────────────────────────────────────────────────

interface JarDisplayProps {
  jarType: string;
  wins: Win[];
  onTap: () => void;
}

function JarDisplay({ jarType, wins, onTap }: JarDisplayProps) {
  const src = jarSrcFor(jarType);
  const slips = useMemo(() => buildSlips(wins.length), [wins.length]);
  const canTap = wins.length > 0;

  return (
    <div
      onClick={canTap ? onTap : undefined}
      style={{
        position: 'absolute',
        left: '50%',
        top: `${JAR_TOP}px`,
        transform: 'translateX(-50%)',
        width: `${JAR_W}px`,
        height: `${JAR_H}px`,
        cursor: canTap ? 'pointer' : 'default',
        zIndex: 1,
      }}
    >
      {/* Paper slips inside the jar glass — rendered behind jar, blended */}
      {slips.length > 0 && (
        <div
          style={{
            position: 'absolute',
            left: '18%',
            right: '18%',
            top: '44%',
            bottom: '7%',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {slips.map((s, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.w}px`,
                height: `${s.h}px`,
                background: C.slip,
                borderRadius: '1px',
                transform: `rotate(${s.rotate}deg)`,
                opacity: s.opacity,
              }}
            />
          ))}
        </div>
      )}

      {/* Jar image on top */}
      <img
        src={src}
        alt=\"your jar\"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          zIndex: 2,
          pointerEvents: 'none',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
}

// ── Animated jar for logging screen (split lid / body) ─────────────────────

interface AnimatedJarProps {
  jarType: string;
  lidOpen: boolean;
}

const LID_SPLIT = 0.34; // top 34% is lid

function AnimatedJar({ jarType, lidOpen }: AnimatedJarProps) {
  const src = jarSrcFor(jarType);

  const sharedImg = (pos: React.CSSProperties) => (
    <img
      src={src}
      alt=\"\"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'center',
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
      }}
    />
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: `${JAR_TOP}px`,
        transform: 'translateX(-50%)',
        width: `${JAR_W}px`,
        height: `${JAR_H}px`,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      {/* Body — bottom portion, static */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(${Math.round(LID_SPLIT * 100)}% 0 0 0)`,
        }}
      >
        {sharedImg({})}
      </div>

      {/* Lid — top portion, animates up */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(0 0 ${Math.round((1 - LID_SPLIT) * 100)}% 0)`,
          transformOrigin: '50% 100%',
        }}
        animate={{
          y: lidOpen ? -62 : 0,
          rotate: lidOpen ? -8 : 0,
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {sharedImg({})}
      </motion.div>
    </div>
  );
}

// ── Screen: Onboarding Intro ───────────────────────────────────────────────

function OnboardingIntroScreen({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Background />
      <Logo />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '284px',
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontFamily: F.body,
            fontSize: '14px',
            color: C.textWarm,
            lineHeight: 1.75,
            fontWeight: 400,
          }}
        >
          a quiet place to keep your wins — big, small, and everything in between.
        </p>
      </div>

      <CtaButton onClick={onNext}>get started</CtaButton>
    </div>
  );
}

// ── Screen: Jar Selection ──────────────────────────────────────────────────

function JarSelectionScreen({ onSelect }: { onSelect: (jar: string) => void }) {
  const [selected, setSelected] = useState<string>('jar1');
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    containScroll: false,
  });

  const options = [
    { id: 'jar1', src: jar1Img, label: 'classic' },
    { id: 'jar2', src: jar2Img, label: 'wide' },
    { id: 'jar3', src: jar3Img, label: 'tall' },
  ];

  useEffect(() => {
    if (!emblaApi) return;
    const onSelectEmbla = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelected(options[index].id);
    };
    emblaApi.on('select', onSelectEmbla);
    return () => {
      emblaApi.off('select', onSelectEmbla);
    };
  }, [emblaApi, options]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Background />
      <Logo />

      <p
        style={{
          position: 'absolute',
          top: '158px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: F.body,
          fontSize: '13px',
          color: C.textMuted,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          zIndex: 2,
        }}
      >
        choose your jar
      </p>

      <div
        ref={emblaRef}
        style={{
          position: 'absolute',
          top: '188px',
          left: 0,
          right: 0,
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex' }}>
          {options.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <div
                key={opt.id}
                style={{
                  flex: '0 0 60%',
                  minWidth: 0,
                  height: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  transition: 'opacity 0.4s ease',
                  opacity: isSelected ? 1 : 0.4,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '320px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={opt.src}
                    alt={opt.label}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      pointerEvents: 'none',
                      mixBlendMode: 'multiply',
                      transform: isSelected ? 'scale(1.1)' : 'scale(0.85)',
                      transition: 'transform 0.4s ease',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: F.body,
                    fontSize: '14px',
                    color: isSelected ? C.text : C.textMuted,
                    marginTop: '20px',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {opt.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <CtaButton onClick={() => selected && onSelect(selected)}>
        get started
      </CtaButton>
    </div>
  );
}

// ── Screen: Home ───────────────────────────────────────────────────────────

interface HomeScreenProps {
  jarType: string;
  wins: Win[];
  onLogWin: () => void;
  onSerendipity: () => void;
  onList: () => void;
}

function HomeScreen({ jarType, wins, onLogWin, onSerendipity, onList }: HomeScreenProps) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Background />
      <Logo />

      {/* Hamburger / List icon — top right */}
      <button
        onClick={onList}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: C.text,
          opacity: 0.8,
          padding: '8px',
          zIndex: 10,
        }}
        aria-label=\"view all wins\"
      >
        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\">
          <line x1=\"4\" y1=\"6\" x2=\"20\" y2=\"6\" stroke=\"currentColor\" strokeWidth=\"1.5\" strokeLinecap=\"round\" />
          <line x1=\"4\" y1=\"12\" x2=\"20\" y2=\"12\" stroke=\"currentColor\" strokeWidth=\"1.5\" strokeLinecap=\"round\" />
          <line x1=\"4\" y1=\"18\" x2=\"20\" y2=\"18\" stroke=\"currentColor\" strokeWidth=\"1.5\" strokeLinecap=\"round\" />
        </svg>
      </button>

      <JarDisplay jarType={jarType} wins={wins} onTap={onSerendipity} />

      <CtaButton onClick={onLogWin}>log a win</CtaButton>
    </div>
  );
}

// ── Screen: Logging ────────────────────────────────────────────────────────

interface LoggingScreenProps {
  jarType: string;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

function LoggingScreen({ jarType, onSubmit, onCancel }: LoggingScreenProps) {
  const [text, setText] = useState('');
  const [lidOpen, setLidOpen] = useState(false);
  const [showSlip, setShowSlip] = useState(false);
  const [dropping, setDropping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dropRotation = useRef((Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 3));

  useEffect(() => {
    const t1 = setTimeout(() => setLidOpen(true), 100);
    const t2 = setTimeout(() => {
      setShowSlip(true);
      setTimeout(() => inputRef.current?.focus(), 60);
    }, 680);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleSubmit = () => {
    if (!text.trim() || dropping) return;
    setDropping(true);
    // Slip drops after 750ms → lid closes → navigate
    setTimeout(() => setLidOpen(false), 750);
    setTimeout(() => onSubmit(text.trim()), 1400);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Background />
      <Logo />

      <AnimatedJar jarType={jarType} lidOpen={lidOpen} />

      {/* Blur overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(8px)',
          background: C.overlay,
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* Slip input — centered */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '295px',
          zIndex: 10,
        }}
      >
        <AnimatePresence>
          {showSlip && (
            <motion.div
              key=\"slip\"
              initial={{ opacity: 0, y: -90 }}
              animate={
                dropping
                   ? { opacity: 0, y: 170, rotate: dropRotation.current }
                   : { opacity: 1, y: 0, rotate: 0 }
              }
              transition={{ duration: dropping ? 0.65 : 0.5, ease: 'easeInOut' }}
            >
              <SlipSurface style={{ padding: '28px 22px 22px' }}>
                <textarea
                  ref={inputRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder=\"what's your win today?\"
                  disabled={dropping}
                  rows={3}
                  style={{
                    display: 'block',
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: F.body,
                    fontSize: '15px',
                    color: C.text,
                    textAlign: 'center',
                    lineHeight: 1.65,
                    boxSizing: 'border-box',
                    fontWeight: 400,
                  }}
                />
                <AnimatePresence>
                  {text.trim() && !dropping && (
                    <motion.button
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      onClick={handleSubmit}
                      style={{
                        display: 'block',
                        margin: '12px auto 0',
                        background: C.cta,
                        color: C.slip,
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 28px',
                        fontFamily: F.body,
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      drop it in
                    </motion.button>
                  )}
                </AnimatePresence>
              </SlipSurface>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!dropping && (
        <button
          onClick={onCancel}
          style={{
            position: 'absolute',
            top: '52px',
            right: '22px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: F.body,
            fontSize: '13px',
            color: C.textMuted,
            zIndex: 12,
          }}
        >
          cancel
        </button>
      )}
    </div>
  );
}

// ── Screen: Serendipity ────────────────────────────────────────────────────

function SerendipityScreen({ win, onDismiss }: { win: Win; onDismiss: () => void }) {
  const [leaving, setLeaving] = useState(false);

  const dismiss = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onDismiss, 580);
  }, [leaving, onDismiss]);

  const dateStr = new Date(win.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      onClick={dismiss}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <Background />
      <Logo />

      {/* Soft blur overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(5px)',
          background: 'rgba(6,6,6,0.06)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Slip */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '290px',
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 110 }}
          animate={leaving ? { opacity: 0, y: 110 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <SlipSurface style={{ padding: '36px 24px 28px' }}>
            <p
              style={{
                fontFamily: F.body,
                fontSize: '15px',
                color: C.text,
                textAlign: 'center',
                lineHeight: 1.65,
                marginBottom: '12px',
                fontWeight: 400,
              }}
            >
              {win.text}
            </p>
            <p
              style={{
                fontFamily: F.body,
                fontSize: '11px',
                color: C.textMuted,
                textAlign: 'center',
              }}
            >
              {dateStr}
            </p>
          </SlipSurface>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: leaving ? 0 : 0.55 }}
        transition={{ duration: 0.5, delay: leaving ? 0 : 0.4 }}
        style={{
          position: 'absolute',
          bottom: '52px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: F.body,
          fontSize: '12px',
          color: C.textMuted,
          whiteSpace: 'nowrap',
          zIndex: 10,
        }}
      >
        tap anywhere to close
      </motion.p>
    </div>
  );
}

// ── Screen: List ───────────────────────────────────────────────────────────

function ListScreen({ wins, onBack }: { wins: Win[]; onBack: () => void }) {
  const sorted = useMemo(
    () => [...wins].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [wins]
  );

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Background />

      {/* Header */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          padding: '52px 18px 14px',
          gap: '6px',
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: C.textMuted,
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label=\"back\"
        >
          <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">
            <path
              d=\"M13 4L7 10L13 16\"
              stroke=\"currentColor\"
              strokeWidth=\"1.5\"
              strokeLinecap=\"round\"
              strokeLinejoin=\"round\"
            />
          </svg>
        </button>
        <span
          style={{
            fontFamily: F.display,
            fontSize: '22px',
            color: C.text,
            fontStyle: 'italic',
            fontWeight: 400,
          }}
        >
          your wins
        </span>
      </div>

      {/* Scrollable list */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          overflowY: 'auto',
          padding: '2px 18px 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 2,
        }}
      >
        {sorted.length === 0 ? (
          <p
            style={{
              fontFamily: F.body,
              fontSize: '14px',
              color: C.textMuted,
              textAlign: 'center',
              marginTop: '60px',
              fontWeight: 400,
            }}
          >
            no wins yet — log your first one.
          </p>
        ) : (
          sorted.map((win) => (
            <SlipSurface key={win.id} style={{ padding: '18px 20px' }}>
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: '14px',
                  color: C.text,
                  lineHeight: 1.55,
                  marginBottom: '6px',
                  fontWeight: 400,
                }}
              >
                {win.text}
              </p>
              <p style={{ fontFamily: F.body, fontSize: '11px', color: C.textMuted }}>
                {new Date(win.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </SlipSurface>
          ))
        )}
      </div>
    </div>
  );
}

// ── App root ───────────────────────────────────────────────────────────────

export default function App() {
  const [wins, setWins] = useState<Win[]>(() => readStorage<Win[]>(WINS_KEY, []));
  const [jarType, setJarType] = useState<string>(() => readStorage<string>(JAR_KEY, ''));
  const [screen, setScreen] = useState<Screen>(() =>
    readStorage<boolean>(DONE_KEY, false) ? 'home' : 'onboarding-intro'
  );
  const [serendipityWin, setSerendipityWin] = useState<Win | null>(null);

  const saveWin = useCallback(
    (text: string) => {
      const win: Win = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        text,
        date: new Date().toISOString(),
        jarType,
      };
      const updated = [...wins, win];
      setWins(updated);
      writeStorage(WINS_KEY, updated);
      setScreen('home');
    },
    [wins, jarType]
  );

  const selectJar = useCallback((jar: string) => {
    setJarType(jar);
    writeStorage(JAR_KEY, jar);
    writeStorage(DONE_KEY, true);
    setScreen('home');
  }, []);

  const triggerSerendipity = useCallback(() => {
    if (wins.length === 0) return;
    const win = wins[Math.floor(Math.random() * wins.length)];
    setSerendipityWin(win);
    setScreen('serendipity');
  }, [wins]);

  const screenVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const screenTransition = { duration: 0.45, ease: 'easeInOut' };

  return (
    <div
      style={{
        width: '390px',
        height: '844px',
        position: 'relative',
        overflow: 'hidden',
        margin: '0 auto',
        background: C.bg,
      }}
    >
      <AnimatePresence mode=\"wait\">
        {screen === 'onboarding-intro' && (
          <motion.div
            key=\"onboarding-intro\"
            style={{ position: 'absolute', inset: 0 }}
            variants={screenVariants}
            initial=\"initial\"
            animate=\"animate\"
            exit=\"exit\"
            transition={screenTransition}
          >
            <OnboardingIntroScreen onNext={() => setScreen('onboarding-jar')} />
          </motion.div>
        )}

        {screen === 'onboarding-jar' && (
          <motion.div
            key=\"onboarding-jar\"
            style={{ position: 'absolute', inset: 0 }}
            variants={screenVariants}
            initial=\"initial\"
            animate=\"animate\"
            exit=\"exit\"
            transition={screenTransition}
          >
            <JarSelectionScreen onSelect={selectJar} />
          </motion.div>
        )}

        {screen === 'home' && (
          <motion.div
            key=\"home\"
            style={{ position: 'absolute', inset: 0 }}
            variants={screenVariants}
            initial=\"initial\"
            animate=\"animate\"
            exit=\"exit\"
            transition={screenTransition}
          >
            <HomeScreen
              jarType={jarType}
              wins={wins}
              onLogWin={() => setScreen('logging')}
              onSerendipity={triggerSerendipity}
              onList={() => setScreen('list')}
            />
          </motion.div>
        )}

        {screen === 'logging' && (
          <motion.div
            key=\"logging\"
            style={{ position: 'absolute', inset: 0 }}
            variants={screenVariants}
            initial=\"initial\"
            animate=\"animate\"
            exit=\"exit\"
            transition={screenTransition}
          >
            <LoggingScreen
              jarType={jarType}
              onSubmit={saveWin}
              onCancel={() => setScreen('home')}
            />
          </motion.div>
        )}

        {screen === 'serendipity' && serendipityWin && (
          <motion.div
            key=\"serendipity\"
            style={{ position: 'absolute', inset: 0 }}
            variants={screenVariants}
            initial=\"initial\"
            animate=\"animate\"
            exit=\"exit\"
            transition={screenTransition}
          >
            <SerendipityScreen win={serendipityWin} onDismiss={() => setScreen('home')} />
          </motion.div>
        )}

        {screen === 'list' && (
          <motion.div
            key=\"list\"
            style={{ position: 'absolute', inset: 0 }}
            variants={screenVariants}
            initial=\"initial\"
            animate=\"animate\"
            exit=\"exit\"
            transition={screenTransition}
          >
            <ListScreen wins={wins} onBack={() => setScreen('home')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}