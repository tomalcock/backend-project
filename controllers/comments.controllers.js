const {insertComment,isUsernameValid,fetchComments,removeComment,updateComment} = require('../models/comments.models.js');

function postComment(req,res,next) {
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

function deleteComment(req,res,next) {
    const {comment_id} = req.params;
    removeComment(comment_id)
    .then(() => {
        res.status(204).send();
    })
    .catch(err => next(err));
}

function patchComment(req,res,next) {
    comment_id = req.params.comment_id;
    newVotes = req.body.inc_votes;
    if(newVotes === undefined|| typeof newVotes !== 'number') {
        next({status:400, msg: "must include new votes"});
    }
    updateComment(comment_id,newVotes)
    .then((newComment) => {
        const commentObj = {updatedComment: newComment};
        res.status(200).send(commentObj);
    })
    .catch(err => next(err));
}
module.exports = {getComments,postComment,deleteComment,patchComment};


