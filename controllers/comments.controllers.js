const fetchComments = require('../models/comments.models.js');

function getComments(req,res,next) {
    const article_id = req.params.article_id;
    fetchComments(article_id)
    .then((comments) => {
        const commentObj = {comments:comments}
        res.status(200).send(commentObj);
    })
    .catch(err => next(err));
}

module.exports = getComments;