const request = require("request");

const forecast = (datas, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=4c262dc27d11daf5af6a98e408cce0d9&query=" +
    datas.latitude +
    "," +
    datas.longitude;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather API");
    } else if (response.body.error) {
      callback("Unable to find location");
    } else {
      const data = response.body.current;
      callback(null, {
        forecast:
          data.weather_descriptions[0] +
          ". The temperature is currently " +
          data.temperature +
          "\xB0" +
          "C and feels like " +
          data.feelslike +
          "\xB0" +
          "C. There are " +
          data.precip +
          "% chances of rain.",
        location: datas.location,
      });
    }
  });
};
module.exports = forecast;

// {
//   location: datas.location,
//   weather: data.weather_descriptions[0],
//   temperature: data.temperature,
//   feelslike: data.feelslike,
//   precipitation: data.precip,
// }
