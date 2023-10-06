const apiRouter = require('express').Router();
const userRouter = require('./users-router.js');
const topicsRouter = require('./topics-router.js');
const articlesRouter = require('./articles-router.js');
const commentsRouter = require('./comments-router.js');

apiRouter.use('/users',userRouter);

apiRouter.use('/topics',topicsRouter);

apiRouter.use('/articles',articlesRouter);

apiRouter.use('/comments',commentsRouter);

module.exports = apiRouter;