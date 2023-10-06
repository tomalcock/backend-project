const users = require('../db/data/test-data/topics.js');
const {fetchUsers,fetchUserByName} = require('../models/users.models.js');

function getUsers(req,res,next) {
    fetchUsers()
    .then((response) => {
        const usersObj = {users: response};
        res.status(200).send(usersObj)
    })
    .catch((err) => next(err))
}

function getUserByName(req,res,next) {
    const {username} = req.params;
    fetchUserByName(username)
    .then((user) => {
        res.status(200).send({user})
    })
    .catch(err => next(err));
}


module.exports = {getUsers,getUserByName};
