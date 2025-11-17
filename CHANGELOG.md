# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0-alpha.1] - 2025-01-17

### Added

#### Core Animations
- ✨ Fade animations (fadeIn, fadeOut, fadeUp, fadeDown, fadeLeft, fadeRight)
- ✨ Slide animations (slideInUp, slideInDown, slideInLeft, slideInRight, slideOutUp, slideOutDown)
- ✨ Zoom animations (zoomIn, zoomOut, zoomInUp, zoomInDown, elasticZoom)
- ✨ Rotate animations (rotateIn, rotateOut, flipInX, flipInY, spinIn)
- ✨ Blur animations (blurToFocus, focusToBlur, blurInUp, blurZoom) - 2025 trend

#### Text Animations (SplitText)
- ✨ Character-level animations (charReveal, charFadeUp, charWave, charElastic, charBlur)
- ✨ Word-level animations (wordReveal, wordScaleIn, wordRotateIn, wordSlideAlternate)
- ✨ Line-level animations (lineReveal, lineClipReveal, lineSlideAlternate, lineScaleReveal)
- ✨ Special effects (scrambleReveal, glitchReveal, matrixReveal)

#### Scroll Animations (ScrollTrigger)
- ✨ Parallax effects (parallax, parallaxSpeed, parallaxLayers, parallax3D, parallaxRotate)
- ✨ Scroll reveals (scrollReveal, batchScrollReveal, pinSection, scrubAnimation, horizontalScroll)
- ✨ Progress indicators (scrollProgress, sectionProgress, circularProgress, scrollPercentage)

#### Developer Experience
- ✨ Data attributes API for zero-JavaScript setup
- ✨ Auto-initialization system
- ✨ TypeScript definitions
- ✨ Tree-shakeable ES modules
- ✨ Global configuration system
- ✨ MutationObserver for dynamic content
- ✨ Responsive resize handling

#### Build System
- ✨ Rollup configuration with multiple output formats
- ✨ UMD, ESM, and CommonJS builds
- ✨ Minified versions for production
- ✨ Source maps for debugging
- ✨ Bundle size optimization

#### Documentation
- 📚 Comprehensive README with examples
- 📚 HTML demo pages (CDN and NPM usage)
- 📚 API reference documentation
- 📚 Framework integration guides (React, Vue, Svelte)

### Features

- 🎯 100% GSAP-powered animations (no CSS)
- ⚡ GPU-accelerated for 60fps performance
- 📦 Small bundle size (~28KB minified + gzipped)
- 🎨 30+ preset animations
- 💪 Full TypeScript support
- 🔧 Highly configurable and extensible

### Notes

This is the initial alpha release. Features are stable but API may change before v1.0.0.

All GSAP plugins (ScrollTrigger, SplitText) are now free as of 2025.

---

## [Unreleased]

### Planned for v0.2.0
- Interactive animations (magnetic, cursor-follow, hover-lift)
- Timeline builder API
- Animation composer
- Additional easing presets
- Performance profiler
- React hooks package
- Vue composables
- Smooth scroll integration

### Planned for v1.0.0
- Stable API
- Complete test coverage
- Advanced documentation site
- More examples and templates
- Community animations library
