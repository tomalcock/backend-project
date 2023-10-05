const db = require('../db/connection.js');
const format = require('pg-format');


function fetchTopics() {
    return db.query('SELECT * FROM topics')
    .then((response) => {
        return response.rows;
    })
}

function checkTopicExists(topic) {
        return db.query('SELECT * FROM topics WHERE topics.slug = $1;',
    [topic])
    .then((response) => {
        if(response.rows.length === 0) {
            return Promise.reject({status:404, msg: "topic does not exist"})
        } else{
        return 
        }
    })
} 



module.exports = {fetchTopics,checkTopicExists};
