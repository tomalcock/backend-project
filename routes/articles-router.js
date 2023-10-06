const articlesRouter = require('express').Router()

const {getArticleByID,getArticles,patchArticles,postArticle} = require('../controllers/articles.controllers.js');

const {getComments,postComment} = require('../controllers/comments.controllers.js');

articlesRouter.get('/:article_id', getArticleByID);

articlesRouter.get('/:article_id/comments', getComments);

articlesRouter.get('/', getArticles);

articlesRouter.patch('/:article_id', patchArticles);

articlesRouter.post('/:article_id/comments', postComment)

articlesRouter.post('/', postArticle)

module.exports = articlesRouter;








