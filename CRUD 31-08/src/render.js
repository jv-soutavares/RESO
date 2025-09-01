// render.js
// Importa os scripts auxiliares
import { renderCharts } from './chart.js';
import { Music } from './lib.js';
import { setupCarousels } from './carousel.js'; // Importa a função de carrossel

// Abre o modal, alterando o estilo de exibição para 'flex'
const openModal = (modalElement) => {
    if (modalElement) {
        modalElement.style.display = 'flex';
    }
};

// Fecha o modal, removendo a propriedade de exibição/display
const closeModal = (modalElement) => {
    if (modalElement) {
        modalElement.style.removeProperty('display');
    }
};

// API'S

// Gemini -> Contexto
const fetchSongContext = async (songTitle, artistName) => {
    try {
        const response = await fetch('http://localhost:3000/api/get-song-context', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                song: songTitle,
                artist: artistName
            })
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        return data.context;

    } catch (error) {
        console.error('Erro ao buscar contexto:', error);
        return 'Não foi possível carregar o contexto da música no momento.';
    }
};

// Deezer -> imagem de capa
export const fetchAndSetCoverArt = async (songsToDisplay, state) => {
    for (const song of songsToDisplay) {
        // Verifica se a capa já existe para evitar chamadas duplicadas
        const card = document.querySelector(`.card[data-id="${song.id}"]`);
        const imageElement = card?.querySelector('.card-image-placeholder img');
        
        if (imageElement && !imageElement.src.includes('default-cover.png')) {
            continue; // Pula se a imagem já foi carregada
        }

        const songWithCover = await Music.getSongWithCover(song);
        if (songWithCover) {
            song.capa = songWithCover.capa; // Atualiza a propriedade capa no estado
            if (imageElement) {
                imageElement.src = songWithCover.capa;
            }
        }
    }
    // Salva o estado atualizado no localStorage
    Music.saveSongs(state.songs);
};

// Funções de utilidade e lógicas de display
// Função createSongCard com o botão de contexto adicionado
const createSongCard = (song, currentPage) => {
    const isLiked = song.liked ? 'liked' : '';
    
    let removeBtnHTML = '';
    let contextBtnHTML = '';
    
    // Adiciona os botões de remover e de contexto apenas na página de exploração
    if (currentPage === 'explore') {
        removeBtnHTML = `<button class="remove-btn" data-song-id="${song.id}"><i class="fas fa-trash-alt"></i></button>`;
        contextBtnHTML = `
            <button class="context-btn" data-song-id="${song.id}">
                <i class="fas fa-book"></i>
            </button>`;
    }

    const imageSource = song.capa || './img/default-cover.png';

    const html = `
        <div class="card" data-id="${song.id}">
            <div class="card-image-placeholder">
                <img src="${imageSource}" alt="${song.title} - ${song.artist}">
                <button class="play-pause-btn" data-song-id="${song.id}">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <div class="card-details">
                <div class="card-details-text">
                    <h2>${song.title}</h2>
                    <h3>${song.artist}</h3>
                    <h4>${song.year}</h4>
                </div>
            </div>
            <div class="card-actions">
                <i class="fas fa-heart card-heart-icon ${isLiked}" data-song-id="${song.id}"></i>
                ${removeBtnHTML}
                ${contextBtnHTML}
            </div>
        </div>
    `;
    return html;
};

