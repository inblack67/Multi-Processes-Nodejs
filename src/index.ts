import express from 'express';

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

const main = async () => {
  const app = express();

  app.get('/is-prime', (req, res) => {
    const { num } = req.query;
    if (!num) {
      res.status(400).json({ success: false, error: 'Where is your number?' });
      res.end();
      return;
    }
    const isIt = isPrime(+num);
    res.status(200).json({ success: true, isPrime: isIt });
    res.end();
  });

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

main().catch((err) => console.error(err));
