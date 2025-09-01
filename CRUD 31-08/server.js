// AIzaSyDpcESJ5NIQHp4Yh-DiXATmpeniypVAhZ0
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido.' });
    }
    
    try {
        const { song, artist } = req.body;
        
        if (!song || !artist) {
            return res.status(400).json({ error: 'Título e artista da música são obrigatórios.' });
        }
        
        const prompt = `Forneça um breve contexto histórico, cultural ou social para a música "${song}" de "${artist}". Responda em português do Brasil e mantenha a resposta concisa e direta.`;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.status(200).json({ context: text });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Falha na comunicação com a IA.' });
    }
};

