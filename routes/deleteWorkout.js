// routes/deleteWorkout.js
const pool = require("../config/db_config.js");

const deleteWorkoutRoute = async (req, res) => {
  const workoutId = req.params.id; // Extract id from URL parameter

  try {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // CHANGE THE ORDER: First delete associated exercises
      await client.query(
        "DELETE FROM exercises WHERE workout_session_id = $1",
        [workoutId]
      );

      // Then delete the workout session
      const deleteResult = await client.query(
        "DELETE FROM workout_sessions WHERE id = $1 RETURNING id",
        [workoutId]
      );

      if (deleteResult.rowCount === 0) {
        await client.query("ROLLBACK");
        return res.status(404).json({ error: "Workout not found" });
      }

      await client.query("COMMIT");

      res.status(200).json({ message: "Workout deleted successfully" });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Database error:", err.stack);
    res
      .status(500)
      .json({ error: "Failed to delete workout", details: err.message });
  }
};

module.exports = deleteWorkoutRoute;
