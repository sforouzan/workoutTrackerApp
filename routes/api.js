const pool = require("../config/db_config.js");

module.exports = async (req, res) => {
  const { date, workout_name, notes, exercises } = req.body;

  try {
    // Start transaction
    await pool.query("BEGIN");

    // Insert workout session
    const workoutResult = await pool.query(
      "INSERT INTO workout_sessions (date, workout_name, notes) VALUES ($1, $2, $3) RETURNING id",
      [date, workout_name, notes]
    );

    const workoutSessionId = workoutResult.rows[0].id;

    // Insert exercises if provided
    if (exercises && exercises.length > 0) {
      const exerciseQueries = exercises.map(
        ({ exercise_name, sets, reps, weight, weight_unit, duration }) =>
          pool.query(
            "INSERT INTO exercises (workout_session_id, exercise_name, sets, reps, weight, weight_unit, duration) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [
              workoutSessionId,
              exercise_name,
              sets,
              reps,
              weight,
              weight_unit,
              duration,
            ]
          )
      );
      await Promise.all(exerciseQueries);
    }

    // Commit transaction
    await pool.query("COMMIT");

    res
      .status(201)
      .json({ message: "Workout session saved", workoutSessionId });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Database error:", err.stack);
    res.status(500).json({ error: "Failed to save workout session" });
  }
};
