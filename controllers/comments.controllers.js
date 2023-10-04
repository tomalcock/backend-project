const insertComment = require('../models/comments.models.js');

function postComment(req,res,next) {
    const newComment = req.body
    const article_id = req.params.article_id;
    console.log(newComment, article_id)
    // if(+article_id != 'number') {
    //     next({status:400, msg: 'article id is invalid'});
    // }
    insertComment(newComment,article_id)
    .then((newComment) => {
        res.status(201).send({comment:newComment});
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
}

module.exports = postComment;