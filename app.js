const express = require("express");

const app = express();

const {readFile} = require('fs/promises');

const getTopics = require('./controllers/topics.controllers.js');
const {getArticleByID,getArticles} = require('./controllers/articles.controllers.js')

const {getComments,deleteComment} = require('./controllers/comments.controllers.js')

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

app.delete("/api/comments/:comment_id", deleteComment)

app.all('/*', (req,res) => {
    res.status(404).send({msg: "path not found"})
})

app.use((err,req,res,next) => {
    console.log(err)
    if(err.code === '22P02') {
        res.status(400).send({msg: 'Bad Request'});
    }
    if(err.status && err.msg) {
        res.status(err.status).send({msg: err.msg});
    }
    res.status(500).send({msg: 'server error'});
})

module.exports = app;