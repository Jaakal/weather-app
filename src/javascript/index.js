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

const getWeatherData = async (location) => {
  const weatherApiKey = '805c97446a2d8c166cc7b33df92b0b3f';
  const units = ['metric', 'imperial'];
  const responseArray = [];

  for (let i = 0; i < units.length; i += 1) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}&units=${units[i]}`);

    switch (response.status) {
      case 200:
        responseArray.push(await response.json());
        break;
      case 401:
        throw new Error('Problems with API key, contact the owner!');
      case 404:
        throw new Error('Wrong city name!');
      case 429:
        throw new Error('FREE tariff limit exceeded, wait for a minute and try again!');
      default:
        throw new Error('Maintenance needed, contact the owner!');
    }
  }

  return responseArray;
} 

const displayWeatherData = (data) => {
  const index = $('.unit-toggler span').hasClass('slide-right') ? 1 : 0;

  if (data !== undefined) {
    $('.location').html(data[index]['name']);
    $('.date-and-time').html(getLocationTime(data[index]['timezone']));
    $('.current-temperature .icon').attr('src', `http://openweathermap.org/img/wn/${data[index]['weather'][0]['icon']}@2x.png`);
    $('.current-temperature .degrees span:nth-of-type(1)').html(Math.round(data[index]['main']['temp']));
    $('.temperature-info').html(`${Math.round(data[index]['main']['temp_max'])}&#176;&nbsp;&nbsp;/&nbsp;&nbsp;${Math.round(data[index]['main']['temp_min'])}&#176;&nbsp;&nbsp;&nbsp;<span></span>&nbsp;&nbsp;&nbsp;RealFeel ${Math.round(data[index]['main']['feels_like'])}&#176;`);
    $('.description').html(capitalizeFirstLetter(data[index]['weather'][0]['description']));
  }
}

const getLocationTime = (offset) => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysInAMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const lastLeapYear = 2020;
  
  const date = new Date();
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth();
  let monthDay = date.getUTCDate();
  let weekDay = date.getUTCDay();
  let hours = date.getUTCHours() + Math.floor(offset / 3600);
  let minutes = date.getUTCMinutes() + ((offset / 60) % 60);

  if ((year - lastLeapYear) % 4 === 0) {
    daysInAMonth[1] = 29;
  }

  if (minutes >= 60) {
    minutes -= 60;
    hours += 1;
  } else if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  } 
  
  if (hours >= 24) {
    hours -= 24;
    weekDay += 1;
  } else if (hours < 0) {
    hours += 24;
    weekDay -= 1;
  }

  if (weekDay >= 7) {
    weekDay -= 7;
    monthDay += 1;
  } else if (weekDay < 0) {
    weekDay += 7;
    monthDay -= 1;
  }
  
  if (monthDay > daysInAMonth[month]) {
    monthDay -= daysInAMonth[month];
    month += 1;
  } else if (monthDay < 0) {
    monthDay = daysInAMonth[month - 1];
    month -= 1;
  }

  if (month >= 12) {
    year += 1;
    month -= 12;
  } else if (month < 0) {
    year -= 1;
    month = 11;
  }

  return `${weekDays[weekDay]}, ${monthDay} ${months[month]} ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getGif = async (url) => {
  const response = await fetch(url);

  console.log(response);

  const finalResult = await response.json();

  console.log(finalResult.data[0].images.original.url);
  $('.giphy').attr('src', finalResult.data[0].images.original.url);
}

$(document).ready(() => {
  let data;
  
  $('.unit-toggler span').click(() => {
    $('.unit-toggler span').toggleClass('slide-right');
    displayWeatherData(data);
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
      data = await getWeatherData(location);
      displayWeatherData(data);

      console.log(data);
    } catch (error) {
      $('.error-message').html(error.message);
      $('.error').addClass('display-error');
      console.error(error);
    }
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

