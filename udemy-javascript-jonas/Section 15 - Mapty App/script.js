'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  id = Date.now() + ''.slice(-10); // generating a random id, usually a library is used for this
  date = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;

    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;

    this.calcSpeed();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  // the constructor method is called immediately after an object is created from the class
  // so we can get the position in the constructor and not have to call app._getPosition
  // outside the class
  constructor() {
    // get position with navigator.geolocation then load the map with leaflet library
    this._getPosition();

    // event for pressing 'enter' key to submit the form
    form.addEventListener('submit', this._newWorkout.bind(this));

    // event for changing input running / cycling in the type field
    inputType.addEventListener('change', this._toggleElevationField);

    // event for centering the pop up location on the map
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

    // get data from local storage
    this._getLocalStorage();
  }

  _getPosition() {
    console.log(navigator);
    if (navigator.geolocation) {
      // using the geolocation API to get current position
      // takes two callbacks, one in case getting the current position is successful
      // and the other in case it fails
      navigator.geolocation.getCurrentPosition(
        // the first (success) callback takes a parameter an object (in this case, we named it position)
        // which has a coords property that himself has properties like latitude, longitude, altitude,
        // accuracy and more
        // we bind the this keyword of _loadMap to the current object that's calling the method,
        // otherwise its this keyword would be set to the this keyword of  getCurrentPosition which
        // is 'undefined' because its a regular function
        this._loadMap.bind(this),
        // second (fail) callback
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(position) {
    console.log(
      'The parameter that the first callback of the getCurrentPosition() function (the success function) is:',
      position
    );

    // we could have used const latitude = position.coords.latitude and
    // const longitude = position.coords.longitude, but deconstructing the position.coords
    // object to get latitude and longitude like this is more modern
    const { latitude, longitude } = position.coords;

    // extra: how to form a google maps link
    console.log(
      `This is how to form a google maps link: https://www.google.com/maps/@${latitude},${longitude}`
    );

    // inserting the coordinates above in an array so we can use them in leaflet
    const coords = [latitude, longitude];

    // using the leaflet library to show the map
    // initializing the map container
    // leaflet gives us the "L" namespace, which has predefined methods that we can use
    // setView method takes two parameters, an array of coordinates and level of zoom
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    // the map is made of small tiles coming from this url (openstreetmap - open source
    // map everyone can use for free)
    // .fr/hot is just a theme (tile server) for the map, we can use any other, like
    // using .org would make the map look different
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // map is an object coming from the leaflet library with methods and properties on it
    console.log('This is the map object', this.#map);

    // the 'on' method is sort of a customized addEventListener but for the leaflet library
    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    // reder the workouts from local storage AFTER the map has loaded
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    console.log(
      'The event handler called "on", coming from the leaflet\'s "map" object takes this event as a parameter which triggers when we click the map and contains information about where on the map we clicked',
      mapE
    );
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    // prevent the default behavior of submit to refresh the page
    e.preventDefault();

    const validInputs = (...inputs) => {
      for (const input of inputs) {
        console.log(Number.isFinite(input), input);
        if (!Number.isFinite(input)) return false;
      }
      return true;

      // or this would work too
      // inputs.every(input => Number.isFinite(input));
    };

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    // destructure the latlng object inside the mapEvent object (which is actually the mapE parameter
    // the "on" method that the map object takes, which contains information about where we clicked
    // on the map) which contains lat and lng
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;

      // Check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs must be positive numbers');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      // Check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs must be positive numbers');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);
    console.log(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form + clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    // all the leaflet methods return "this" so we can chain methods (read leaflet docs for more info)
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️ Running' : '🚴‍♂️ Cyling'} on ${
          workout.date
        }`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    form.insertAdjacentHTML(
      'afterend',
      `<li class='workout workout--${workout.type}' data-id='${workout.id}'>
      <h2 class='workout__title'>${
        workout.type === 'running' ? 'Running' : 'Cyling'
      } on ${workout.date}</h2>
      <div class='workout__details'>
        <span class='workout__icon'>${
          workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'
        }</span>
        <span class='workout__value'>${workout.distance}</span>
        <span class='workout__unit'>km</span>
      </div>
      <div class='workout__details'>
        <span class='workout__icon'>⏱</span>
        <span class='workout__value'>${workout.duration}</span>
        <span class='workout__unit'>min</span>
      </div>
      <div class='workout__details'>
        <span class='workout__icon'>⚡️</span>
        <span class='workout__value'>${
          workout.type === 'running'
            ? workout.pace.toFixed(1)
            : workout.speed.toFixed(1)
        }</span>
        <span class='workout__unit'>${
          workout.type === 'running' ? 'min/km' : 'km/h'
        }</span>
      </div>
      <div class='workout__details'>
        <span class='workout__icon'>${
          workout.type === 'running' ? '🦶' : '✈'
        }</span>
        <span class='workout__value'>${
          workout.type === 'running' ? workout.cadence : workout.elevationGain
        }</span>
        <span class='workout__unit'>${
          workout.type === 'running' ? 'st/m' : 'm'
        }</span>
      </div>
    </li>`
    );
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    // objects coming from local storage wont inherit the click method, so this will give an
    // error after reloading the page
    // workout.click();
  }

  _hideForm() {
    form.classList.add('hidden');

    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
  }

  // local storage is blocking, you should not use it to store large amounts of data
  // local storage is a simple key value store, here we use the key 'workouts' and
  // the second value must always be a string
  // we convert an object to a string using JSON.stringify
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    console.log('Getting local storage:', data);

    if (!data) return;

    this.#workouts = data;

    // the workouts we get from local storage are just regular objects, because we lose the
    // prototype chain after we convert them to strings with JSON.stringify() and back to
    // objects again with JSON.parse(), they're regular objects now, no longer objects that
    // were created by the Running or Cycling classes, so they don't inherit any of their methods
    console.log(this.#workouts);

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset() {
    // we can now use app.reset() in the console to reload the app
    localStorage.removeItem('workouts');

    // locaiton is a big object that contains a lot of methods and properties in the browser
    // one of those allows us to reload the page
    location.reload();
  }
}

const app = new App();
