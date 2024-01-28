'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  id = Date.now() + '';
  date = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}

class Running extends Workout {
  type = `running`;
  description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
    this.date
  }`;

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;

    this._calcPace();
  }

  _calcPace() {
    this.pace = (this.duration / this.distance).toFixed(2);
  }
}

class Cycling extends Workout {
  type = 'cycling';
  description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
    this.date
  }`;

  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;

    this._calcSpeed();
  }

  _calcSpeed() {
    this.speed = (this.distance / (this.duration / 60)).toFixed(2);
  }
}

class App {
  #map;
  #mapEvent;
  #workouts = [];

  constructor() {
    this._getPosition();

    this._getLocalStorage();

    form.addEventListener('submit', this._submitForm.bind(this));

    inputType.addEventListener('change', this._changeType);

    containerWorkouts.addEventListener(
      'click',
      this._centerWorkoutMarker.bind(this)
    );
  }

  _getPosition() {
    if (!window.navigator.geolocation) return alert("couldn't get position");

    window.navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        return alert("couldn't load map");
      }
    );
  }

  _loadMap(pos) {
    const { latitude: lat, longitude: lng } = pos.coords;
    const coords = [lat, lng];

    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1IjoiY2F0YWxpbmNhdHJpbmEiLCJhIjoiY2wxN2x3N3h0MHIxdTNiczEweGhuYXVzciJ9.AtOYfxzGWPEhesTfBG-G9g',
      }
    ).addTo(this.#map);

    this.#map.on('click', this._openForm.bind(this));
  }

  _openForm(clickedMapEvent) {
    this.#mapEvent = clickedMapEvent;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _changeType(e) {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _submitForm(e) {
    e.preventDefault();

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    const coords = [lat, lng];
    let workout;

    const checkIfNumber = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const checkIfPos = (...inputs) => inputs.every(inp => inp > 0);

    if (type === 'running') {
      const cadence = +inputCadence.value;

      if (
        !checkIfNumber(distance, duration, cadence) ||
        !checkIfPos(distance, duration, cadence)
      ) {
        return alert('error: insert positive numbers');
      }
      workout = new Running(coords, duration, distance, cadence);
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !checkIfNumber(distance, duration, elevation) ||
        !checkIfPos(distance, duration)
      )
        return alert('error: insert positive numbers');

      workout = new Cycling(coords, duration, distance, elevation);
    }

    this.#workouts.push(workout);

    this._renderWorkout(workout);

    this._renderWorkoutMarker(workout);

    this._hideForm();

    this._setLocalStorage();
  }

  _makeWorkoutHTML(workout) {
    const html = `<li class="workout workout--${
      workout.type === 'running' ? 'running' : 'cycling'
    }" data-id="${workout.id}">
  <h2 class="workout__title">${workout.description}</h2>
  <div class="workout__details">
    <span class="workout__icon">${
      workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'
    }</span>
    <span class="workout__value">${workout.distance}</span>
    <span class="workout__unit">km</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⏱</span>
    <span class="workout__value">${workout.duration}</span>
    <span class="workout__unit">min</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⚡️</span>
    <span class="workout__value">${
      workout.type === 'running' ? workout.pace : workout.speed
    }</span>
    <span class="workout__unit">${
      workout.type === 'running' ? 'min/km' : 'km/h'
    }</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">${
      workout.type === 'running' ? '🦶' : '⛰'
    }</span>
    <span class="workout__value">${
      workout.type === 'running' ? workout.cadence : workout.elevation
    }</span>
    <span class="workout__unit">${
      workout.type === 'running' ? 'spm' : 'm'
    }</span>
  </div>
</li>`;

    return html;
  }

  _renderWorkout(workout) {
    containerWorkouts.insertAdjacentHTML(
      'beforeend',
      this._makeWorkoutHTML(workout)
    );
  }

  _renderWorkoutMarker(workout) {
    const marker = L.marker(workout.coords).addTo(this.#map);

    marker
      .bindPopup(
        L.popup({
          maxWidth: 200,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        }).setContent(workout.description)
      )
      .openPopup();
  }

  _hideForm() {
    form.classList.add('hidden');
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';
  }

  _centerWorkoutMarker(e) {
    if (!e.target.closest('.workout')) return;

    this.#workouts.forEach(work => {
      if (e.target.closest('.workout').dataset.id === work.id)
        this.#map.setView(work.coords, 13, {
          animate: true,
          duration: 1,
        });
    });
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => this._renderWorkout(work));
  }
}

const app = new App();
