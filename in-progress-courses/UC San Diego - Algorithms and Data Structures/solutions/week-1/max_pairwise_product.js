// by Alexander Nikolskiy

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding("utf8");
rl.once("line", () => {
  rl.on("line", readLine);
});

function readLine(line) {
  const arr = line.toString().split(" ").map(Number);

  console.log(max(arr));
  process.exit();
}

function max(arr) {
  let obj = {
    index: -1,
    first: 0,
    second: 0,
  };

  for (let i = 0; i < arr.length; i++) {
    if (obj.first < arr[i]) {
      obj.index = i;
      obj.second = obj.first;
      obj.first = arr[i];
    } else if (obj.second < arr[i] && obj.index !== i) {
      obj.second = arr[i];
    }
  }

  return obj.first * obj.second;
}

module.exports = max;
