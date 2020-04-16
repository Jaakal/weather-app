const Weather = (() => {
  const getWeatherData = async (location) => {
    const weatherApiKey = '805c97446a2d8c166cc7b33df92b0b3f';
    const units = ['metric', 'imperial'];
    const responseArray = [];

    /* eslint-disable no-await-in-loop */
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
    /* eslint-enable no-await-in-loop */

    return responseArray;
  };

  return { getWeatherData };
})();

export default Weather;
