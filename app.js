const express = require("express");

const app = express();

const {readFile} = require('fs/promises');

const getTopics = require('./controllers/topics.controllers.js');

app.use(express.json())

app.get("/api/healthcheck", (req,res) => {
    res.status(200).send({message: "healthcheck complete"})
})

app.get("/api/topics", getTopics);

app.get("/api", (req,res) => {
    readFile('./endpoints.json','utf8').then((file) => {
    const fileContentsObj = JSON.parse(file)
    res.status(200).send(fileContentsObj)
    })
})

app.use((err,req,res,next) => {
    
    res.status(err.status).send({msg: err.msg})
})

app.all('/*', (req,res) => {
    res.status(404).send({msg: "path not found"})
})
module.exports = app;