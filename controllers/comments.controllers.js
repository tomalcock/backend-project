const fetchComments = require('../models/comments.models.js');

function getComments(req,res,next) {
    console.log('in controllers')
    fetchComments();
}

module.exports = getComments;