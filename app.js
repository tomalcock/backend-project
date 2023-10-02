const express = require("express");

const app = express();

const getTopics = require('./controllers/topics.controllers.js')

app.get("/api/healthcheck", (req,res) => {
    res.status(200).send({message: "healthcheck complete"})
})

app.get("/api/topics", getTopics);

app.use((err,req,res,next) => {
    res.status(err.status).send({msg: err.msg})
})

app.all('/*', (req,res) => {
    res.status(404).send({msg: "path not found"})
})
module.exports = app;