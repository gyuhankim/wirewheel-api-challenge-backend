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

router.post('/', jsonParser, (req, res) => {
  const giphyURLS = [];
  const searchTerm = req.body.searchTerm.trim().replace(/ /g, '+');

  console.log(`${API_BASE_URL}api_key=${API_KEY}&q=${searchTerm}&limit=${searchLimit}&rating=${rating}`)

  fetch(`${API_BASE_URL}api_key=${API_KEY}&q=${req.body.searchTerm}&limit=${searchLimit}&rating=${rating}`)
    .then(res => res.json())
    .then(data => {
      data.data.map(gif => giphyURLS.push(gif.images.original.url));
      console.log(giphyURLS);
      res.send(giphyURLS);
    })
    .catch(err => {
      res.status(500).send(err.message);
    })
})

module.exports = {router};