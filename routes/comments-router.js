const commentsRouter = require('express').Router()
const {deleteComment, patchComment} = require('../controllers/comments.controllers');

commentsRouter.delete('/:comment_id', deleteComment);

commentsRouter.patch('/:comment_id', patchComment);


module.exports = commentsRouter;
