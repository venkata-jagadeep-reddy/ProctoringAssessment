const express = require('express');
const axios = require('axios'); // Install this: npm install axios

const router = express.Router();

router.post('/ml/detect', async (req, res) => {
    const { text } = req.body;

    try {
        const response = await axios.post('http://127.0.0.1:5000/detect', { text });
        res.json(response.data);
    } catch (error) {
        console.error("Error communicating with Flask:", error.message);
        res.status(500).json({ error: "ML service unavailable" });
    }
});

module.exports = router;
