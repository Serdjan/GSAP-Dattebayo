# 🌀 GSAP Dattebayo

> **The ultimate GSAP-powered scroll animation library**
> Simple as AOS, powerful as GSAP. Modern animations for 2025-2026 web trends.

[![npm version](https://img.shields.io/npm/v/gsap-dattebayo.svg)](https://www.npmjs.com/package/gsap-dattebayo)
[![npm downloads](https://img.shields.io/npm/dm/gsap-dattebayo.svg)](https://www.npmjs.com/package/gsap-dattebayo)
[![license](https://img.shields.io/npm/l/gsap-dattebayo.svg)](https://github.com/yourusername/gsap-dattebayo/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/gsap-dattebayo)](https://bundlephobia.com/package/gsap-dattebayo)

---

## ✨ Features

- 🎯 **100% GSAP-Powered** - No CSS animations, pure GSAP magic
- 🔥 **30+ Animations** - Core, text, scroll, and interactive effects
- 📝 **Data Attributes API** - Zero JavaScript required
- ⚡ **GPU-Accelerated** - Smooth 60fps animations
- 🎨 **SplitText Included** - Character, word, and line animations
- 📜 **ScrollTrigger Ready** - Advanced scroll effects built-in
- 🌊 **Parallax Scrolling** - Multi-layer parallax support
- 💪 **TypeScript** - Full type definitions
- 🎭 **Modern Trends** - Blur-to-focus, elastic, glitch effects
- 📦 **Tiny Bundle** - < 30KB minified + gzipped
- 🔧 **Tree-Shakeable** - Import only what you need

---

## 📦 Installation

### NPM / Yarn / PNPM

```bash
# NPM
npm install gsap-dattebayo gsap

# Yarn
yarn add gsap-dattebayo gsap

# PNPM
pnpm add gsap-dattebayo gsap
```

### CDN

```html
<!-- GSAP (required peer dependency) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js"></script>

<!-- GSAP Dattebayo -->
<script src="https://unpkg.com/gsap-dattebayo@latest/dist/gsap-dattebayo.umd.min.js"></script>
```

---

## 🚀 Quick Start

### Option 1: Data Attributes (No JavaScript)

```html
<!DOCTYPE html>
<html>
  <body>
    <!-- Add data-gsap attributes to any element -->
    <h1 data-gsap="fadeUp">Hello World</h1>
    <p data-gsap="charReveal" data-gsap-stagger="0.05">Character animation</p>
    <div data-gsap="zoomIn" data-gsap-delay="0.5">Delayed zoom</div>

    <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js"></script>
    <script src="https://unpkg.com/gsap-dattebayo/dist/gsap-dattebayo.umd.min.js"></script>

    <script>
      // Initialize with auto-detection
      GSAPDattebayo.init();
    </script>
  </body>
</html>
```

### Option 2: JavaScript API

```javascript
import { fadeUp, zoomIn, charReveal } from "gsap-dattebayo";

// Animate single element
fadeUp(".title", { duration: 1.2 });

// Animate with stagger
zoomIn(".card", { stagger: 0.1, ease: "back.out(1.7)" });

// Text animation
charReveal(".heading", { stagger: 0.05 });
```

### Option 3: Auto-Init System

```javascript
import { init } from "gsap-dattebayo";

init({
  autoDetect: true, // Automatically animate elements with data-gsap
  defaults: {
    duration: 1,
    ease: "power2.out",
  },
});
```

---

## 🎨 Available Animations

### Core Animations (15)

#### Fade Effects

- `fadeIn` / `fadeOut` - Simple opacity transitions
- `fadeUp` / `fadeDown` - Vertical fade with movement
- `fadeLeft` / `fadeRight` - Horizontal fade with movement

#### Slide Effects

- `slideInUp` / `slideInDown` - Vertical slide entrance
- `slideInLeft` / `slideInRight` - Horizontal slide entrance
- `slideOutUp` / `slideOutDown` - Vertical slide exit

#### Scale Effects

- `zoomIn` / `zoomOut` - Simple scale animations
- `zoomInUp` / `zoomInDown` - Scale + movement combos
- `elasticZoom` - Bouncy elastic scale

#### Rotation Effects

- `rotateIn` / `rotateOut` - 2D rotation
- `flipInX` / `flipInY` - 3D flip rotations
- `spinIn` - Continuous spin entrance

#### Modern Effects

- `blurToFocus` - Blur-to-sharp reveal
- `focusToBlur` - Reverse blur effect
- `blurInUp` - Blur + upward movement
- `blurZoom` - Blur + scale effect

### Text Animations (12)

#### Character-Level

- `charReveal` - Classic character stagger
- `charFadeUp` - Characters fade up
- `charWave` - Wave-like character reveal
- `charElastic` - Bouncy character entrance
- `charBlur` - Blur-to-focus per character

#### Word-Level

- `wordReveal` - Word-by-word fade up
- `wordScaleIn` - Words scale in
- `wordRotateIn` - 3D word rotation
- `wordSlideAlternate` - Alternating word slides

#### Line-Level

- `lineReveal` - Line-by-line fade up
- `lineClipReveal` - Mask-based line reveal
- `lineSlideAlternate` - Alternating line slides
- `lineScaleReveal` - Line scale from center

#### Special Effects

- `scrambleReveal` - Random character scramble
- `glitchReveal` - Digital glitch effect
- `matrixReveal` - Matrix-style falling text

### Scroll Animations (10)

#### Parallax

- `parallax` - Basic parallax movement
- `parallaxSpeed` - Speed-based parallax
- `parallaxLayers` - Multi-layer parallax
- `parallax3D` - 3D perspective parallax
- `parallaxRotate` - Rotation parallax

#### Reveal

- `scrollReveal` - Animate on scroll
- `batchScrollReveal` - Optimized batch animations
- `pinSection` - Pin elements while scrolling
- `scrubAnimation` - Scroll-linked animation
- `horizontalScroll` - Horizontal scroll sections

#### Progress

- `scrollProgress` - Page-level progress bar
- `sectionProgress` - Section progress indicator
- `circularProgress` - Circular scroll progress
- `scrollPercentage` - Text percentage display

---

## 📚 Usage Examples

### Basic Fade Animation

```html
<div data-gsap="fadeUp">Fades up on scroll</div>
```

```javascript
import { fadeUp } from "gsap-dattebayo";
fadeUp(".element", { duration: 1.2, delay: 0.2 });
```

### Text Animations

```html
<h1 data-gsap="charReveal" data-gsap-stagger="0.05">Character by character</h1>

<p data-gsap="wordReveal" data-gsap-stagger="0.1">
  Word by word reveal animation
</p>
```

```javascript
import { charReveal, wordReveal } from "gsap-dattebayo";

charReveal(".title", {
  stagger: 0.05,
  ease: "back.out(1.7)",
});

wordReveal(".subtitle", {
  stagger: 0.1,
  from: "center",
});
```

### Parallax Scrolling

```html
<div data-gsap-parallax="0.5">Slower than scroll</div>
<div data-gsap-parallax="2">Faster than scroll</div>
```

```javascript
import { parallax } from "gsap-dattebayo";

parallax(".background", {
  speed: 0.5,
  direction: "vertical",
});
```

### Scroll Reveal

```html
<div data-gsap="scrollReveal" data-gsap-once="true">
  Animates once when entering viewport
</div>
```

```javascript
import { scrollReveal } from "gsap-dattebayo";

scrollReveal(".card", {
  animation: "fadeUp",
  start: "top 80%",
  once: true,
  stagger: 0.1,
});
```

### Scroll Options (NEW in v0.1.1)

Control how animations behave when scrolling up and down:

```html
<!-- Reverse: plays forward and backward -->
<div data-gsap="fadeUp" data-gsap-option="reverse">
  Ping-pong animation
</div>

<!-- Scrub: tied to scroll position -->
<div data-gsap="fadeUp" data-gsap-option="scrub">
  Smooth scrubbing
</div>

<!-- Replay: replays without reversing -->
<div data-gsap="fadeUp" data-gsap-option="replay">
  Replay on scroll back
</div>
```

### Hover & Click Triggers (NEW in v0.1.1)

```html
<!-- Simple hover -->
<div data-gsap-hover="elasticZoom">
  Hover me!
</div>

<!-- Hover with leave animation -->
<div data-gsap-hover="zoomIn" data-gsap-hoverleave="zoomOut">
  Smooth hover IN and OUT
</div>

<!-- Click trigger -->
<div data-gsap-trigger="click" data-gsap="spinIn">
  Click to animate
</div>
```

### Custom Options

```html
<div
  data-gsap="zoomIn"
  data-gsap-duration="1.5"
  data-gsap-delay="0.3"
  data-gsap-ease="elastic.out(1, 0.3)"
  data-gsap-stagger="0.1"
>
  Fully customized
</div>
```

---

## ⚙️ Configuration Options

### Global Configuration

```javascript
import { init } from "gsap-dattebayo";

init({
  autoDetect: true, // Enable data attribute detection
  defaults: {
    duration: 1,
    ease: "power2.out",
    distance: 50,
    stagger: 0.1,
    start: "top 80%",
    end: "bottom 20%",
    once: false,
    markers: false, // Enable in development
  },
  debug: false, // Console logging
});
```

### Data Attributes Reference

| Attribute               | Type           | Default      | Description                             |
| ----------------------- | -------------- | ------------ | --------------------------------------- |
| `data-gsap`             | string         | -            | Animation name                          |
| `data-gsap-duration`    | number         | 1            | Animation duration (seconds)            |
| `data-gsap-delay`       | number         | 0            | Delay before animation                  |
| `data-gsap-ease`        | string         | 'power2.out' | GSAP easing function                    |
| `data-gsap-distance`    | number         | 50           | Movement distance (px)                  |
| `data-gsap-stagger`     | number         | 0            | Stagger delay between elements          |
| `data-gsap-start`       | string         | 'top 80%'    | ScrollTrigger start position            |
| `data-gsap-end`         | string         | 'bottom 20%' | ScrollTrigger end position              |
| `data-gsap-once`        | boolean        | true         | Animate only once (AOS-like)            |
| `data-gsap-markers`     | boolean        | false        | Show ScrollTrigger markers              |
| `data-gsap-scrub`       | boolean/number | false        | Smooth scroll-linked animation          |
| `data-gsap-pin`         | boolean        | false        | Pin element while scrolling             |
| `data-gsap-parallax`    | number         | -            | Parallax speed multiplier               |
| `data-gsap-option`      | string         | -            | 'reverse', 'scrub', or 'replay'         |
| `data-gsap-trigger`     | string         | 'scroll'     | 'load', 'scroll', 'hover', or 'click'   |
| `data-gsap-hover`       | string         | -            | Animation name for hover                |
| `data-gsap-hoverleave`  | string         | -            | Animation name for hover leave          |

### GSAP Easing Presets

```javascript
import { EASINGS } from "gsap-dattebayo";

// Available easings
EASINGS.smooth; // 'power2.out'
EASINGS.smoothIn; // 'power2.in'
EASINGS.elastic; // 'elastic.out(1, 0.3)'
EASINGS.back; // 'back.out(1.7)'
EASINGS.expo; // 'expo.out'
EASINGS.circ; // 'circ.out'
EASINGS.none; // 'none' (linear)
```

---

## 🎯 Framework Integration

### React

```jsx
import { useEffect } from "react";
import { fadeUp, init } from "gsap-dattebayo";

function App() {
  useEffect(() => {
    // Option 1: Auto-init
    init({ autoDetect: true });

    // Option 2: Manual animation
    fadeUp(".element");

    // Cleanup handled automatically by GSAP
  }, []);

  return (
    <div>
      <h1 data-gsap="fadeUp">Auto-animated</h1>
      <p className="element">Manually animated</p>
    </div>
  );
}
```

### Vue

```vue
<template>
  <div>
    <h1 data-gsap="fadeUp">Vue Component</h1>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { init } from "gsap-dattebayo";

onMounted(() => {
  init({ autoDetect: true });
});
</script>
```

### Svelte

```svelte
<script>
  import { onMount } from 'svelte';
  import { init } from 'gsap-dattebayo';

  onMount(() => {
    init({ autoDetect: true });
  });
</script>

<h1 data-gsap="fadeUp">Svelte Component</h1>
```

---

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note:** Modern browsers with ES6 support. For older browsers, use transpilation and polyfills.

---

## 📊 Performance

- **Bundle Size:** ~28KB minified + gzipped (with all features)
- **Tree-Shakeable:** Import only what you need
- **GPU-Accelerated:** Uses GSAP transforms for 60fps
- **Optimized ScrollTrigger:** Batch API for many elements
- **Zero CSS:** All animations via JavaScript (better performance)

---

## 🆚 Comparison

| Feature         | AOS        | Locomotive Scroll | GSAP Dattebayo |
| --------------- | ---------- | ----------------- | -------------- |
| Ease of Use     | ⭐⭐⭐⭐⭐ | ⭐⭐⭐            | ⭐⭐⭐⭐⭐     |
| Power           | ⭐⭐       | ⭐⭐⭐⭐          | ⭐⭐⭐⭐⭐     |
| Presets         | 30         | ~10               | 30+            |
| Text Animations | ❌         | ❌                | ✅             |
| TypeScript      | ❌         | ⭐⭐⭐            | ⭐⭐⭐⭐⭐     |
| File Size       | 12KB       | 35KB              | 28KB           |
| GSAP-Powered    | ❌         | Partial           | ✅ 100%        |

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build library
npm run build

# Watch mode
npm run dev

# Type check
npm run typecheck
```

---

## 📄 License

MIT © 2025 GSAP Dattebayo

---

## 🙏 Credits

- **GSAP** - The animation engine powering everything
- **AOS** - Inspiration for data attribute API
- **Locomotive Scroll** - Parallax inspiration
- **animate-text by learnjk** - SplitText patterns

---

## 🔗 Links

- [Documentation](https://github.com/yourusername/gsap-dattebayo#readme)
- [Examples](https://github.com/yourusername/gsap-dattebayo/tree/main/examples)
- [NPM Package](https://www.npmjs.com/package/gsap-dattebayo)
- [GitHub](https://github.com/yourusername/gsap-dattebayo)
- [Issues](https://github.com/yourusername/gsap-dattebayo/issues)

---

**Made with ❤️ and GSAP**

Simple as AOS, powerful as GSAP. Dattebayo! 🌀
