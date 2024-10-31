const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/iplookup/:ip', async (req, res) => {
    const ip = req.params.ip;
    
    // Basic validation for IP format (optional)
    const ipRegex = /^(?!0)(?!.*\.$)(?!.*\.\.)([0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipRegex.test(ip)) {
        return res.status(400).json({ error: 'Invalid IP address format' });
    }

    try {
        const response = await axios.get(`https://joshweb.click/iplu?ip=${ip}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching IP information:', error);
        res.status(500).json({ error: 'Unable to fetch IP information' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
