const fetchArticleByID = require('../models/articles.models.js');


function getArticleByID(req,res,next){
    const {article_id} = req.params;
    fetchArticleByID(article_id)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch(err => next(err));
}


module.exports = getArticleByID;