const db = require('../db/connection.js');
const format = require('pg-format');


function fetchUsers() {
    return db.query('SELECT * FROM users')
    .then((response) => {
        return response.rows;
    })
}

function fetchUserByName(username) {
    return db
    .query(`SELECT * FROM users WHERE users.username = $1;`,
    [username])
    .then((result) => {
        if(result.rows.length ===0) {
            return Promise.reject({status:404, msg: "article does not exist"})
        }
        else {
            return result.rows[0];
        } 
    })
}


module.exports = {fetchUsers,fetchUserByName};

