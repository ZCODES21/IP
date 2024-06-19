const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/iplookup/:ip', async (req, res) => {
    const ip = req.params.ip;
    try {
        const response = await axios.get(`https://openapi-idk8.onrender.com/iplookup/${ip}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch IP information' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
