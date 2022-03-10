import { coinFlip } from './modules/coin.mjs';
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
  res.end(`{"flip": "${flip}"}`)
})

// /app/flips/:number

// default endpoint to catch all other requests
app.use(function(req, res) {
  res.status(404).send('404 NOT FOUND');
});
