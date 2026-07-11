import { dts } from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const onwarn = (warning, warn) => {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
};

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
        onwarn,
    },
    {
        input: 'src/index.ts',
        output: {
            file: `lib/index.d.ts`,
            format: 'es',
        },
        plugins: [dts()],
        onwarn,
    },
];
