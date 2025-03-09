-- Create the database (must be run as a superuser like 'postgres')
CREATE DATABASE myapp;

-- Connect to the database (in psql, use \c myapp; in script, we assume they’ll switch manually)
-- Note: Some environments might require running this separately

-- Create the messages table
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a sample row (optional, for testing)
INSERT INTO messages (content) VALUES ('Sample message from setup');