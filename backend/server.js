const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();

// Ollama API endpoint
const OLLAMA_API = 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = 'mistral';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// ─── Call Ollama ────────────────────────────────────────────────────────────
async function callOllama(prompt) {
    try {
        console.log('Calling Ollama...');
        const response = await axios.post(OLLAMA_API, {
            model: OLLAMA_MODEL,
            prompt: prompt,
            stream: false
        });
        return response.data.response;
    } catch (err) {
        throw new Error('Failed to connect to Ollama. Make sure Ollama is running: ollama serve');
    }
}

// ─── Routes ──────────────────────────────────────────────────────────────────

// Generate code and tests
app.post('/api/generate', async (req, res) => {
    try {
        const { description, language = 'Python' } = req.body;

        if (!description) {
            return res.status(400).json({ error: 'Description is required' });
        }

        console.log(`\n🚀 Generating ${language} code for: ${description.substring(0, 50)}...`);

        // Step 1: Generate main code
        const codePrompt = `You are a code generator. Generate ONLY clean, production-ready code (no explanations, no markdown, just code).

User Request: ${description}
Language: ${language}

Requirements:
- Write ONLY the code
- Make it functional and complete
- Handle edge cases
- Follow best practices for ${language}
- Keep it concise (under 30 lines)

Code:`;

        console.log('⏳ Generating code...');
        const generatedCode = await callOllama(codePrompt);

        // Step 2: Generate tests
        const testPrompt = `Generate unit tests for this ${language} code. Return ONLY the test code (no explanations, no markdown).

Original Code:
${generatedCode}

Generate short unit tests (under 20 lines):`;

        console.log('⏳ Generating tests...');
        const generatedTests = await callOllama(testPrompt);

        console.log('✅ Generation complete!\n');

        res.json({
            success: true,
            code: generatedCode.trim(),
            tests: generatedTests.trim(),
            language,
            timestamp: new Date()
        });
    } catch (err) {
        console.error('❌ Generation error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'AI Code Generator running ✅' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 AI Code Generator running on http://localhost:${PORT}`);
    console.log(`🧠 Using Ollama model: ${OLLAMA_MODEL}`);
    console.log(`📡 Ollama API: ${OLLAMA_API}`);
    console.log(`\n⚠️  Make sure Ollama is running: ollama serve\n`);
});