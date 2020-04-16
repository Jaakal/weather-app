import '../css/reset.css';
import '../css/style.scss';
import '../css/index.scss';

/**
 * JavaScript module requirers have to be below the stylesheet imports.
 * Otherwise stylesheets which will come with other modules
 * will be added before the main stylesheets.
 * * */

/* eslint-disable import/no-unresolved */
import $ from 'jquery';
import 'regenerator-runtime/runtime';
/* eslint-enable import/no-unresolved */

import BindEvents from './event-handlers';

$(document).ready(() => {
  BindEvents();
});
