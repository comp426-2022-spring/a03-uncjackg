import { coinFlip, coinFlips, countFlips, flipACoin } from './modules/coin.mjs';
import minimist from 'minimist';
import express from 'express';

var HTTP_PORT = 5000;

// allow for custom port argument
const args = minimist(process.argv.slice(1));
const port = args['port'];
if (port) {
  HTTP_PORT = port;
}

// initialize app
const app = express();
const server = app.listen(HTTP_PORT, () => {
  console.log(`App listening on port ${HTTP_PORT}`);
});

/**
 * ENDPOINTS
 */

// /app
app.get('/app/', (req, res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.writeHead(res.statusCode, { 'Content-Type' : 'text/plain' });
  res.end(res.statusCode + ' ' + res.statusMessage);
});

// /app/flip
app.get('/app/flip/', (req, res) => {
  const flip = coinFlip();
  res.end(`{"flip":"${flip}"}`);
});

// /app/flips/:number
app.get('/app/flips/:number', (req, res) => {
  const number = req.params.number;
  const flips = coinFlips(number);
  const count = JSON.stringify(countFlips(flips));
  console.log(count)
  res.end(`{"raw":[${flips}],"summary": ${count}}`)
});

// /app/flip/call/heads
app.get('/app/flip/call/heads', (req, res) => {
  const call = flipACoin('heads');
  res.end(JSON.stringify(call));
});

// /app/flip/call/teal
app.get('/app/flip/call/tails', (req, res) => {
  const call = flipACoin('tails');
  res.end(JSON.stringify(call));
});

// default endpoint to catch all other requests
app.use(function(req, res) {
  res.status(404).send('404 NOT FOUND');
});
