const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZ2F1cmF2MzQ0MyIsImEiOiJja2Z5Mmh0ZXoyNXAwMnptenEzNnd1ZnhpIn0.WuBP37YivEaDfS4gCIXGig&limit=1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services");
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try again.");
    } else {
      const data = response.body.features;
      const dataObject = {
        longitude: data[0].center[0],
        latitude: data[0].center[1],
        location: data[0].place_name,
      };
      callback(undefined, dataObject);
    }
  });
};

module.exports = geocode;
