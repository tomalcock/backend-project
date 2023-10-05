
const {fetchArticleByID,fetchArticles,updateArticles} = require('../models/articles.models.js');


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



module.exports = {getArticleByID, getArticles, patchArticles};