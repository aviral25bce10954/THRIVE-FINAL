const pool = require("./db");

async function initCheckinSessions() {
  const query = `
    CREATE TABLE IF NOT EXISTS checkin_sessions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

      academic_score INTEGER NOT NULL DEFAULT 0,
      relationship_score INTEGER NOT NULL DEFAULT 0,
      stress_score INTEGER NOT NULL DEFAULT 0,
      sleep_score INTEGER NOT NULL DEFAULT 0,
      confidence_score INTEGER NOT NULL DEFAULT 0,

      primary_category VARCHAR(100),
      secondary_category VARCHAR(100),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("Check-in sessions table ready");
  } catch (error) {
    console.error("Error creating check-in sessions table:", error);
  }
}

module.exports = { initCheckinSessions };