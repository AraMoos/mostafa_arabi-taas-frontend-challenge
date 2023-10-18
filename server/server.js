const client = {
  clientId: 'f10d8361dbbfde11cf9b',
  clientSecret: '1c576c265bed99a6d2abaf2cacd6da351edd0d2f',
};
const headers = { Accept: 'application/json' };
const authBaseUrl = 'https://github.com/login/oauth/';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

var app = express();

app.use(cors());
app.use(bodyParser.json());

// request to get user access token
app.get('/access_token', async (rep, res) => {
  const params = `?client_id=${client.clientId}&client_secret=${client.clientSecret}&code=${rep.query.code}`;
  await fetch(`${authBaseUrl}/access_token${params}`, {
    headers: headers,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
});

app.listen(4000, function () {
  console.log('app is running');
});
