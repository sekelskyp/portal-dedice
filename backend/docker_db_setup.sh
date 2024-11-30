#!/bin/bash

echo "Stopping and removing existing containers..."
docker compose down --volumes --remove-orphans

echo "Building and starting containers..."
docker compose up --build -d

# Get the database container name dynamically
db_container_name=$(docker compose ps -q db)

# Function to wait for MySQL readiness
function wait_for_mysql {
    echo "Waiting for MySQL to become ready..."
    retries=30
    while ! docker exec $db_container_name sh -c 'mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "SELECT 1;"'; do
        retries=$((retries - 1))
        echo "MySQL not ready yet. Retries left: $retries"
        sleep 2
        if [ $retries -le 0 ]; then
            echo "Database is not ready after multiple retries. Exiting..."
            exit 1
        fi
    done
}

# Wait for the database to be fully ready
wait_for_mysql

echo "Database is ready. Running database migrations..."

# Run database migrations
if ! yarn db:migrate; then
    echo "Database migration failed!"
    exit 1
fi

echo "Database migrations completed. Seeding the database..."

# Run database seed
if ! yarn db:seed; then
    echo "Database seeding failed!"
    exit 1
fi

echo "Database seeding completed successfully. Done!"
