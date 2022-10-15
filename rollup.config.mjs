import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: `lib/index.js`,
        format: 'cjs',
      },
      {
        file: `lib/index.mjs`,
        format: 'es',
      },
    ],
    plugins: [esbuild()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: `lib/index.d.ts`,
      format: 'es',
    },
    plugins: [dts()],
  },
];
