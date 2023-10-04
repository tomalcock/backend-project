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

function fetchArticles(topic) {
    if(topic === undefined) {
    return db
    .query(`SELECT articles.article_id,articles.author,articles.title,articles.topic,articles.created_at,articles.votes,articles.article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`)
    .then(response => {
        return response.rows;
    })
} else {
    return db
    .query(`SELECT * FROM articles WHERE articles.topic = $1;`,
    [topic])
    .then((response) => {
        if(response.rowCount === 0) {
            return Promise.reject({status: 404, msg: "topic does not exist"})
        }
        console.log(response)
        return response.rows
    })
}
}

module.exports = {fetchArticleByID, fetchArticles};