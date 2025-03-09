-- Create the database (must be run as a superuser like 'postgres')
CREATE DATABASE workouttrackerapp;

-- Connect to the database
\c workouttrackerapp;

-- Create the workout_sessions table
CREATE TABLE workout_sessions (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    time TIME,
    workout_name TEXT,
    notes TEXT
);

-- Create the exercises table
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    workout_session_id INT REFERENCES workout_sessions(id) ON DELETE CASCADE,
    exercise_name TEXT NOT NULL,
    sets INT NOT NULL CHECK (sets > 0),
    reps INT NOT NULL CHECK (reps > 0),
    weight NUMERIC,
    weight_unit TEXT CHECK (weight_unit IN ('lbs', 'kg')),
    duration INTERVAL,
    CONSTRAINT weight_check CHECK (weight IS NULL OR weight > 0)
);

-- Insert a sample workout session
INSERT INTO workout_sessions (date, workout_name, notes) 
VALUES ('2025-03-08','09:00:00','Leg Day', 'Felt strong today. Increased weight.');

-- Insert a sample exercise linked to the workout session
INSERT INTO exercises (workout_session_id, exercise_name, sets, reps, weight, weight_unit, duration) 
VALUES (1, 'Squats', 3, 10, 135, 'lbs', NULL);