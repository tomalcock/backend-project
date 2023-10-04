const {insertComment,isUsernameValid,fetchComments} = require('../models/comments.models.js');

function postComment(req,res,next) {
    console.log('in controllers')
    const newComment = req.body
    const article_id = req.params.article_id;
    const username = newComment.username
    isUsernameValid(username)
    .then((response) => {
        if (response === 'false') {
            next({status:404, msg: 'username not found'})
        } else {
        return
        }
    })
    .then(() => {
        return insertComment(newComment,article_id)
    })
    .then((response) => {
        const newComment = response
        res.status(201).send({comment:newComment});
    })
    .catch((err) => {
        next(err)
    })
}

function getComments(req,res,next) {
    const article_id = req.params.article_id;
    fetchComments(article_id)
    .then((comments) => {
        const commentObj = {comments:comments}
        res.status(200).send(commentObj);
    })
    .catch(err => next(err));
}

module.exports = {getComments,postComment};
