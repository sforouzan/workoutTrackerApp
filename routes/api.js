const pool = require("../config/db_config.js");

module.exports = async (req, res) => {
  const { date, workout_name, notes, exercises } = req.body;

  try {
    // Start transaction
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Insert workout session
      const workoutResult = await client.query(
        "INSERT INTO workout_sessions (workout_name, date, notes) VALUES ($1, $2, $3) RETURNING id",
        [workout_name, date, notes]
      );

      // Check if we got a valid workout session ID
      if (!workoutResult.rows[0]?.id) {
        throw new Error("Failed to create workout session");
      }

      const workoutSessionId = workoutResult.rows[0].id;
      // Insert exercises if provided
      if (exercises && Array.isArray(exercises) && exercises.length > 0) {
        const exerciseQueries = exercises.map(
          ({ exercise_name, sets, reps, weight, distance }) =>
            client.query(
              "INSERT INTO exercises (workout_session_id, exercise_name, sets, reps, weight, distance) VALUES ($1, $2, $3, $4, $5, $6)",
              [workoutSessionId, exercise_name, sets, reps, weight, distance]
            )
        );
        await Promise.all(exerciseQueries);
      }

      // Commit transaction
      await client.query("COMMIT");

      res
        .status(201)
        .json({ message: "Workout session saved", workoutSessionId });
    } finally {
      client.release();
    }
  } catch (err) {
    // Rollback is handled automatically with client release on error
    console.error("Database error:", err.stack);
    res.status(500).json({
      error: "Failed to save workout session",
      details: err.message,
    });
  }
};
