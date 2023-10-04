const express = require("express");

const app = express();

const {readFile} = require('fs/promises');

const getTopics = require('./controllers/topics.controllers.js');
const {getArticleByID,getArticles} = require('./controllers/articles.controllers.js')
const postComment = require('./controllers/comments.controllers.js');

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

app.get("/api/articles", getArticles);

app.post("/api/articles/:article_id/comments", postComment)

app.all('/*', (req,res) => {
    res.status(404).send({msg: "path not found"})
})

app.use((err,req,res,next) => {
    //console.log(err)
    //console.log(err.code)
    if(err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
    }
    if(err.length === 240) {
        res.status(400).send({msg: 'Bad Request'})
    }
    if(err.constraint === 'comments_article_id_fkey') {
        res.status(404).send({msg: 'not found'})
    }
    if(err.code === '22P02'|| err.code === '23503') {
        res.status(400).send({msg: 'Bad Request'})
    }
    if(err.code === '23502') {
        res.status(404).send({msg: 'not found'})
    }
    res.status(err.status).send({msg: err.msg})
})

module.exports = app;