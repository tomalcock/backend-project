const insertComment = require('../models/comments.models.js');

function postComment(req,res,next) {
    console.log('you are in controllers')
    const newComment = req.body
    const article_id = req.params.article_id;
    insertComment(newComment,article_id)
    .then((newComment) => {
        res.status(201).send({comment:newComment});
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = postComment;