// Funções de renderização de páginas
const renderHomePage = (state) => {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    const genres = ['mpb', 'soul', 'rock', 'rock alternativo', 'pop'];

    const genreCarouselsHTML = genres.map(genre => {
        const songsByGenre = Music.createPlaylistByGenre(state.songs, genre);

        if (songsByGenre.length === 0) {
            return '';
        }

        const carouselHTML = songsByGenre.slice(0, 10).map(createSongCard).join('');
        
        const capitalizedGenre = genre.charAt(0).toUpperCase() + genre.slice(1);
        const safeGenreId = genre.replace(/\s+/g, '-').toLowerCase();

        return `
            <div class="carousel-section">
                <h2 class="section-title">${capitalizedGenre}</h2>
                <div class="carousel-container genre-carousel-${safeGenreId}">
                    ${carouselHTML}
                </div>
                <div class="carousel-scrollbar-container">
                    <div class="carousel-scrollbar-thumb"></div>
                </div>
                <button class="carousel-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
                <button class="carousel-btn next-btn"><i class="fas fa-chevron-right"></i></button>
            </div>
        `;
    }).join('');

    mainContent.innerHTML = `
        <div class="landing-page-content">
            <div class="hero-card">
                <h1>Bem-vindo ao Reso.</h1>
                <p>Descubra o seu estilo musical. Uma biblioteca infinita de músicas a um clique de distância.</p>
                <button id="explore-btn" class="cta-button">Explorar</button>
            </div>
            ${genreCarouselsHTML}
        </div>
    `;
    setupCarousels();
    fetchAndSetCoverArt(state.songs, state)
};

const renderExplorePage = (state) => {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    let songsToRender = [...state.songs];

    if (state.filters.artist !== 'Todos') {
        songsToRender = songsToRender.filter(song => song.artist === state.filters.artist);
    }
    if (state.filters.genre !== 'Todos') {
        songsToRender = songsToRender.filter(song => song.genre === state.filters.genre);
    }
    if (state.filters.decade !== 'Todas') {
        songsToRender = songsToRender.filter(song => song.decade === state.filters.decade);
    }
    if (state.filters.searchTerm) {
        const searchTermLower = state.filters.searchTerm.toLowerCase();
        songsToRender = songsToRender.filter(song => song.title.toLowerCase().includes(searchTermLower) || song.artist.toLowerCase().includes(searchTermLower));
    }

    songsToRender = Music.sortSongs(songsToRender, state.filters.sort, state.sortDirection);
    
    const songsToDisplay = songsToRender.slice(0, state.songsLoaded);
    const remainingSongs = songsToRender.length - songsToDisplay.length;

    const controlButtonsHTML = `
        <div class="explore-control-buttons">
            <button class="cta-button add-song-btn-large" id="add-song-btn">
                <i class="fas fa-plus"></i> Adicionar música
            </button>
            <button class="outline-button reset-btn" id="reset-list-btn">
                <i class="fas fa-undo"></i> Resetar lista
            </button>
            <button class="outline-button clear-btn" id="clear-all-btn">
                <i class="fas fa-trash-alt"></i> Limpar tudo
            </button>
        </div>
    `;

    let cardsHTML = '';
    
    if (songsToRender.length === 0 && state.filters.searchTerm) {
        cardsHTML += `<p class="no-results-message">Nenhuma música encontrada para sua busca.</p>`;
    } else if (songsToRender.length === 0) {
        cardsHTML += `<p class="no-results-message">Nenhuma música disponível.</p>`;
    } else {
        cardsHTML += songsToDisplay.map(song => createSongCard(song, state.currentPage)).join('');
    }
    
    if (remainingSongs > 0) {
        cardsHTML += `
            <div class="load-more-container">
                <button id="load-more-btn" class="cta-button">
                    Carregar Mais (${remainingSongs} restantes)
                </button>
            </div>
        `;
    }

    mainContent.innerHTML = `
        <div class="explore-header">
            <div class="search-bar-wrapper">
                <i class="fas fa-search search-icon"></i>
                <input id="search-input" class="search-input-modern" name="search-input" placeholder="Pesquisar por música, artista ou álbum..." required>
                <button id="filter-btn" class="filter-btn">
                    <i class="fas fa-filter"></i>
                </button>
            </div>
            <div class="explore-filters-bar hidden">
                <div class="filter-group">
                    <label for="sort-by" class="filter-label">Ordem:</label>
                    <select name="ordem" id="sort-by" class="filter-select">
                        <option value="default">Padrão</option>
                        <option value="title">Alfabeto</option>
                        <option value="year">Data</option>
                    </select>
                    <button id="sort-direction-btn" class="sort-direction-btn-modern"><i class="fas fa-sort-down"></i></button>
                </div>
                <div class="filter-group">
                    <label for="genre-filter" class="filter-label">Gênero:</label>
                    <select name="genero" id="genre-filter" class="filter-select"></select>
                </div>
                <div class="filter-group">
                    <label for="artist-filter" class="filter-label">Artista:</label>
                    <select name="artista" id="artist-filter" class="filter-select"></select>
                </div>
                <div class="filter-group">
                    <label for="decade-filter" class="filter-label">Década:</label>
                    <select name="decada" id="decade-filter" class="filter-select"></select>
                </div>
            </div>
            ${controlButtonsHTML}
        </div>
        <div class="explore-card-grid">
            ${cardsHTML}
        </div>
    `;
    updateFiltersUI(state);
};

