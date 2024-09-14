const fibonacci = function (nr) {
  if (nr === 0) return 0;
  else if (nr === 1) return 1;
  else {
    return fibonacci(nr - 1) + fibonacci(nr - 2);
  }
};

console.log(fibonacci(5));
