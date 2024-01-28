'use strict';

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-03-01T17:01:17.194Z',
    '2022-03-07T23:36:17.929Z',
    '2022-03-08T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2022-03-07T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAccount;
let timer;

const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When timer = 0s, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };
  // Set time to 5 minutes
  let time = 120;

  // Call the timer every 1s
  // We exported tick in a separate function so we can call it once right away when
  // loading the page, instead of waiting 1s. And then we set an interval to call
  // it every 1s for us
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

const formatMovementDate = function (date, locale) {
  // convert date string to Date object so we can work with that data

  const calcDaysPassed = (date1, date2) =>
    Math.round(((date1 - date2) / 1000) * 60 * 60 * 24);

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 1) return 'Today';
  else if (daysPassed === 1) return 'Yesterday';
  else if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(0, 2);
  // const month = `${date.getMonth() + 1}`.padStart(0, 2);
  // const year = `${date.getFullYear()}`.padStart(0, 2);
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

// Format currencies with the internationalization API
const formatCurr = function (value, locale, currency) {
  const formatVal = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
  return formatVal;
};

// Display all transactions in the left
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  let sortedMovements =
    sort === true ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  sortedMovements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCurr(mov, acc.locale, acc.currency);

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// createUsernames takes an array of objects as input, and for each element it adds
// a new property called acc.username
// converting string to lowercase, split into an array of 3 elements by space,
// map to a new array only the first char of every element, then join to a string
// without space
const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

// BALANCE
// Calculate current balance in top right and display it
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, val) {
    return acc + val;
  }, 0);
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
};

// Summary in the bottom of the page
const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(value => value > 0)
    .reduce((acc, val) => acc + val);
  labelSumIn.textContent = formatCurr(income, acc.locale, acc.currency);

  const out = acc.movements
    .filter(val => val < 0)
    .reduce((acc, val) => acc + val);
  labelSumOut.textContent = formatCurr(out, acc.locale, acc.currency);

  // interest = 1.2% of every deposit and it only counts if interest >= 1
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(val => (val * acc.interestRate) / 100)
    .filter(val => val >= 1)
    .reduce((acc, val) => acc + val);

  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
};

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// LOGIN
btnLogin.addEventListener('click', function (event) {
  // Prevent form from submitting to not refresh the page - default behaviour of submit
  event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  // this also works
  // if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {}

  // pin property is only read if currentAccount exists - optional chaining lesson
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI
    containerApp.style.opacity = 100;

    // longer way to set up the date without the Intl API
    // // CURRENT DATE - up top under current balance
    // const now = new Date();
    // // pad day and month 2 chars long and with a 0 so we get a nice date format
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0); // getMonth() is zero based so we add 1
    // const year = now.getFullYear();
    // // day/month/year
    // labelDate.textContent = `${day}/${month}/${year}`;

    // Using the Intl API
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Display welcome message in top left corner
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // clear timer if it already exists
    if (timer) clearInterval(timer);
    // start timer
    timer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

// TRANSFER
btnTransfer.addEventListener('click', function (e) {
  // pretty common when working with forms, preventing the default behaviour
  // submit refreshes the page otherwise
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  // look for the account that has the value inputed in the transfer to form
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // checking if transfer amount is > 0, if account transfering has enough money,
  // if receiver account exists, and logged user can't transfer money to himself
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount &&
    receiverAccount.username !== currentAccount.username
  ) {
    // Making the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date()).toISOString();
    receiverAccount.movementsDates.push(new Date()).toISOString();
  }

  // Update UI
  updateUI(currentAccount);

  // Clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';

  // Reset timer
  clearInterval(timer);
  timer = startLogoutTimer();
});

// LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);

      inputLoanAmount.value = '';
    }, 2500);
  }

  // Reset timer
  clearInterval(timer);
  timer = startLogoutTimer(timer);
});

// CLOSE ACCOUNT
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      acc.username === currentAccount.username;
    });
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

// SORT MOVEMENTS
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

labelBalance.addEventListener('click', function () {
  Array.from(document.querySelectorAll('.movements__row')).forEach(function (
    row,
    i
  ) {
    if (i % 2 === 0)
      row.style.backgroundImage =
        'linear-gradient(to top left, #39b385, #9be15d)';
  });

  // Can also do it like this by deconstructing the result of the querySelectorAll and
  // form an array
  [...document.querySelectorAll('.movements__row')].forEach(function (
    row,
    index
  ) {});
});
