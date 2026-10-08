const pool = require("./db");

const createSupportTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS support_requests (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(255),
            message TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
    `);
};

const initSupport = async () => {
    await createSupportTable();
    console.log("Support requests table ready");
};

module.exports = { initSupport };