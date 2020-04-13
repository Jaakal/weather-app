import '../css/reset.css';
import '../css/style.scss';
import '../css/index.scss';

/**
 * JavaScript module requirers have to be below the stylesheet imports.
 * Otherwise stylesheets which will come with other modules
 * will be added before the main stylesheets. 
 * **/ 

import $ from 'jquery';
import "regenerator-runtime/runtime";

const getWeatherData = async (url) => {
  const response = await fetch(url);
  
  console.log(response);

  if (response.status == 200) {
    let finalResult = await response.json();
    console.log(finalResult);
  } else {
    console.log('No Bueno!');
    // throw new HttpError(response);
  }
} 

const getGif = async (url) => {
  const response = await fetch(url);

  console.log(response);

  const finalResult = await response.json();

  console.log(finalResult.data[0].images.original.url);
  $('.giphy').attr('src', finalResult.data[0].images.original.url);
}

$(document).ready(() => {
  const weatherApiKey = '805c97446a2d8c166cc7b33df92b0b3f';

  $('.search-bar-wrapper').click(() => {
    $('.search-bar-wrapper').addClass('active');

    $('.input-form').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', () => {
      $('.search-input').focus();
      
    });
  });
  
  $('.input-form').submit((event) => {
    event.preventDefault();
    const location = $('.input-form').serializeArray()[0].value;
    getWeatherData(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}`);
  });

  // const location = 'Tallinn';

  // const giphyApiKey = 'lI7fQMkD4zrOHGPXV1mWrpfr1ANktWSz';
  // const searchTerm = 'cloudy';
  // const giphyURL = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${giphyApiKey}&limit=1`;
  // // const giphyURL = `http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=${giphyApiKey}&limit=5`;

  // getWeatherData(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}`);
  // // getWeatherData(`api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${weatherApiKey}`);

  // getGif(giphyURL);
});

