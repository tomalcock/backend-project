const {fetchArticleByID,fetchArticles} = require('../models/articles.models.js');
const {checkTopicExists} = require('../models/topics.models.js');

function getArticleByID(req,res,next){
    const {article_id} = req.params;
    fetchArticleByID(article_id)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch(err => next(err));
}

function getArticles(req,res,next) {
    const {topic} = req.query
    fetchArticles(topic)
    .then((response) => {
        const articlesObj = {articles: response};
        res.status(200).send(articlesObj)
    })
    .catch((err) => next(err))
}



module.exports = {getArticleByID, getArticles};