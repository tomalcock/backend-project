const db = require('../db/connection.js')
const format = require('pg-format');

function insertComment({username,body},article_id) {
    return db
    .query(
    `INSERT INTO comments (body, article_id, author) VALUES ($1,$2,$3) RETURNING author,body;`,
    [body,article_id,username]
    )
    .then((result) => {
        const newComment = result.rows[0]; 
        return newComment;
    })
}


module.exports = insertComment