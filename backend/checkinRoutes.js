const express = require("express");
const pool = require("./db");

const router = express.Router();


// SAVE CHECK-IN
router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      academic_score,
      relationship_score,
      stress_score,
      sleep_score,
      confidence_score,
      primary_category,
      secondary_category
    } = req.body;

    console.log("Saving check-in for user:", user_id);

    if (!user_id) {
      return res.status(400).json({
        message: "user_id is required"
      });
    }

    const result = await pool.query(
      `
      INSERT INTO checkin_sessions
      (
        user_id,
        academic_score,
        relationship_score,
        stress_score,
        sleep_score,
        confidence_score,
        primary_category,
        secondary_category
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
      [
        user_id,
        academic_score || 0,
        relationship_score || 0,
        stress_score || 0,
        sleep_score || 0,
        confidence_score || 0,
        primary_category || null,
        secondary_category || null
      ]
    );

    console.log("Check-in saved:", result.rows[0]);

    res.status(201).json({
      message: "Check-in saved successfully",
      checkin: result.rows[0]
    });

  } catch (error) {
    console.error("Error saving check-in:", error);

    res.status(500).json({
      message: "Failed to save check-in"
    });
  }
});


// GET LATEST CHECK-IN FOR ONE USER
router.get("/user/:userId/latest", async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("Fetching latest check-in for user:", userId);

    const result = await pool.query(
      `
      SELECT *
      FROM checkin_sessions
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [userId]
    );

    console.log("Latest check-in result:", result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No previous check-in found"
      });
    }

    res.status(200).json({
      checkin: result.rows[0]
    });

  } catch (error) {
    console.error("Error fetching latest check-in:", error);

    res.status(500).json({
      message: "Failed to fetch check-in"
    });
  }
});


// GET ALL CHECK-INS FOR ONE USER
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM checkin_sessions
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.status(200).json({
      checkins: result.rows
    });

  } catch (error) {
    console.error("Error fetching check-ins:", error);

    res.status(500).json({
      message: "Failed to fetch check-ins"
    });
  }
});


module.exports = router;