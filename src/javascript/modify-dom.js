/* eslint-disable import/no-unresolved */
import $ from 'jquery';
/* eslint-enable import/no-unresolved */

import Time from './time';
import capitalizeFirstLetter from './utility-functions';

const ModifyDOM = (() => {
  const displayWeatherData = (data) => {
    const index = $('.unit-toggler span').hasClass('slide-right') ? 1 : 0;

    if (data !== undefined) {
      $('.search-result-inner-wrapper').html(`<div class="pin"></div>
      <div class="location">${data[index].name}</div>
      <div class="date-and-time">${Time.getLocationTime(data[index].timezone)}</div>
      <div class="current-temperature">
        <img class="icon" src="http://openweathermap.org/img/wn/${data[index].weather[0].icon}@2x.png" alt="Weather icon"></img>
        <div class="degrees">
          <span>${Math.round(data[index].main.temp)}</span>
          <span>&#176;</span>
        </div>
      </div>
      <div class="temperature-info">${Math.round(data[index].main.temp_max)}&#176;&nbsp;&nbsp;/&nbsp;&nbsp;${Math.round(data[index].main.temp_min)}&#176;&nbsp;&nbsp;&nbsp;<span></span>&nbsp;&nbsp;&nbsp;RealFeel ${Math.round(data[index].main.feels_like)}&#176;</div>
      <div class="description">${capitalizeFirstLetter(data[index].weather[0].description)}</div>`);

      const searchResultWrapperHeight = $('.search-result-inner-wrapper').outerHeight(true);

      $('.search-result-wrapper').css({ height: `${searchResultWrapperHeight}px`, opacity: '1' });
    }
  };

  return { displayWeatherData };
})();

export default ModifyDOM;
