// child process context/file => so process obj can send message to parent

type Query = {
  num: number;
};

process.on('message', (message: Query) => {
  const isIt = isPrime(message.num);
  process.send!({ success: true, isPrime: isIt });
  process.exit(); // v important or else orphan processes will eat up the memory
});

// worst possible way of calculating isPrime
// check with => 29355126551
const isPrime = (num: number): boolean => {
  console.time('isPrime took');
  for (let i = 3; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  console.timeEnd('isPrime took');
  return true;
};
