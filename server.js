const express = require("express");
require("dotenv").config();
const path = require("path");
const axios = require("axios"); // Import Axios for API requests

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname,  "frontend")));
const cors = require("cors");

app.use(cors());
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,  "frontend", "index.html"));
});

// Dynamic route handling based on user input
app.get("/generate-shayari", async (req, res) => {
    //console.log("hi")
    try {
        const shayariType = req.query.type || "Shayaris"; // Default to Shayaris if type is not provided
        const topic = req.query.topic || "love";

        // Customize this part to generate Shayari based on type and topic using OpenAI GPT
        const shayari = await generateShayari(shayariType, topic);
        console.log(shayari)
        res.json({ shayari });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Function to generate Shayari based on type and topic
async function generateShayari(type, topic) {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/engines/davinci/completions", // Use the Davinci engine
            {
                prompt: `Generate ${type} about ${topic}`,
                max_tokens: 50, // Adjust the number of tokens as needed
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const shayari = response.data.choices[0].text;
        return shayari;
    } catch (error) {
        console.error("Error in generateShayari:", error);
        throw error;
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
