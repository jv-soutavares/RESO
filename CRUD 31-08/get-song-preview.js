module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido.' });
    }
    
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
};
