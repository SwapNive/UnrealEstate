// Simple Express server to proxy RapidAPI requests
// This bypasses CORS restrictions by making API calls from the server

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Redirect root to the HTML app
app.get('/', (req, res) => {
    res.redirect('/real-estate-app.html');
});

// Serve static files (your HTML app)
app.use(express.static('.'));

// Proxy endpoint for Realty in US API
app.post('/api/properties', async (req, res) => {
    try {
        const { postal_code, limit = 50 } = req.body;

        if (!postal_code) {
            return res.status(400).json({ error: 'postal_code is required' });
        }

        console.log(`Fetching properties for ZIP: ${postal_code}`);

        const response = await fetch('https://realty-in-us.p.rapidapi.com/properties/v3/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
                'x-rapidapi-key': 'c3775b82eemshd2dac143fd9fe7bp1b9d49jsn0c55402e94f7'
            },
            body: JSON.stringify({
                limit: limit,
                offset: 0,
                postal_code: postal_code,
                status: ["for_sale"],
                sort: {
                    direction: "desc",
                    field: "list_date"
                }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('RapidAPI Error:', data);
            return res.status(response.status).json(data);
        }

        console.log(`Successfully fetched ${data.data?.home_search?.results?.length || 0} properties`);
        res.json(data);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`🚀 Real Estate API Proxy Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoint: http://localhost:${PORT}/api/properties`);
    console.log(`💡 Open http://localhost:${PORT}/real-estate-app.html in your browser`);
});
