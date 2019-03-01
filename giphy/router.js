'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch')
const router = express.Router();
const jsonParser = bodyParser.json();
const { User } = require('../users/models');

const { API_KEY } = require('../config');
const API_BASE_URL = 'http://api.giphy.com/v1/gifs/search?';
const searchLimit = 3;
const rating = 'pg';

router.post('/', jsonParser, (req, res) => {
  const giphyURLS = [];
  const searchTerm = req.body.searchTerm.trim().replace(/ /g, '+');

  fetch(`${API_BASE_URL}api_key=${API_KEY}&q=${searchTerm}&limit=${searchLimit}&rating=${rating}`)
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

router.post('/favorites', jsonParser, (req, res) => {
  
  const { username, favorite } = req.body;

  User.findOneAndUpdate({ username }, { $addToSet: { favorites: favorite } }, { new: true })
    .then(result => {
      res.json(result.favorites).status(201);
    })
    .catch(err => {
      res.status(500).send(err.message);
    })
})

module.exports = {router};