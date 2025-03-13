# E-commerce API

This project is an E-commerce API built with Node.js, NestJS, and PostgreSQL using TypeORM.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL

## Installation

1. Clone the repository:

```bash
https://github.com/asadbekiv/e-commerce.git
cd e-commerce-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

```env
PORT=3000
POSTGRES_HOST=your_postgres_host
POSTGRES_PORT=your_postgres_port
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_postgres_db
JWT_SECRET=your_secret_key
```

## Running the Project

1. Start the PostgreSQL server if it's not already running.

```bash
  sudo systemctl start postgresql
```

2. Run the application in dev mode:

```bash
npm start start:dev
```

3. The API will be available at `http://localhost:3000/api/docs`.

## API Documentation

For detailed API documentation, refer to the [API Docs](./docs/api.md).
