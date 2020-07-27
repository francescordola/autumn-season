// https://obfuscator.io

let weather;

let api = 'https://api.weatherapi.com/v1/forecast.json?key=';
let api_key = 'dc4a686715f84777a54205229201405';
let city = '&q=Baoshan/Yunnan';

let a, b, c;
let ready = false;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//LOAD THE DATA
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-show');
  clear(0, 0, width, height);

  //SETINTERVAL - To do that put the json file in a new function (gradData) 
  // This happens in an hour, and every hour after
  //setInterval(grabData, 1 secondo * 1 minuto * 1 ora);

  // setInterval(grabData, 1000 * 60 * 60);

  // This happens immediately once
  grabData();
}

function grabData() {
  // loadJSON('https://api.weatherapi.com/v1/forecast.json?key=dc4a686715f84777a54205229201405&q=Baoshan/Yunnan', gotData);
  let url = api + api_key + city;
  loadJSON(url, gotData);
}

//RETREIVE THE DATA
function gotData(data) {
  console.log(data);
  weather = data;

  // if (weather.forecast.forecastday.length > 0) {
  if (weather) {

    //VALUES 
    let temp = map(weather.current.temp_c, 0, 40, 100, 200);
    let prec = map(weather.current.precip_mm, 0, 50, 100, 200);
    let hum = map(weather.current.humidity, 0, 100, 100, 200);

    //LERP COLOUR
    //var temp_color = lerpColor(color(0, 0, 255), color(255, 0, 0), weather.current.temp_c / 40);

    a = new Circle(temp, color(255, 0, 0), 2);
    b = new Circle(prec, color(0, 255, 255), 2);
    c = new Circle(hum, color(200), 2);

    ready = true;

    //TEXT OVER CANVAS
    document.getElementById('time').textContent = weather.location.localtime;
    document.getElementById('temperature').textContent = weather.current.temp_c;
    document.getElementById('humidity').textContent = weather.current.humidity;
    document.getElementById('precipitation').textContent = weather.current.precip_mm;
    document.getElementById('maxtemp_c').textContent = weather.forecast.forecastday[0].day.maxtemp_c;
    document.getElementById('mintemp_c').textContent = weather.forecast.forecastday[0].day.mintemp_c;
    document.getElementById('avgtemp_c').textContent = weather.forecast.forecastday[0].day.avgtemp_c;
    document.getElementById('totalprecip_mm').textContent = weather.forecast.forecastday[0].day.totalprecip_mm;
    document.getElementById('avghumidity').textContent = weather.forecast.forecastday[0].day.avghumidity;
  }
}

//DRAW WITH DATA
function draw() {
  background(255, 3);

  // if we're not ready, finish here for this frame
  if (!ready) return;

  translate(width / 2, height / 2);

  a.move();
  b.move();
  c.move();

  a.show();
  b.show();
  c.show();

}

class Circle {
  constructor(r, c, speed) {

    this.x = 0; // Offset from center instead of the position
    this.y = 0; // Offset from center instead of the position
    this.r = r;
    this.c = c;
    this.speed = speed;

  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);

    this.x = constrain(this.x, -100, 100);
    this.y = constrain(this.y, -100, 100);
  }

  show() {
    blendMode(BURN);
    noStroke();
    fill(red(this.c), green(this.c), blue(this.c), 4);
    ellipse(this.x, this.y, this.r * 2);
  }
}