'use strict';

// // 1. Pending - before the future value is available
// // 2. Settled - async task has finished
// //     a. fulfilled promises
// //     b. rejected promises

// // Most promises come prebuilt and we just need to consume it, like in the case of fetch().

// const request = fetch('https://restcountries.com/v3.1/name/romania');
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => {
//       // res has type 'response', which has a method json() that you can call on it to transform that data into json
//       // ressponse type has a "body" property which is what the json() method returns
//       // for whatever reaons though the json data is also an async operation so it returns a promise that we need to handle with .then() as well
//       console.log(res);
//
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//     });
// };
//
// getCountryData('romania');

// const getCountryDataNoLogs = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => res.json())
//     .then(data => console.log(data));
// };

// getCountryDataNoLogs('spain');

// const chainPromiseExample = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => res.json())
//     .then(data => {
//       const neighbour = data[0].borders[0];
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(res => res.json())
//     .then(data => console.log(data));
// };

// chainPromiseExample('romania');

// // errors can be handled in 2 ways
// // chain a catch() method at the end, which takes the errors itself as a parameter and which "catches" any errors that happened along the way as the chain of promises was handled
// // or add a callback to the then method as a second parameter (less used way cause you need to add it everywhere)
// const handlingErrors = country => {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
//     .finally(() => {
//       // do something you always want to happen
//       // for example hiding loading circle when waiting for content
//     });
// };

// handlingErrors('spain');

// // then() is called when promised is fullfilled, catch() is called when promise is rejected. finally() is always called regardless of which status the promise has.
// // errors are of 2 types:
// // 	- automatic errors like losing internet conection, which causes the promise to throw an error, then we skip to the .catch() method and its handled there
// // manual errors when we throw the error ourselves, also causing the promise to be rejected and then skipped to the .catch() method skipping all the "then()'s" along the way
// const handlingCustomErrors = country => {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found ${country}`);
//       return res.json();
//     })
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
//     .finally(() => {
//       // do something you always want to happen
//       // for example hiding loading circle when waiting for content
//     });
// };

// handlingCustomErrors('spain');

// ///////////////////////////////////////////////////////////////////////////
// const getJSON = (url, errorMsg = 'Something went wrong') => {
//   return fetch(url).then(res => {
//     if (!res.ok) {
//       throw new Error(`${errorMsg} - ${res.status}`);
//     }
//     return res.json();
//   });
// };

// const helperMethodExample = country => {
//   getJSON(
//     `https://restcountries.com/v3.1/name/${country}`,
//     'Country does not exist'
//   )
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
//     .finally(() => {
//       // do something you always want to happen
//       // for example hiding loading circle when waiting for content
//     });
// };

// helperMethodExample('qwe');

// challenge
// TEST COORDINATES: 52.508, 13.381
// TEST2: 19.037, 72.873
// TEST3: -33.933, 18.474
// const whereAmI = (lat, lng) => {
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=162228325041081368636x67248`
//   )
//     .then(res => {
//       if (!res.ok) throw new Error('gg, dis done', res.status);
//       return res.json();
//     })
//     .then(data => {
//       document.querySelector(
//         '.message'
//       ).textContent = `You are in ${data.state}, ${data.country}`;
//
//       return fetch(
//         `https://restcountries.com/v3.1/name/${data.country.toLowerCase()}`
//       );
//     })
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//
//       document.querySelector(
//         '.subMessage'
//       ).textContent = `Region is ${data[0].region}`;
//     })
//     .catch(err => console.log('Oupsie,', err));
// };
//
// // whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);

const countryData = fetch('https://restcountries.com/v3.1/name/romania')
  .then(res => res.json())
  .then(data => console.log(data, typeof data));
