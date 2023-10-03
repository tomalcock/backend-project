const db = require('../db/connection.js')
const format = require('pg-format');


function fetchArticleByID(article_id) {
    return db
    .query('SELECT * FROM articles WHERE article_id = $1',[article_id])
    .then((result) => {

        if(result.rows.length ===0) {
            return Promise.reject({status:404, msg: "article does not exist"})
        }
        else {
            return result.rows[0];
        } 
    })
}

function fetchArticles() {
    console.log('in models')
    return db
    .query(`SELECT comments.article_id,articles.author,articles.title,articles.topic,articles.created_at,articles.votes,articles.article_img_url, SUM(comments.votes) AS comment_count
    FROM comments
    JOIN articles ON articles.article_id = comments.article_id
    GROUP BY comments.article_id,articles.author,articles.title,articles.topic,articles.created_at,articles.votes,articles.article_img_url
    ORDER BY articles.created_at DESC;`)
    .then(response => {
        return response.rows;
    })
}

module.exports = {fetchArticleByID, fetchArticles};