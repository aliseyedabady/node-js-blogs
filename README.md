# Blog Application

This project is a blog application built with Node.js, Express, Knex, Objection.js, TypeScript, and MySQL. It features a robust MVC structure, JWT authentication, refresh tokens, and supports multiple languages.

## Features

- User Authentication: Secure login and registration using JWT and refresh tokens.
- Blog Management: Create, read, update, and delete blog posts.
- Categories: Organize blogs into categories.
- Images: Upload and manage images for blogs and categories.
- Comments: Users can comment on blog posts.
- Multilingual Support: Application supports multiple languages.

## Technologies Used

- Node.js: JavaScript runtime.
- Express: Web framework for Node.js.
- TypeScript: Superset of JavaScript that adds static types.
- Knex.js: SQL query builder for relational databases.
- Objection.js: ORM for Node.js based on Knex.
- MySQL: Relational database.
- JWT: JSON Web Tokens for authentication.
- MVC: Model-View-Controller architecture.

## Getting Started

Prerequisites

- Node.js (>= 12.x)
- MySQL
- npm or yarn

## Installation

1. Clone the repository:

```sh
git clone https://github.com/aliseyedabady/node-js-blogs.git

```

2. Install dependencies:

```sh
npm install
# or
yarn install

```

3. Set up the database:

- Create a MySQL database.
- Update the .env file with your database credentials.

4. Run migrations and seeds:

```sh
npx knex migrate:latest
npx knex seed:run
```

5. Start the application:

```sh
npm run dev
# or
yarn dev
```

## Environment Variables

Create a .env file in the root directory and configure the following variables:

```sh
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=blogs
PORT=8000
JWT_SECRET=JWT_SECRET
MODE=development
```

## License

This project is licensed under the MIT License.