const renderFavoritesPage = (state) => {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    const likedSongs = state.songs.filter(song => song.liked);
    const cardsHTML = likedSongs.map(song => createSongCard(song)).join('');
    
    mainContent.innerHTML = `
        <div class="page-header">
            <h1>Músicas Favoritas</h1>
        </div>
        <div class="favorites-banner">
            <div class="banner-content">
                <i class="fas fa-heart banner-icon"></i>
                <h2 class="banner-title">Seu Mix Exclusivo de Favoritos</h2>
                <p class="banner-subtitle">
                    Aqui estão todas as músicas que você amou. 
                    Curta, organize e volte sempre que quiser!
                </p>
            </div>
        </div>
        <div class="card-container explore-card-grid">${cardsHTML.length > 0 ? cardsHTML : '<p class="no-results-message">Você ainda não tem músicas favoritas.</p>'}</div>
    `;
};


// Função para renderizar uma página de playlist individual
const renderPlaylistPage = (songs, playlistTitle) => {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    // Adiciona o segundo argumento 'explore' ou outro nome da página
    // para que a função createSongCard adicione os botões
    const cardsHTML = songs.map(song => createSongCard(song, 'playlist')).join('');

    mainContent.innerHTML = `
        <div class="page-header">
            <h1>${playlistTitle}</h1>
        </div>
        <div class="card-container explore-card-grid">
            ${cardsHTML.length > 0 ? cardsHTML : '<p class="no-results-message">Esta playlist está vazia.</p>'}
        </div>
    `;
};

