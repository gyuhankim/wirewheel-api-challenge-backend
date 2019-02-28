'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch')

const router = express.Router();

const jsonParser = bodyParser.json();

const API_KEY = 'AP1Ciye7rfsRHW2Mg7YsUyluVmO7IkRO';
const API_BASE_URL = 'http://api.giphy.com/v1/gifs/search?';
const searchLimit = 3;
const rating = 'pg';

router.get('/', (req, res) => {
  fetch(`${API_BASE_URL}api_key=${API_KEY}&q=overwatch&limit=${searchLimit}&rating=${rating}`)
    .then(res => res.json())
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send(err.message);
    })
})

module.exports = {router};