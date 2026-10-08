const pool = require("./db");

const createSupportRequest = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        if (email && !email.includes("@")) {
            return res.status(400).json({
                message: "Please enter a valid email"
            });
        }

        const result = await pool.query(
            `INSERT INTO support_requests (name, email, message)
             VALUES ($1, $2, $3)
             RETURNING id, name, email, message, created_at`,
            [
                name ? name.trim() : null,
                email ? email.trim() : null,
                message.trim()
            ]
        );

        res.status(201).json({
            message: "Support request submitted successfully",
            request: result.rows[0]
        });

    } catch (error) {
        console.error("Support request error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getSupportRequests = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, name, email, message, created_at
             FROM support_requests
             ORDER BY created_at DESC`
        );

        res.json({
            requests: result.rows
        });

    } catch (error) {
        console.error("Get support requests error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createSupportRequest,
    getSupportRequests
};