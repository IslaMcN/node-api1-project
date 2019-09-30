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
        res.json({error: "The users information could not be received."});
    });
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    
    database
    .findById(id)
    .then(data => {if (data){
        res.status(200).json(data)
    }else{
        res.status(404).json({message: "The user with that ID does not exist."})
    }} )
    
    .catch(error => {
        res.status(500).json({message: "The user information could not be retrieved."});
    });
});

server.get('/api/now', (req, res) => {
    const now = new Date(). toISOString();
    res.send(now);
})

server.post('/api/users', (req, res) => {
    const data = req.body;
    console.log('data', data);
    if(!data.bio || !data.name){
        res.status(400).json({message: 'Please provide name and bio for the user.'})
    }else
    database
    .insert(data)
    .then(dat => {
        res.status(201).json(dat);
    })
    .catch(err => {
       
        res.status(500).json({
            err: err,
            message: 'There was an error while saving the user to the database.'
        })
    })
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    database
    .remove(id)
    .then(data => {if (data){
        res.status(200).json(data)
    }else{
        res.status(404).json({message: "The user with that ID does not exist."})
    }} )
    .catch(error => {
        
        res.json({ message: 'error deleting'});
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n**API on Port ${port}**\n`));