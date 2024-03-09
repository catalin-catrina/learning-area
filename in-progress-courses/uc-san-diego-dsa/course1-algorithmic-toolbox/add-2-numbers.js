const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  const num1 = parseInt(input.split(" ")[0]);
  const num2 = parseInt(input.split(" ")[1]);
  console.log(num1 + num2);
  rl.close();
});
