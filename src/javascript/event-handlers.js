/* eslint-disable import/no-unresolved */
import $ from 'jquery';
/* eslint-enable import/no-unresolved */

import ModifyDOM from './modify-dom';
import Weather from './weather';

const BindEvents = (() => {
  let data;

  $('.unit-toggler span').click(() => {
    $('.unit-toggler span').toggleClass('slide-right');

    ModifyDOM.displayWeatherData(data);
  });

  $('.close-error').click(() => {
    $('.error').removeClass('display-error');
  });

  $('.search-bar-wrapper').click(() => {
    $('.search-bar-wrapper').addClass('active');

    $('.input-form').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', () => {
      $('.search-input').focus();
    });
  });

  $('.input-form').submit(async (event) => {
    event.preventDefault();

    const location = $('.input-form').serializeArray()[0].value;

    try {
      data = await Weather.getWeatherData(location);

      ModifyDOM.displayWeatherData(data);
    } catch (error) {
      $('.error-message').html(error.message);
      $('.error').addClass('display-error');
    }
  });
});

export default BindEvents;
