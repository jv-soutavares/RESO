const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const app = express();

// IMPORTANTE: Para segurança, use variáveis de ambiente para a sua API Key.
// Por exemplo: new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI("AIzaSyDpcESJ5NIQHp4Yh-DiXATmpeniypVAhZ0");

app.use(express.json());
app.use(cors());

// Rota para verificar se a API está no ar.
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});

app.post('/api/get-song-context', async (req, res) => {
    try {
        const { song, artist } = req.body;
        const prompt = `Forneça um breve contexto histórico, cultural ou social para a música "${song}" de "${artist}". Responda em português do Brasil e mantenha a resposta concisa e direta.`;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ context: text });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Falha na comunicação com a IA.' });
    }
});

app.post('/api/get-song-preview', async (req, res) => {
    const { song, artist } = req.body;
    if (!song || !artist) {
        return res.status(400).json({ error: 'Título e artista da música são obrigatórios.' });
    }

    try {
        const deezerApiUrl = `https://api.deezer.com/search?q=${encodeURIComponent(song + ' ' + artist)}&limit=1`;
        const response = await fetch(deezerApiUrl);
        const data = await response.json();

        if (data.data && data.data.length > 0 && data.data[0].preview && data.data[0].album.cover_medium) {
            const previewUrl = data.data[0].preview;
            const coverUrl = data.data[0].album.cover_medium;

            res.json({ 
                previewUrl: previewUrl,
                coverUrl: coverUrl
            });
        } else {
            res.status(404).json({ error: 'Pré-visualização ou capa da música não encontrada.' });
        }
    } catch (error) {
        console.error('Erro ao buscar a pré-visualização:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar a pré-visualização.' });
    }
});

module.exports = app;
