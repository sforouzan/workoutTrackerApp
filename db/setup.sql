-- terminate all active connections to the database "workouttrackerapp", except for the connection executing the query itself
SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'workouttrackerapp' AND pid <> pg_backend_pid();

-- Drop the database (must be run as a superuser like 'postgres')
DROP DATABASE IF EXISTS workouttrackerapp;

-- Create the database (must be run as a superuser like 'postgres')
CREATE DATABASE workouttrackerapp;

-- Connect to the database
\c workouttrackerapp;

-- Create the workout_sessions table
CREATE TABLE workout_sessions (
    id SERIAL PRIMARY KEY,
    workout_name VARCHAR(255),
    date DATE,
    notes TEXT
);

-- Create the exercises table
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    workout_session_id INTEGER REFERENCES workout_sessions(id),
    exercise_name VARCHAR(255),
    sets INTEGER,
    reps INTEGER,
    weight INTEGER,
    weight_unit VARCHAR(10),
    distance FLOAT,
);

