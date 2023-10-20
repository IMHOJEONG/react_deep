const express = require('express');
const bodyParser = require('body-parser');
const {v4 : uuidv4 } = require('uuid');
const findIndex = require('lodash.findIndex');

const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})