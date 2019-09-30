// implement your API here
const express = require('express');
const server = express();
const database = require('./data/db')
server.use(express.json());
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
    .findById(id)
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.send(error);
    });
});

server.get('/api/now', (req, res) => {
    const now = new Date(). toISOString();
    res.send(now);
})

server.post('/api/users', (req, res) => {
    const data = req.body;
    console.log('data', data);
    database
    .insert(data)
    .then(dat => {
        res.status(201).json(dat);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'failed to create'
        })
    })
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    database
    .remove(id)
    .then(dat => {
        res.json(dat);
    })
    .catch(error => {
        res.json({ message: 'error deleting'});
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n**API on Port ${port}**\n`));