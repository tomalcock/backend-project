const db = require('../db/connection.js')
const format = require('pg-format');

function fetchComments(article_id) {
    return db
    .query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,[article_id])
    .then((result) => {
        const comments = result.rows;
        if(comments.length ===0) {
            return Promise.reject({status:404, msg: 'article does not exist'})
        }
        return comments;
    })
}

module.exports = fetchComments;