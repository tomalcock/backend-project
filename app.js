const express = require("express");

const app = express();

const {readFile} = require('fs/promises');

const getTopics = require('./controllers/topics.controllers.js');
const {getArticleByID,getArticles,patchArticles} = require('./controllers/articles.controllers.js')

const getComments = require('./controllers/comments.controllers.js')

app.use(express.json());

app.get("/api/healthcheck", (req,res) => {
    res.status(200).send({message: "healthcheck complete"})
})

app.get("/api", (req,res) => {
    readFile('./endpoints.json','utf8').then((file) => {
    const fileContentsObj = JSON.parse(file)
    res.status(200).send(fileContentsObj)
    })
})

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleByID);

app.get("/api/articles/:article_id/comments",getComments);

app.get("/api/articles", getArticles);

app.patch("/api/articles/:article_id", patchArticles);

app.all('/*', (req,res) => {
    res.status(404).send({msg: "path not found"})
})

app.use((err,req,res,next) => {
    if(err.code === '22P02') {
        res.status(400).send({msg: 'Bad Request'});
    }
    if(err.status && err.msg) {
        res.status(err.status).send({msg: err.msg});
    }
    res.status(500).send({msg: 'server error'});
})

module.exports = app;