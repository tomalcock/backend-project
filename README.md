<a id="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

# Northcoders News API

Welcome to the **Northcoders News API** 

🌐 **Hosted Version**: https://nc-news-backend-project-ohqj.onrender.com/api

## Overview

NC News API is a RESTful API designed to allow the front end to get, post, delete, patch and much more with articles, comments, topic and users.

## Installation and Setup

### Prerequisites

- **Node.js** (v14.0 or later)
- **PostgreSQL** (v12.0 or later)

### Dependencies & DevDependencies

Your project relies on several dependencies and devDependencies. You can find detailed information and documentation for each by following the links provided:

**Dependencies**:

- [dotenv](https://www.npmjs.com/package/dotenv) (v16.3.1)
- [express](https://www.npmjs.com/package/express) (v4.18.2)
- [pg](https://www.npmjs.com/package/pg) (v8.7.3)
- [supertest](https://www.npmjs.com/package/supertest) (v6.3.3)

**DevDependencies**:

- [husky](https://www.npmjs.com/package/husky) (v8.0.2)
- [jest](https://www.npmjs.com/package/jest) (v27.5.1)
- [jest-extended](https://www.npmjs.com/package/jest-extended) (v2.0.0)
- [jest-sorted](https://www.npmjs.com/package/jest-sorted) (v1.0.14)
- [pg-format](https://www.npmjs.com/package/pg-format) (v1.0.4)



1. **Clone the Repository**:

  ```sh
  git clone https://github.com/tomalcock/backend-project.git
  ```

2. **Navigate to the Repository Folder**:

  ```sh
  cd BE-NC-NEWS
  ```

3. **Install Dependencies**:

  ```sh
   npm install
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Database Initialization

1. **Set up the database with tables and schema**

  ```sh
   npm run setup-dbs
  ```

2. **Populate the database with the initial set of data**

  ```sh
   npm run seed
  ```

3. **Populate the database with the data for production**

  ```sh
   npm run seed-prod
  ```

### Setting Up Environment Variables

For local setup, set your environment variables:

1. **Create Environment Files**: After cloning, create `.env.development` and `.env.test` in the root directory

2. **Development Configuration**: In `.env.development`, add:
   `PGDATABASE=nc_news`

3. **Testing Configuration**: In `.env.test`, add:
   `PGDATABASE=nc_news_test`

**Note**: Do not commit `.env.*` files.

### Running Tests

To run all tests:

  ```sh
   npm run test
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## API Endpoints

| Method | Endpoint                           | Description                                      |
| ------ | ---------------------------------- | ------------------------------------------------ |
| GET    | /api                               | List of all available endpoints.                 |
| GET    | /api/topics                        | All topics.                                      |
| GET    | /api/articles                      | All articles.                                    |
| GET    | /api/articles/:article_id          | Specific article by ID.                          |
| GET    | /api/articles/:article_id/comments | Comments for a specific article by ID.           |
| GET    | /api/users                         | All users.                                       |
| POST   | /api/articles/:article_id/comments | Post a comment for a specific article by its ID. |
| PATCH  | /api/articles/:article_id          | Update votes for a specific article by its ID.   |
| DELETE | /api/comments/:comment_id          | Delete a specific comment by its ID.             |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

Special thanks to Northcoders for their continuous support and guidance during the development of this API.
(https://northcoders.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/tom-lacy-alcock-b28b84283/
