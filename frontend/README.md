# Frontend

## System Requirements

- **Node.js**: v22.0 or higher
- **Package Manager**: yarn v1.0 or higher

## Installation

0. Enable YARN package manager

   ```sh
   corepack enable
   ```

1. Install dependencies:

   ```sh
   yarn install
   ```

2. Run the local development server:
   ```sh
   yarn workspace frontend dev
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

- `VITE_GRAPHQL_API`: URL for the GraphQL API endpoint. You can set it to the appropriate endpoint for your environment.
- `VITE_APP_BASE_URL_BACKEND`: URL for backend
- `VITE_APP_BASE_URL_BACKEND_LOCAL`: URL for backend (local)

Example `.env` file:

```
VITE_GRAPHQL_API=http://localhost:4000/graphql
VITE_APP_BASE_URL_BACKEND=https://dev-backend-team03-vse.handson.pro
VITE_APP_BASE_URL_BACKEND_LOCAL=http://localhost:4000

```

For more advanced configuration, refer to the `.env.example` file provided in the repository.
