// pass the workout sessions to the workout-log view
const pool = require("../config/db_config.js");

module.exports = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM workout_sessions ORDER BY date DESC"
    );
    console.log("result.rows", result.rows);
    // get exercises for each workout session
    for (const workoutSession of result.rows) {
      const exerciseResult = await pool.query(
        "SELECT * FROM exercises WHERE workout_session_id = $1",
        [workoutSession.id]
      );
      workoutSession.exercises = exerciseResult.rows;
    }
    res.render("pages/workout-log", { workoutSessions: result.rows });
  } catch (err) {
    console.error("Database error:", err.stack);
    res.status(500).json({ error: "Failed to retrieve workout sessions" });
  }
};
