const pool = require("./db");

const createCheckin = async (req, res) => {
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
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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

        res.status(201).json({
            message: "Check-in saved successfully",
            checkin: result.rows[0]
        });

    } catch (error) {
        console.error("Check-in save error:", error);

        res.status(500).json({
            message: "Unable to save check-in"
        });
    }
};


const getLatestCheckin = async (req, res) => {
    try {
        const { userId } = req.params;

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

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "No previous check-in found"
            });
        }

        res.json({
            checkin: result.rows[0]
        });

    } catch (error) {
        console.error("Latest check-in error:", error);

        res.status(500).json({
            message: "Unable to get previous check-in"
        });
    }
};


module.exports = {
    createCheckin,
    getLatestCheckin
};