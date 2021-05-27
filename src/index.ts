import express from 'express';
import { fork } from 'child_process';

// parent (single/main) => process context/file

const main = async () => {
  const app = express();

  app.get('/is-prime', (req, res) => {
    const { num } = req.query;
    if (!num) {
      res.status(400).json({ success: false, error: 'Where is your number?' });
      res.end();
      return;
    }
    const childProcess = fork('dist/utils.js');
    childProcess.send({ num: +num });
    childProcess.on('message', (message) => {
      res.send(message);
      res.end();
    });
  });

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

main().catch((err) => console.error(err));
