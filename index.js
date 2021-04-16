// CALL FIREBASE
var firebase = require('firebase');
const express = require('express');
var rp = require('request-promise');

const app = express();

// app.listen(3000, () => console.log('listening at 3000'));
// app.use(express.json({
//   limit: '1mb'
// }));


/* FIREBASE APP SETTING */
//mushrooms - web_setup_firebase account
const firebaseConfig = {
  apiKey: 'AIzaSyDHCmggwS1401guOJDSm55OtY49Cd8syak',
  authDomain: 'mushrooms-67b31.firebaseapp.com',
  databaseURL: 'https://mushrooms-67b31.firebaseio.com',
  projectId: 'mushrooms-67b31',
  storageBucket: 'mushrooms-67b31.appspot.com',
  messagingSenderId: '185370634903',
  appId: '1:185370634903:web:de2b77bec014e58b9c17d2',
  measurementId: 'G-8Z6WWWMCG7'
};
// https://www.npmjs.com/package/firebase 
firebase.initializeApp(firebaseConfig);
// /* END FIREBASE APP SETTING */

/* TAKE DATA FROM JSON API */
// https://www.npmjs.com/package/request-promise -> GET something from a JSON REST API
var options = {
  uri: 'https://api.weatherapi.com/v1/forecast.json', //weather api http
  qs: {
    key: 'dc4a686715f84777a54205229201405', //weather api key
    q: 'Baoshan/Yunnan' //weather api city
  },
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};
/* END TAKE DATA FROM JSON API */

/* GET WEATHER */
function getWeather() {
  rp(options)
    .then(function (data) {
      firebase.database().ref('/').push(data);
      // console.log(data.location, data.current, data.forecast.forecastday[0]);
      // console.log(data.location);
    })
    .catch(function (err) {
      console.error(err);
    });
}

// get weather when the app launches
getWeather();
// ms * s * m * h  - get weather every day
setInterval(getWeather, 1000);

/* CALL DATA */
// call data from database in p5.js https://editor.p5js.org/SionFletcher/sketches/Me24fgNor 

/* other stuff whic i don't know about */
// firebase.database().ref('/').on('value', (a) => {
//     var database = a.val();
//     // Do what you want with the data here...
// });