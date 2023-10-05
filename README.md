# Northcoders News API


You will need to create two .env files in the root folder: .env.test and .env.development. Into each, add PGDATABASE=, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

Here is a link to the hosted version: https://nc-news-backend-project-ohqj.onrender.com/api/comments

Summary of the project:

Instructions:
To clone, follow this link to the repository: https://github.com/tomalcock/backend-project

To install the dependencies, 'npm install' into the terminal

You will need the following dev dependencies if you are working on this repo. Below is the list and then what you need to type in the terminal:

1 - jest
(npm install jest -D)

2 - jest extended 
(npm install --save-dev jest-extended)

3 - jest sorted
(npm install --save-dev jest-sorted)

4 - supertest
(npm install supertest -D)

5 - nodemon - just in case you would like to test the endpoints using insomnia
(npm install nodemon -D)

Make sure the following is in the base level of your package json:
"jest": {
    "setupFilesAfterEnv": [
      "jest-extended/all",
      "jest-sorted"
    ]
}

Make sure to add the following scripts to the package.json:
"setup-dbs": "psql -f ./db/setup.sql",
"seed": "node ./db/seeds/run-seed.js",
"test": "jest",
"testa": "jest app.test.js",
"dev": "nodemon listen.js",
"playground": "psql -f ./playground.sql > playground.txt"

npm run setup-dbs - will initially setup the databse
npm run seed - will seed the database
npm run test - will run app.test and utils.test
npm run testa - will just run app.test (particularly useful after initial setup)

Would recommend node version 20.5.1 or later
Would recommend postgres version 14.9 or later
