import '../css/reset.css';
import '../css/style.scss';
import '../css/index.scss';

/**
 * JavaScript module requirers have to be below the stylesheet imports.
 * Otherwise stylesheets which will come with other modules
 * will be added before the main stylesheets. 
 * **/ 

// Make JQuery globally available before the other module calls,
// then it's available in the other modules without having to require it.

import $ from 'jquery';

$(document).ready(() => {
  
});

