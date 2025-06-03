const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let ai;

// Dynamically import the Google GenAI module (ESM)
(async () => {
    const { GoogleGenAI } = await import('@google/genai');

    ai = new GoogleGenAI({
        apiKey: "AIzaSyB53oe5R1h5H7mVPjelBv-UKbACLsn9_Qg"
    });

    // Handle GET request at root URL
    app.get('/', (req, res) => {
        res.send('Gemini API server is running. Use POST / with JSON to get a response.');
    });

    // Handle POST request with prompt
    app.post('/', async (req, res) => {
        try {
            const prompt = req.body.prompt;

            if (!prompt) {
                return res.status(400).json({ error: "Prompt is required." });
            }

            const result = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [prompt]
            });

            const text = result.text;
            res.json({ text });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch response from Gemini API." });
        }
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})();