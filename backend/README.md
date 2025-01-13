# Backend

## System Requirements

- **Node.js**: v22.0 or higher
- **Package Manager**: yarn v1.0 or higher
- **Database**: MySQL v8.0 or higher

## Installation

0. Enable YARN package manager

   ```sh
   corepack enable
   ```

1. Install dependencies:

   ```sh
   yarn install
   ```

2. (optional) Run docker compose for MySQL and Adminer:

   ```sh
   docker compose up -d
   ```

3. Migrate database:

   ```sh
   yarn workspace backend db:migrate
   ```

4. (optional) Seed database:

   ```sh
   yarn workspace backend db:seed
   ```

5. Run the local development server:
   ```sh
   yarn workspace backend dev
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

- `PORT`: The port on which the application runs.
- `JWT_SECRET`: A secret key for signing JSON Web Tokens.
- `MOCKS`: Set to 'true' to enable mock data (for testing purposes).
- `APP_BASE_URL`: The base URL for the backend application.
- `APP_BASE_URL_FRONTEND`: The base URL for the frontend application.
- `DB_HOST`: The host for the database (e.g., localhost or a cloud service).
- `DB_NAME`: The name of the database.
- `DB_USER`: The username for database authentication.
- `DB_PASSWORD`: The password for the database user.
- `DB_PORT`: The port on which the database listens.
- `DB_ROOT_PASSWORD`: The root password for the database (if applicable).
- `EMAIL_USERNAME`: The username/email for the email server.
- `EMAIL_PASSWORD`: The password for the email server (or app-specific password).
- `EMAIL_HOST`: The host of the email server (e.g., smtp.gmail.com).
- `EMAIL_PORT`: The port for the email server (e.g., 587 for TLS).
- `MAPY_API_KEY`: API key for Mapy.cz geocoding service. (https://developer.mapy.cz/en/rest-api-mapy-cz/function/geocoding/)

Example `.env` file:

```
PORT=4000                            # The port on which the application runs
JWT_SECRET=your_jwt_secret_here      # A secret key for signing JSON Web Tokens
MOCKS=false                          # Set to 'true' to enable mock data (for testing purposes)
APP_BASE_URL=http://localhost        # The base URL for the backend application
APP_BASE_URL_FRONTEND=http://localhost:3000  # The base URL for the frontend application
DB_HOST=localhost                    # The host for the database (e.g., localhost or a cloud service)
DB_NAME=example-db                   # The name of the database
DB_USER=example-user                 # The username for database authentication
DB_PASSWORD=your_database_password   # The password for the database user
DB_PORT=3306                         # The port on which the database listens
DB_ROOT_PASSWORD=your_root_password  # The root password for the database (if applicable)
EMAIL_USERNAME=your_email@example.com    # The username/email for the email server
EMAIL_PASSWORD=your_email_password       # The password for the email server (or app-specific password)
EMAIL_HOST=smtp.example.com              # The host of the email server (e.g., smtp.gmail.com)
EMAIL_PORT=587                           # The port for the email server (e.g., 587 for TLS)
MAPY_API_KEY=your_mapy_api_key           # API key for Mapy.cz or another mapping service
```

For more advanced configuration, refer to the `.env.example` file provided in the repository.
