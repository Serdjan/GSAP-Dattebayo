import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

const banner = `/*!
 * GSAP Dattebayo v0.1.0-alpha.1
 * The ultimate GSAP-powered scroll animation library
 * https://github.com/serdjan/gsap-dattebayo
 *
 * Copyright ${new Date().getFullYear()} GSAP Dattebayo
 * Released under the MIT License
 */`;

const external = ['gsap', 'gsap/ScrollTrigger', 'gsap/SplitText'];

const createConfig = (input, outputName) => ({
  input,
  external,
  output: [
    // UMD build
    {
      file: `dist/${outputName}.umd.js`,
      format: 'umd',
      name: 'GSAPDattebayo',
      banner,
      globals: {
        gsap: 'gsap',
        'gsap/ScrollTrigger': 'ScrollTrigger',
        'gsap/SplitText': 'SplitText'
      }
    },
    // UMD minified
    {
      file: `dist/${outputName}.umd.min.js`,
      format: 'umd',
      name: 'GSAPDattebayo',
      banner,
      globals: {
        gsap: 'gsap',
        'gsap/ScrollTrigger': 'ScrollTrigger',
        'gsap/SplitText': 'SplitText'
      },
      plugins: [terser()]
    },
    // ESM build
    {
      file: `dist/${outputName}.esm.js`,
      format: 'es',
      banner
    },
    // ESM minified
    {
      file: `dist/${outputName}.esm.min.js`,
      format: 'es',
      banner,
      plugins: [terser()]
    },
    // CommonJS build
    {
      file: `dist/${outputName}.cjs.js`,
      format: 'cjs',
      banner,
      exports: 'auto'
    },
    // CommonJS minified
    {
      file: `dist/${outputName}.cjs.min.js`,
      format: 'cjs',
      banner,
      exports: 'auto',
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false
    })
  ]
});

export default [
  // Main bundle
  createConfig('src/index.ts', 'gsap-dattebayo'),

  // Core animations only
  createConfig('src/core/index.ts', 'core'),

  // Text animations only
  createConfig('src/text/index.ts', 'text'),

  // Scroll animations only
  createConfig('src/scroll/index.ts', 'scroll'),

  // TypeScript definitions
  {
    input: 'src/index.ts',
    external,
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  }
];
