const apiRouter = require('express').Router();
const userRouter = require('./users-router.js');
const topicsRouter = require('./topics-router.js');
const articlesRouter = require('./articles-router.js');

apiRouter.use('/users',userRouter)

apiRouter.use('/topics',topicsRouter)

apiRouter.use('/articles',articlesRouter)

module.exports = apiRouter;