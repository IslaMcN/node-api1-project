// implement your API here
const express = require('express');
const server = express();
const database = require('./data/db')
server.get('/api/users', (req, res) => {
    database
    .find()
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.send(error);
    });
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    database
    .find(id)
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.send(error);
    });
});

server.post('/api/users', (req, res) => {
    const data = req.body;
    console.log('data', data);
    database
    .add(data)
    .then(dat => {
        res.json({message: 'error saving the data'});
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n**API on Port ${port}**\n`));