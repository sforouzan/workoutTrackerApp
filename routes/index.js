const pool = require("../config/db_config.js");

module.exports = async (req, res) => {
  const testArr = [
    { name: "Vancouver" },
    { name: "Coquitlam" },
    { name: "Burnaby" },
  ];
  const tagline = "Favourite Cities test:";

  try {
    const result = await pool.query(
      "SELECT * FROM messages ORDER BY created_at DESC"
    );
    res.render("pages/index", {
      testArr: testArr,
      tagline: tagline,
      messages: result.rows,
    });
  } catch (err) {
    console.error("Error fetching messages:", err.stack);
    res.render("pages/index", {
      testArr: testArr,
      tagline: tagline,
      messages: [],
    });
  }
};
