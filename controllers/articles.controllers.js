
const {fetchArticleByID,fetchArticles,updateArticles, insertArticle,isUserValid} = require('../models/articles.models.js');


function getArticleByID(req,res,next){
    const {article_id} = req.params;
    fetchArticleByID(article_id)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch(err => next(err));
}

function getArticles(req,res,next) {
    const userQuery = req.query
    fetchArticles(userQuery)
    .then((response) => {
        const articlesObj = {articles: response};
        res.status(200).send(articlesObj)
    })
    .catch((err) => next(err))
}

function patchArticles(req,res,next) {
    article_id = req.params.article_id;
    newVotes = req.body.inc_votes;
    if(newVotes === undefined|| typeof newVotes !== 'number') {
        next({status:400, msg: "must include new votes"});
    }
    updateArticles(article_id,newVotes)
    .then((newArticle) => {
        const articleObj = {updatedArticle: newArticle};
        res.status(200).send(articleObj);
    })
    .catch(err => next(err));
}

function postArticle(req,res,next) {
    const newArticle = req.body;
    const author = req.body.author;
    const title =req.body.title;
    const body = req.body.body;
    const topic = req.body.topic;
    const article_img_url = req.body.article_img_url;
    if (author === undefined || title === undefined || body === undefined || topic === undefined || article_img_url === undefined ) {
        next({status:400, msg: 'Bad Request'})
    }
    isUserValid(author)
    .then((response) => {
        if (response === 'false') {
            next({status:404, msg: 'username not found'})
        } else {
        return
        }
    })
    .then(() => {
        return insertArticle(newArticle)
    })
    .then((response) => {
        const newArticle = response
        res.status(201).send({article:newArticle});
    })
    .catch((err) => {
        next(err)
    })
}



module.exports = {getArticleByID, getArticles, patchArticles, postArticle};
