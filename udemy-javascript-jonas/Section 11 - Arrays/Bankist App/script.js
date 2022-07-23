'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

// Display all transactions in the left
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  let sortedMovements =
    sort === true ? movements.slice().sort((a, b) => a - b) : movements;

  sortedMovements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
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
  labelBalance.textContent = `${acc.balance}€`;
};

// Summary in the bottom of the page
const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(value => value > 0)
    .reduce((acc, val) => acc + val);
  labelSumIn.textContent = `${income}€`;

  const out = acc.movements
    .filter(val => val < 0)
    .reduce((acc, val) => acc + val);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  // interest = 1.2% of every deposit and it only counts if interest >= 1
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(val => (val * acc.interestRate) / 100)
    .filter(val => val >= 1)
    .reduce((acc, val) => acc + val);
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

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

    // Display welcome message in top left corner
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

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
  }

  // Update UI
  updateUI(currentAccount);

  // Clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';
});

// LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
  }
  updateUI(currentAccount);

  inputLoanAmount.value = '';
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
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/************************************************ *********************************/
// PRACTICE USING PROJECT VARIABLES (flat, flatMap, Array.from)
// ALSO PRACTICE ARRAY METHODS DOWN BELOW
// flat
// since first maping and then flating is so common, a new method was introduced
// that does both = better performance
const allMovements = accounts.map(acc => acc.movements).flat();
const overallBalance = allMovements.reduce((acc, mov) => acc + mov);

// flatMap
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, val) => acc + val);

// Array.from()
labelBalance.addEventListener('click', function () {
  // We can chain Array.from and call map() on it, or we can just specify
  // how we want it to map as the second parameter of Array.from
  // remember that Array.from(): 1st param - iterator, 2nd param - return value, just like
  // a map - replace the raw element to its text content and replace € with nothing
  const movementsUI1 = Array.from(
    document.querySelectorAll('.movements__value'),
    elem => Number(elem.textContent.replace('€', ''))
  );

  const movementsUI2 = Array.from(
    document.querySelectorAll('.movements__value')
  ).map(el => Number(el.textContent.replace('€', '')));

  // Can also destructure the result of querySelectorAll to form an array of elements
  const movementsUI3 = [...document.querySelectorAll('.movements__value')].map(
    e => Number(e.textContent.replace('€', ''))
  );

  console.log(movementsUI1, movementsUI2, movementsUI3);
});

// Array methods practice
// 1. Sum of all deposits
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur);

// 2. How many deposits over 1000 - two ways
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 1000).length;

const numDeposits1000alt = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, val) => (val > 1000 ? acc + 1 : acc), 0);

// var++ vs ++var
let a = 10;
let b = a++; // b is still 10 because a was incremented but returned the old value = 10

let c = 10;
b = ++c; // b is now 11 because c was incremented and returned its incremented value = 11

// 3. Use reduce to save all deposits and withdrawals in an object
// assign the initial value of the accumulator to be an object, instead of 0 or the first
// value like I used it until now
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

// 4. create a fct to convert a string to a title case
// his is a nice title => This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  // for the situation in case the exception is the first word, we want to capitalize it
  return capitalize(titleCase);
};
