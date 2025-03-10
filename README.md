# Workout Tracker App

A simple web application to log exercises, built with **Express**, **EJS**, and **PostgreSQL**. Users can create, read, and delete workout entries, tracking exercises, weights, reps, notes, and more.

---

## Features

- **Add a new workout entry**
- **View all entries**
- **Delete entries**

---

## Prerequisites

- **Node.js**: Install from [nodejs.org](https://nodejs.org/) (v14+ recommended).
- **PostgreSQL**: Install from [postgresql.org](https://www.postgresql.org/download/) (v12+ recommended).

---

## Project Structure

```
.
├── config/
│   └── db_config.json  # Database config utilizing .env file
├── db/
│   └── setup.sql       # Database and table setup script
├── routes/             # Api and page routes
├── static/
│   ├── css/            # CSS Styling
│   ├── js/             # Client-side JS
├── views/              # EJS templates
│   ├── partials/       # Separated EJS components for reusability
│   └── pages/          # EJS pages rendered via the Express server
├── env.example         # Example .env file for user to create
├── package.json        # Node.js dependencies
├── README.md           # This file
└── server.js           # Express server setup
```

---

## Setup Instructions

### 1. Install Dependencies

1. Open a terminal in the `workoutTrackerApp` folder (this directory).
2. Run the following command to install required packages:
   ```bash
   npm install
   ```

### 2. Set Up PostgreSQL

1. Install PostgreSQL on your system and save the password you've set, you'll need it for a later step.

2. Ensure PostgreSQL is installed and running (default port: **5432**).

   You can test this by running this command:

   ```bash
   psql -U postgres -h localhost -p 5432 -c "SELECT 1;"
   ```

   You should see the following output:

   ```bash
   ?column?
   ----------
           1
   (1 row)
   ```

   _it will return 1 if the connection is successful_

   If you receive an error in your terminal saying something like `command not found: psql`. This error typically means that the psql command-line tool isn't in your system's PATH after installing PostgreSQL.

   You'll want to find the instructions for your specific `OS` and `shell` on how to add the psql PATH to the config.

   [How to Fix "psql Command Not Found" Error in PostgreSQL](https://www.w3resource.com/PostgreSQL/snippets/psql-command-not-found.php#google_vignette)

### 2. Configure the Database Credentials

Open `env.example` in a text editor and copy the contents inside the file.

Then create a new file called `.env` at the project root (same directory as the `env.example`) and paste what you copied.

Replace the `DB_PASSWORD` with your PostgreSQL user password you set. You'll see a placeholder password set as `your_password`, that is what you delete and replace.

If your PostgreSQL setup uses a different user or port, adjust them accordingly.

### 3. Setting up the Application

1. Run the setup script to create the database and required tables:

   ```bash
   psql -U postgres -f db/setup.sql
   ```

   You should see the following output:

   ```bash
    pg_terminate_backend
    ----------------------
    (0 rows)

    psql:db/setup.sql:4: NOTICE:  database "workouttrackerapp" does not exist, skipping
    DROP DATABASE
    CREATE DATABASE
    You are now connected to database "workouttrackerapp" as user "postgres".
    CREATE TABLE
    CREATE TABLE
   ```

### 4. Run the App

Start the server:

```bash
node server.js
```

Open a web browser and navigate to:

```
http://localhost:8080
```

---

## Usage

- **Add an Entry**: Add an exercise (e.g., "Squat"), weight (e.g., 60kg), and reps (e.g., 10), then click "Save to log".
- **View Workout Log**: All gym entries load automatically when you visit the page.
- **Delete an Entry**: Click "Delete" next to an entry and confirm to remove it from the database.

---

## Troubleshooting

- **Port Conflict**: If port `8080` is in use, edit `server.js` and change:

  ```javascript
  app.listen(8080);
  ```

- **Clearing the database**: If you would like to completely clear the database and start fresh, simply re-run the database script `psql -U postgres -f db/setup.sql`.

---

## Dependencies

Defined in `package.json`:

- **express** - Web framework for Node.js
- **ejs** - Templating engine
- **pg** - PostgreSQL client for Node.js
- **dotenv** - Env variable handling
