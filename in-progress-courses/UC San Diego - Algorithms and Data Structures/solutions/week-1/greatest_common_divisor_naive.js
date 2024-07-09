const GCD = (a, b) => {
  const upperRange = a > b ? b : a;

  for (let i = upperRange; i > 0; i--) {
    if (a % i === 0 && b % i === 0) return i;
  }
};

console.log(GCD(10, 8));
console.log(GCD(357, 234));
