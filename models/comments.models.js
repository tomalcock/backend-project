const db = require('../db/connection.js')
const format = require('pg-format');

function insertComment({username,body},article_id) {
    console.log('in models')
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
    console.log('you are in usernameValid')
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


module.exports = {insertComment,isUsernameValid}