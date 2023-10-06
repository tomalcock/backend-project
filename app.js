const express = require("express");
const app = express();
const {readFile} = require('fs/promises');
const getTopics = require('./controllers/topics.controllers.js');
const {getArticleByID,getArticles,patchArticles} = require('./controllers/articles.controllers.js');
const getUsers = require('./controllers/users.controllers.js');
const {getComments,postComment,deleteComment} = require('./controllers/comments.controllers.js');
const apiRouter = require('./routes/api-router.js')

app.use(express.json());

app.get("/api", (req,res) => {
    readFile('./endpoints.json','utf8').then((file) => {
    const fileContentsObj = JSON.parse(file)
    res.status(200).send(fileContentsObj)
    })
})
app.use('/api', apiRouter);




// app.delete("/api/comments/:comment_id", deleteComment);


app.all('/*', (req,res) => {
    res.status(404).send({msg: "path not found"})
})

app.use((err,req,res,next) => {
    if(err.status && err.message) {
        res.status(err.status).send({msg: err.message})
    }
    if(err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
    }
    if(err.code === '22P02'|| err.code === '23502') {
        res.status(400).send({msg: 'Bad Request'})
    }
    if(err.code === '23503') {
        res.status(404).send({msg: 'not found'})
    }
    res.status(err.status).send({msg: err.msg})
})

module.exports = app;