export const renderPlaylistsPage = (state) => {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    mainContent.innerHTML = `
        <div class="page-header">
            <h1>Playlists</h1>
        </div>
        
        <div class="page-content">
            <div class="carousel-section">
                <div class="section-title">
                    <h2>Navegue por Década e Gênero:</h2>
                </div>
                <div class="carousel-container music-grid" id="decade-genre-grid">
                    <div class="card clickable-card" data-playlist="Rock Anos 80" data-type="genre-decade">
                        <div class="card-image-placeholder">
                            <img src="img/rockanos80.png" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>Rock Anos 80</h3>
                                <h4>O melhor do rock dos anos 80!</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card clickable-card" data-playlist="Pop dos Anos 90" data-type="genre-decade">
                        <div class="card-image-placeholder">
                            <img src="img/popanos90.png" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>Pop dos Anos 90</h3>
                                <h4>Os hits que marcaram a década.</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card clickable-card" data-playlist="Clássicos do Sertanejo" data-type="genre-decade">
                        <div class="card-image-placeholder">
                            <img src="img/classicosdosertanejo.png" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>Clássicos do Sertanejo</h3>
                                <h4>O melhor do sertanejo que marcou gerações.</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card clickable-card" data-playlist="Bossa Nova" data-type="genre">
                        <div class="card-image-placeholder">
                            <img src="img/bossanova.png" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>Bossa Nova</h3>
                                <h4>Clássicos atemporais que marcaram a história brasileira.</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card clickable-card" data-playlist="Samba Raiz" data-type="genre">
                        <div class="card-image-placeholder">
                            <img src="img/sambaraiz.png" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>Samba Raiz</h3>
                                <h4>O som que representa o Brasil.</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-scrollbar-container">
                    <div class="carousel-scrollbar-thumb"></div>
                </div>
                <button class="carousel-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
                <button class="carousel-btn next-btn"><i class="fas fa-chevron-right"></i></button>
            </div>

            <div class="carousel-section">
                <div class="section-title">
                    <h2>Artistas Recomendados:</h2>
                </div>
                <div class="carousel-container music-grid" id="artist-grid">
                    <div class="card clickable-card" data-playlist="Tom Jobim" data-type="artist">
                        <div class="card-image-placeholder">
                            <img src="img/tomjobim.jpg" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>O Essencial de Tom Jobim</h3>
                                <h4>Uma seleção de suas maiores obras.</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card clickable-card" data-playlist="Rita Lee" data-type="artist">
                        <div class="card-image-placeholder">
                            <img src="img/ritalee.jpg" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>Melhores da Rita Lee</h3>
                                <h4>Os maiores sucessos da Rainha do Rock Brasileiro!</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card clickable-card" data-playlist="Cássia Eller" data-type="artist">
                        <div class="card-image-placeholder">
                            <img src="img/cassiaeller.jpg" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>Canções da Rainha da Malandragem</h3>
                                <h4>A voz que traduziu a intensidade e a rebeldia em pura arte.</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card clickable-card" data-playlist="Bon Jovi" data-type="artist">
                        <div class="card-image-placeholder">
                            <img src="img/bonjovi.jpg" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>Bon Jovi: Hinos</h3>
                                <h4>Prepare-se para reviver a glória do rock dos anos 80.</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card clickable-card" data-playlist='Gilberto Gil' data-type="artist">
                        <div class="card-image-placeholder">
                            <img src="img/gilbertogil.jpg" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>Playlist Gilberto Gil</h3>
                                <h4>Uma viagem pela sua discografia.</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-scrollbar-container">
                    <div class="carousel-scrollbar-thumb"></div>
                </div>
                <button class="carousel-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
                <button class="carousel-btn next-btn"><i class="fas fa-chevron-right"></i></button>
            </div>

            <div class="carousel-section">
                <div class="section-title">
                    <h2>Encontre seu Estilo:</h2>
                </div>
                <div class="carousel-container music-grid" id="style-grid">
                    <div class="card clickable-card" data-playlist="Hendrikcore" data-type="style">
                        <div class="card-image-placeholder">
                            <img src="img/hendrikcore.png" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>HendrikCore</h3>
                                <h4>Faixas de kpop para o dançarino flashmob mais famoso do DCOMP.</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card clickable-card" data-playlist="Skatecore" data-type="style">
                        <div class="card-image-placeholder">
                            <img src="img/skatecore.png" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>SkateCore</h3>
                                <h4>Trilha sonora perfeita para o asfalto, o concreto e a liberdade em quatro rodas.</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card clickable-card" data-playlist="Gymcore" data-type="style">
                        <div class="card-image-placeholder">
                            <img src="img/gymcore.png" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>GymCore</h3>
                                <h4>Batidas para transformar o suor em força.</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card clickable-card" data-playlist="Y2K" data-type="style">
                        <div class="card-image-placeholder">
                            <img src="img/y2k.png" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>Y2K</h3>
                                <h4>Viagem no tempo para a virada do milênio.</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card clickable-card" data-playlist="Dramaticcore" data-type="style">
                        <div class="card-image-placeholder">
                            <img src="img/dramaticcore.png" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>DramaticCore</h3>
                                <h4>A trilha sonora para as cenas épicas da sua vida. Paixão, drama e triunfo em cada nota.</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card clickable-card" data-playlist="Cybercore" data-type="style">
                        <div class="card-image-placeholder">
                            <img src="img/cybercore.png" alt="Capa da Playlist">
                        </div>
                        <div class="card-details">
                            <div class="card-details-text">
                                <h3>CyberCore</h3>
                                <h4>Faixas que unem metal, eletrônica e a anarquia do futuro.</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-scrollbar-container">
                    <div class="carousel-scrollbar-thumb"></div>
                </div>
                <button class="carousel-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
                <button class="carousel-btn next-btn"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;
    setupPlaylistListeners(state);
    setupCarousels();
};

// Função para configurar os ouvintes de evento para os cartões de playlist
const setupPlaylistListeners = (state) => {
    // Seleciona todos os cartões de playlist clicáveis na página
    const clickableCards = document.querySelectorAll('.clickable-card');

    clickableCards.forEach(card => {
        card.addEventListener('click', () => {
            const playlistTitle = card.dataset.playlist;
            const playlistType = card.dataset.type;
            let songsToRender = [];

            // Objeto de mapeamento para as funções de filtro
            const filterFunctions = {
                'genre-decade': () => {
                    const parts = playlistTitle.split(' ');
                    const genre = parts[0];
                    const decade = parseInt(parts[2]);
                    return Music.createPlaylistByDG(state.songs, genre, decade);
                },
                'genre': () => Music.createPlaylistByGenre(state.songs, playlistTitle),
                'artist': () => Music.listSongsByArtist(state.songs, playlistTitle),
                'style': () => Music.createPlaylistByStyle(state.songs, playlistTitle)
            };

            // Usa o mapeamento para chamar a função correta
            if (filterFunctions[playlistType]) {
                songsToRender = filterFunctions[playlistType]();
            } else {
                console.error(`Tipo de playlist desconhecido: ${playlistType}`);
                return; // Impede que o código continue com um erro
            }

            // Chama a função para renderizar a página com as músicas filtradas
            renderPlaylistPage(songsToRender, playlistTitle);
        });
    });
};

const renderStatsPage = (state) => { // renderiza a página de estatísticas
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    mainContent.innerHTML = `
        <h2 class="section-title">📊 Estatísticas da Sua Biblioteca</h2>
        <div class="chart-container">
            <div class="chart-box">
                <h3>Top Artistas</h3>
                <canvas id="topArtistsChart"></canvas>
            </div>
            <div class="chart-box">
                <h3>Distribuição por Gênero</h3>
                <canvas id="genreChart"></canvas>
            </div>
            <div class="chart-box">
                <h3>Décadas</h3>
                <canvas id="decadeChart"></canvas>
            </div>
        </div>
    `;
    renderCharts(state.songs);
};

const updateFiltersUI = (state) => { // Atualiza os elementos de filtro na interface do usuário com base no estado atual
    // Usa as funções do objeto Music para popular os filtros
    Music.renderFilterOptions(Music.getUnique(state.songs, 'artist'), '#artist-filter', 'Todos');
    Music.renderFilterOptions(Music.getUnique(state.songs, 'genre'), '#genre-filter', 'Todos');
    Music.renderFilterOptions(Music.getUnique(state.songs, 'decade'), '#decade-filter', 'Todas');
    const artistFilter = document.querySelector('#artist-filter');
    const genreFilter = document.querySelector('#genre-filter');
    const decadeFilter = document.querySelector('#decade-filter');
    const searchInput = document.querySelector('#search-input');
    const sortBy = document.querySelector('#sort-by');
    // Atualiza os valores dos filtros para refletir o estado atual
    if (artistFilter) artistFilter.value = state.filters.artist;
    if (genreFilter) genreFilter.value = state.filters.genre;
    if (decadeFilter) decadeFilter.value = state.filters.decade;
    if (searchInput) searchInput.value = state.filters.searchTerm;
    if (sortBy) sortBy.value = state.filters.sort;
};

// Exporta todas as funções de renderização como um único objeto
// Isso facilita a importação e o uso dessas funções em outros módulos
export default {
    openModal,
    closeModal,
    createSongCard,
    renderExplorePage,
    renderFavoritesPage,
    renderPlaylistsPage,
    renderHomePage,
    renderStatsPage,
    updateFiltersUI,
    fetchSongContext,
    renderPlaylistPage 
}