import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import replace  from '@rollup/plugin-replace';

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json'];
const env = process.env.NODE_ENV;
export default [
  {
    input: './src/index.js',
    output: [
      {
        esModule: false,
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
        sourcemap: true
      }
    ],
    plugins: [
      postcss({
        plugins: [],
        minimize: true,
      }),
      babel({
        babelrc: false,
        presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
        plugins: [["@babel/plugin-proposal-class-properties", { "loose": true }]],
        extensions: EXTENSIONS,
        exclude: 'node_modules/**'
      }),
      commonjs({
        include: "node_modules/**",
        namedExports: {
          'node_modules/prop-types/index.js': [ 'PropTypes' ]
        }
      }),
      external({
        includeDependencies: true,
      }),
      resolve({
        extensions: EXTENSIONS,
        preferBuiltins: false,
      }),
      replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
      env === 'production' && terser()
    ]
  }
];
