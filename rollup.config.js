import minify from 'rollup-plugin-babel-minify';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'iife',
  },
  plugins: [
    minify(),
    postcss({
      extract: true,
      minimize: true,
    }),
  ],
};
