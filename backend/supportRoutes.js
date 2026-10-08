const express = require("express");
const {
    createSupportRequest,
    getSupportRequests
} = require("./supportController");

const router = express.Router();

router.post("/", createSupportRequest);

router.get("/", getSupportRequests);

module.exports = router;