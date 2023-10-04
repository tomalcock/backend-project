const db = require('../db/connection.js')
const format = require('pg-format');

function insertComment({username,body},article_id) {
    return db
    .query(
    `INSERT INTO comments (body, article_id, author) VALUES ($1,$2,$3) RETURNING *;`,
    [body,article_id,username]
    )
    .then((result) => {
        const newComment = result.rows[0]; 
        return newComment;
    })
}

function isUsernameValid(username){
    return db
    .query(
        `SELECT * FROM users WHERE username = $1;`,
        [username]
    )
    .then((response) => {
        if(response.rows.length === 0) {
            return 'false'
        }
        return 'true';
    })
}

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

module.exports = {insertComment,isUsernameValid,fetchComments}
