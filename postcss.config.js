/* eslint-disable import/no-unresolved */
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
/* eslint-enable import/no-unresolved */

// It is handy to not have those transformations while we developing
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    plugins: [
      autoprefixer,
      cssnano,
      // More postCSS modules here if needed
    ],
  };
}
