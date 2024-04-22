'use strict';

const getCountryXML = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText)[0];
    console.log(data);
  });
};

// getCountry('romania');

const getCountryPromise = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`);
};
