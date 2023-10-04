const {fetchComments,removeComment} = require('../models/comments.models.js');

function getComments(req,res,next) {
    const article_id = req.params.article_id;
    fetchComments(article_id)
    .then((comments) => {
        const commentObj = {comments:comments}
        res.status(200).send(commentObj);
    })
    .catch(err => next(err));
}

function deleteComment(req,res,next) {
    const {comment_id} = req.params;
    removeComment(comment_id)
    .then(() => {
        res.status(204).send();
    })
    .catch(err => next(err));
}
module.exports = {getComments,deleteComment};