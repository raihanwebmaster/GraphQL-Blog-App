
# Blog Application

This is a full-stack blog application built with Node.js, Prisma, GraphQL, TypeScript on the backend and React.js, Tailwind CSS, GraphQL on the frontend.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Schema](#database-schema)
- [Database Relations](#database-relations)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

### Backend

- Node.js
- Prisma
- GraphQL
- TypeScript
- PostgreSQL

### Frontend

- React.js
- Tailwind CSS
- GraphQL

## Prerequisites

- Node.js (v20.x or later)
- PostgreSQL
- Yarn or npm

## Installation

1. Clone the repository:

```bash
git clone https://github.com/raihanwebmaster/blog-application.git
cd blog-application
```

2. Set up the environment variables. Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

3. Install dependencies for both backend and frontend:

```bash
# Install backend dependencies
cd backend
yarn install

# Install frontend dependencies
cd ../frontend
yarn install
```

4. Apply the Prisma migrations to set up the database:

```bash
cd ../backend
npx prisma migrate dev
```

## Database Schema

The database schema is defined using Prisma. The schema is as follows:

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  published Boolean  @default(false)

  @@map("posts")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
  profile   Profile?

  @@map("users")
}

model Profile {
  id        Int      @id @default(autoincrement())
  bio       String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    Int      @unique
  user      User     @relation(fields: [userId], references: [id])

  @@map("profiles")
}
```

## Database Relations

The database schema defines the following relations:

1. **User and Post**: A one-to-many relation where a user can have multiple posts. Each post is linked to a single user via the `authorId` field.

2. **User and Profile**: A one-to-one relation where each user can have one profile, and each profile is linked to a single user via the `userId` field.

Here is a visual representation of the relations:

- A `User` has many `Post`s.
- A `Post` belongs to a single `User`.
- A `User` has one `Profile`.
- A `Profile` belongs to a single `User`.

## Running the Application

### Backend

To start the backend server:

```bash
cd backend
yarn start
```

### Frontend

To start the frontend development server:

```bash
cd frontend
yarn start
```

## Folder Structure

The project structure is as follows:

```
blog-application/
├── server/
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── ...
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
└── README.md
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
