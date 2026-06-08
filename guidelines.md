# The Good Jar — guidelines.md

## About the App
The Good Jar is a mobile web app for logging tiny wins. Users write a win, watch it drop into a glass jar as a paper slip, and the jar fills up over time. On a hard day, they tap the jar to surface a random win. The experience should feel warm, quiet, and personal — like a small ritual.

---

## Typography
- **Display / Logo:** Louize — used for the wordmark "the good jar" and any editorial headings
- **Body / UI:** Space Grotesk — used for all interface text, slip content, buttons, labels
- **Slip text:** Space Grotesk, small size (14px), light weight, centered
- **Button text:** Space Grotesk, medium weight, sentence case only — never uppercase

---

## Colour Palette
- **Background:** Warm sand `#E8DDD0`
- **Jar:** Soft pink, translucent glass — use as image asset, do not replicate in CSS
- **Lid knob:** Warm gold — part of jar image asset
- **CTA Button:** Sage/olive green `#7A8C6E`, white text
- **Slip / chit:** Off-white `#F5F0E8`, slight transparency, subtle border or torn-edge texture
- **Text (primary):** Deep warm brown `#2C2419`
- **Text (secondary):** Muted warm grey `#9E9087`
- **Overlay (logging mode):** Background blurs to ~8px, slight darkening

---

## Layout
- Mobile only: 390 x 844px base frame
- All screens are full-bleed with sand background
- Logo "the good jar" sits top-center on all main screens, Louize serif, small size
- Primary CTA always sits at the bottom of the screen with generous padding (24px sides, 48px bottom)
- Nothing competes with the jar — it is always the visual hero

---

## Jar States
1. **Closed — empty:** Jar centered on screen, lid on, no slips visible. Default home state on first launch.
2. **Closed — with slips:** Jar centered, slips visible accumulating inside through the glass. Home state after wins are logged.
3. **Open — logging:** Lid lifted, background blurred, text input slip appears in front of jar.
4. **Serendipity:** User taps jar, a single slip floats up from the jar, expands to show win text. Tap again to dismiss.

---

## Animation Principles
- Everything moves **slowly and dreamily** — no snappy transitions
- Ease: `ease-in-out` with longer durations (400–600ms minimum)
- Lid lift: smooth upward arc, slight rotation, like a real lid being opened by hand
- Slip entry: slip appears above jar, drifts downward into the jar, slight paper-like rotation (±3–5°)
- Slip float (serendipity): slip rises slowly from jar mouth, gentle sway, fades in text
- Background blur: fades in softly when logging mode activates, fades out on dismiss
- No hard cuts. No bouncy spring physics. No rapid movement.

---

## Screens
1. **Onboarding** — brief intro text, jar selection (choose your jar), single CTA "get started"
2. **Home** — logo, jar (with accumulated slips), "log a win" CTA at bottom. Tap jar = serendipity.
3. **Logging** — background blurs, lid lifts, slip input appears. User types win, submits. Slip animates into jar.
4. **Serendipity** — triggered by tapping jar on home screen. Random past win surfaces as a slip.
5. **List view** — all wins in chronological order, simple and clean. Accessible from home (subtle nav).

---

## Components

### Slip / Chit
- Off-white card, slightly wider than tall
- Subtle folded or torn top edge (visual detail only)
- Win text centered inside, Space Grotesk 14px
- Date in secondary colour, smaller, below text
- Slight drop shadow, no hard borders

### CTA Button
- Full width minus 48px horizontal padding
- Rounded corners: 12px
- Sage green background, white Space Grotesk text
- No hover state needed (mobile)
- Height: 56px

### Logo
- "the good jar" in Louize, stacked or inline
- Always top-center
- Never bold, never large — it should feel quiet

---

## What to Never Do
- Never use stark white `#FFFFFF` or pure black `#000000`
- Never add drop shadows to the jar image — it has its own lighting
- Never use uppercase text anywhere
- Never add more than one CTA per screen
- Never use fast or bouncy animations
- Never clutter the home screen — the jar must breathe
- Never use blue, purple, or cool-toned colours anywhere

---

## Data & Persistence
- All wins stored in localStorage
- Each win entry: `{ id, text, date, jarType }`
- No backend, no auth, no accounts
- On first launch: show onboarding + jar selection, store choice in localStorage
- `jarType` stored from onboarding selection, determines which jar image is shown throughout

---

## Tone
The app is quiet, warm, and personal. It doesn't celebrate loudly. It just keeps your wins safe until you need them.
