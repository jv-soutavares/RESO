// main.js
// Importa os scripts auxiliares
import { Music } from './src/lib.js'; 
import Render from './src/render.js';
import { setupCarousels } from './src/carousel.js'

const artistMapping = {
    'O Essencial de Tom Jobim': 'Tom Jobim',
    'Melhores da Rita Lee': 'Rita Lee',
    'Canções da Rainha da Malandragem': 'Cássia Eller',
    'Bon Jovi: Hinos': 'Bon Jovi',
    'Playlist Gilberto Gil': 'Gilberto Gil'
};

const moodMapping = {
    "MPB" : "Calmo",
    "Samba" : "Animado",
    "Sertanejo" : "Festa",
    "Forró" : "Dançante",
    "Rock Alternativo" : "Indie",
    "Rock" : "Energético",
    "Pop" : "Dançante",
    "Pagode": "Festa",
    "Folk" : "Festa",
    "Soul" : "Emocional",
    "Funk" : "Groove",
    "Hip Hop" : "Urbano",
    "Country" : "Nostálgico",
    "Pop Latino" : "Sensual",
    "Rock and Roll" : "Dançante",
    "Bossa Nova" : "Sofisticado",
    "Pop Rock" : "Animado",
    "Manguebeat" : "Experimental",
    "Axé" : "Festa",
    "Jazz" : "Elegante",
    "Synth-pop" : "Eletrônico",
    "Post-Punk" : "Introspectivo",
    "Glam Rock" : "Extravagante",
    "Disco" : "Dançante",
    "Pop Soul" : "Romântico",
    "Pop Punk" : "Rebelde",
    "K-Pop" : "K-Pop"
};

const styleMapping = {
    "Hendrikcore": ["K-Pop"],
    "Skatecore": ["Energético", "Urbano"],
    "Gymcore": ["Energético", "Dançante"],
    "Y2K": ["Dançante", "Sensual", "Animado"],
    "Dramaticcore": ["Indie", "Emocional", "Introspectivo"],
    "Cybercore": ["Eletrônico", "Dançante", "Festa"]
};

const genreDecadeMapping = {
    'Rock Anos 80': { genre: 'Rock', decade: '1980s' },
    'Pop dos Anos 90': { genre: 'Pop', decade: '1990s' },
    'Clássicos do Sertanejo': { genre: 'Sertanejo', decade: '1990s' }
};

// ---- Estado Global da Aplicação ----
let appState = { 
    currentPage: 'home', 
    songs: [],
    filters: {
        artist: 'Todos', 
        genre: 'Todos', 
        decade: 'Todas', 
        sort: 'default', 
        searchTerm: '' 
    },
    sortDirection: 'asc',
    songsPerPage: 20, 
    songsLoaded: 20, 
    currentPlayingSongId: null, 
    audioPlayer: null 
};

const selectByStyle = (songs) => {
  const selectedStyle = styleFilter.value;
  let playlist = [];

  if (selectedStyle === "all") {
    playlist = [...songs];
  } else {
    // ESTA É A LINHA QUE PRECISA MUDAR OU SER ADICIONADA
    playlist = Music.createPlaylistByStyle(songs, styleMapping, moodMapping, selectedStyle);
  }
  
  renderSongs(playlist);
};

// Função para atualizar e renderizar as páginas
const updateAndRender = () => {
    switch (appState.currentPage) {
        case 'home':
            Render.renderHomePage(appState);
            setupCarousels();
            break;
        case 'explore':
            Render.renderExplorePage(appState);
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.addEventListener('input', debounce(() => {
                    appState.filters.searchTerm = searchInput.value.trim();
                    appState.songsLoaded = appState.songsPerPage;
                    updateAndRender();
                }, 650));
            }

            // NOVO CÓDIGO AQUI
            // Controla a visibilidade da barra de filtros com base no estado
            const filtersBar = document.querySelector('.explore-filters-bar');
            if (filtersBar) {
                if (appState.isFilterBarVisible) {
                    filtersBar.classList.remove('hidden');
                } else {
                    filtersBar.classList.add('hidden');
                }
            }
            break;
        case 'favorites':
            Render.renderFavoritesPage(appState);
            break;
        case 'playlists':
            Render.renderPlaylistsPage(appState);
            setupCarousels();
            break;
        case 'stats':
            Render.renderStatsPage(appState);
            break;
        default:
            Render.renderHomePage(appState);
            setupCarousels();
    }
};


// Inicializa o estado
const initializeState = () => {
    appState.songs = Music.loadSongs();
    if (appState.songs.length === 0) {
        appState.songs = Music.resetSongs();
    }
    appState.audioPlayer = document.getElementById('audio-player');
    updateAndRender();
};

// Configura um delay para a execução de uma função
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

// ---- Listeners de Eventos Globais ----
const setupGlobalListeners = () => {
    const sidebarToggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    const audioPlayer = appState.audioPlayer;
    const playerBar = document.getElementById('player-bar');
    const mainPlayPauseBtn = document.getElementById('main-play-pause-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeSpan = document.getElementById('current-time');
    const durationTimeSpan = document.getElementById('duration-time');
    const closePlayerBtn = document.getElementById('close-player-btn');
    const progressBarWrapper = document.getElementById('progress-bar-wrapper');

    if (sidebarToggleBtn && sidebar) {
        sidebarToggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('closed');
            body.classList.toggle('sidebar-closed');
        });
    }

    // Listener global para todos os cliques
    document.addEventListener('click', async (event) => {
        const sidebarLink = event.target.closest('a[data-page]');
        const exploreBtn = event.target.closest('#explore-btn');
        const addSongBtn = event.target.closest('#add-song-btn');
        const addSongModal = document.getElementById('add-song-modal');
        const contextModal = document.getElementById('context-modal');
        const removeBtn = event.target.closest('.remove-btn');
        const contextBtn = event.target.closest('.context-btn');
        const likeBtn = event.target.closest('.card-heart-icon');
        const resetBtn = event.target.closest('#reset-list-btn');
        const clearBtn = event.target.closest('#clear-all-btn');
        const filterBtn = event.target.closest('#filter-btn');
        const sortDirectionBtn = event.target.closest('#sort-direction-btn');
        const loadMoreBtn = event.target.id === 'load-more-btn';
        const cardPlayPauseBtn = event.target.closest('.play-pause-btn');

        // --- LÓGICA DE PLAYLISTS UNIFICADA E CORRIGIDA ---
        const clickablePlaylistCard = event.target.closest('.clickable-card');
        
        if (clickablePlaylistCard) {
        const playlistTitle = clickablePlaylistCard.dataset.playlist;
        const playlistType = clickablePlaylistCard.dataset.type;
        let songsInPlaylist = [];

        if (playlistType === 'genre-decade') {
            const mappedPlaylist = genreDecadeMapping[playlistTitle];
            if (mappedPlaylist) {
                songsInPlaylist = Music.createPlaylistByDG(appState.songs, mappedPlaylist.genre, mappedPlaylist.decade);
            }
        } else if (playlistType === 'artist') {
            songsInPlaylist = Music.listSongsByArtist(appState.songs, playlistTitle);
        } else if (playlistType === 'genre') {
            songsInPlaylist = Music.createPlaylistByGenre(appState.songs, playlistTitle);
        } else if (playlistType === 'mood') {
            songsInPlaylist = Music.createPlaylistByMood(appState.songs, moodMapping, playlistTitle);
        } else if (playlistType === 'style') {
            // A LINHA CORRETA ESTÁ AQUI
            songsInPlaylist = Music.createPlaylistByStyle(appState.songs, styleMapping, moodMapping, playlistTitle);
        }

        Render.renderPlaylistPage(songsInPlaylist, playlistTitle);
        return;
        }

        // --- FIM DA LÓGICA DE PLAYLISTS ---

        if (filterBtn) {
            appState.isFilterBarVisible = !appState.isFilterBarVisible;
            updateAndRender();
        }

        if (sidebarLink) {
            const page = sidebarLink.dataset.page;
            appState.currentPage = page;
            appState.songsLoaded = appState.songsPerPage;
            updateAndRender();
        }

        if (exploreBtn) {
            appState.currentPage = 'explore';
            appState.songsLoaded = appState.songsPerPage;
            updateAndRender();
        }

        if (addSongBtn) {
            const addSongModal = document.getElementById('add-song-modal');
            Render.openModal(addSongModal);
        }

        if (event.target.id === 'add-song-modal' || event.target.closest('#add-song-modal .close-btn')) {
            Render.closeModal(addSongModal);
        }

        if (likeBtn) {
            const card = likeBtn.closest('.card');
            const songId = parseInt(card.dataset.id);
            const song = appState.songs.find(s => s.id === songId);
            if (song) {
                song.liked = !song.liked;
                likeBtn.classList.toggle('liked');
                Music.saveSongs(appState.songs);
            }
        }

        if (resetBtn) {
            appState.songs = Music.resetSongs();
            appState.filters = { artist: 'Todos', genre: 'Todos', decade: 'Todas', sort: 'default', searchTerm: '' };
            appState.sortDirection = 'asc';
            appState.songsLoaded = appState.songsPerPage;
            updateAndRender();
        }

        if (clearBtn) {
            appState.songs = Music.clearSongs();
            appState.songsLoaded = appState.songsPerPage;
            updateAndRender();
        }

        if (removeBtn) {
            const songId = removeBtn.dataset.songId;
            appState.songs = Music.deleteSong(appState.songs, songId);
            Music.saveSongs(appState.songs);
            updateAndRender();
        }

        if (contextBtn) {
            const songId = contextBtn.dataset.songId;
            const song = appState.songs.find(s => s.id == songId);
            const contextModal = document.getElementById('context-modal');
            const contextContent = document.getElementById('context-content');
            if (song && contextModal && contextContent) {
                Render.openModal(contextModal);
                contextContent.textContent = 'Carregando contexto da IA...';
                try {
                    const response = await fetch('/api/get-song-context', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ song: song.title, artist: song.artist })
                    });
                    if (!response.ok) {
                        throw new Error('Falha na resposta da rede.');
                    }
                    const data = await response.json();
                    if (data.context) {
                        contextContent.textContent = data.context;
                    } else {
                        contextContent.textContent = 'Contexto não disponível.';
                    }
                } catch (error) {
                    console.error('Erro ao buscar contexto da API:', error);
                    contextContent.textContent = 'Não foi possível carregar o contexto. Verifique se o servidor está rodando.';
                }
            }
        }

        if (event.target.id === 'context-modal' || event.target.closest('#context-modal .close-btn')) {
            Render.closeModal(contextModal);
        }

        if (sortDirectionBtn) {
            appState.sortDirection = appState.sortDirection === 'asc' ? 'desc' : 'asc';
            appState.songsLoaded = appState.songsPerPage;
            updateAndRender();
            const newSortDirectionBtn = document.getElementById('sort-direction-btn');
            if (newSortDirectionBtn) {
                const icon = newSortDirectionBtn.querySelector('i');
                if (icon) {
                    if (appState.sortDirection === 'desc') {
                        icon.classList.add('rotated');
                    } else {
                        icon.classList.remove('rotated');
                    }
                }
            }
        }

        if (loadMoreBtn) {
            appState.songsLoaded += appState.songsPerPage;
            updateAndRender();
        }

        if (cardPlayPauseBtn) {
            const card = cardPlayPauseBtn.closest('.card');
            const songId = parseInt(card.dataset.id);
            
            if (appState.currentPlayingSongId === songId) {
                audioPlayer.pause();
                appState.currentPlayingSongId = null;
            } else {
                const song = appState.songs.find(s => s.id === songId);
                
                if (song) {
                    cardPlayPauseBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i>';
                    
                    try {
                        const response = await fetch('/api/get-song-preview', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ song: song.title, artist: song.artist })
                        });
                        if (!response.ok) throw new Error('Falha na resposta da rede.');
                        const data = await response.json();

                        if (data.previewUrl) {
                            audioPlayer.src = data.previewUrl;
                            audioPlayer.play();
                            appState.currentPlayingSongId = songId;
                        } else {
                            console.error('URL da prévia não encontrada.');
                            cardPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                            return;
                        }
                    } catch (error) {
                        console.error('Erro ao buscar a prévia da API:', error);
                        cardPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                        return;
                    }
                } else {
                    console.error('Música não encontrada no estado da aplicação.');
                    return;
                }
            }
            document.querySelectorAll('.play-pause-btn').forEach(btn => {
                const btnSongId = parseInt(btn.closest('.card').dataset.id);
                if (btnSongId === appState.currentPlayingSongId) {
                    btn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    btn.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
        }
    });

    if (mainPlayPauseBtn) {
        mainPlayPauseBtn.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        });
    }

    if (closePlayerBtn) {
        closePlayerBtn.addEventListener('click', () => {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            playerBar.classList.add('hidden');
            appState.currentPlayingSongId = null;
            document.querySelectorAll('.play-pause-btn').forEach(btn => {
                btn.innerHTML = '<i class="fas fa-play"></i>';
            });
        });
    }

    audioPlayer.addEventListener('play', () => {
        playerBar.classList.remove('hidden');
        mainPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });

    audioPlayer.addEventListener('pause', () => {
        mainPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progress}%`;
        const minutes = Math.floor(audioPlayer.currentTime / 60);
        const seconds = Math.floor(audioPlayer.currentTime % 60).toString().padStart(2, '0');
        currentTimeSpan.textContent = `${minutes}:${seconds}`;
    });

    audioPlayer.addEventListener('loadeddata', () => {
        const minutes = Math.floor(audioPlayer.duration / 60);
        const seconds = Math.floor(audioPlayer.duration % 60).toString().padStart(2, '0');
        durationTimeSpan.textContent = `${minutes}:${seconds}`;
    });

    if (progressBarWrapper) {
        progressBarWrapper.addEventListener('click', (event) => {
            const clickPosition = event.offsetX;
            const barWidth = progressBarWrapper.clientWidth;
            const seekTime = (clickPosition / barWidth) * audioPlayer.duration;
            audioPlayer.currentTime = seekTime;
        });
    }

    document.addEventListener('submit', (event) => {
        if (event.target.matches('.search-container')) {
            event.preventDefault();
            const searchTerm = document.querySelector('#search-input').value;
            appState.filters.searchTerm = searchTerm;
            appState.songsLoaded = appState.songsPerPage;
            updateAndRender();
            return;
        }
        
        if (event.target.id === 'add-song-form') {
            event.preventDefault();
            const titleInput = document.getElementById('song-title');
            const artistInput = document.getElementById('song-artist');
            const genreInput = document.getElementById('song-genre');
            const yearInput = document.getElementById('song-year');
            const capaInput = document.getElementById('song-capa');

            if (!titleInput.value || !artistInput.value || !genreInput.value || !yearInput.value) {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }
            const year = parseInt(yearInput.value);
            const decade = `${Math.floor(year / 10) * 10}s`;
            const newSong = {
                id: Date.now(),
                title: titleInput.value.trim(),
                artist: artistInput.value.trim(),
                genre: genreInput.value.trim(),
                year: year,
                decade: decade,
                capa: capaInput.value.trim() || 'img/default-cover.png',
                liked: false
            };
            appState.songs = Music.addSong(appState.songs, newSong);
            Music.saveSongs(appState.songs);
            appState.songsLoaded += 1;
            updateAndRender();
            const addSongModal = document.getElementById('add-song-modal');
            Render.closeModal(addSongModal);
        }
    });

    document.addEventListener('change', (event) => {
        const target = event.target;
        if (['genre-filter', 'artist-filter', 'decade-filter', 'sort-by'].includes(target.id)) {
            appState.filters.genre = document.getElementById('genre-filter').value;
            appState.filters.artist = document.getElementById('artist-filter').value;
            appState.filters.decade = document.getElementById('decade-filter').value;
            appState.filters.sort = document.getElementById('sort-by').value;
            appState.songsLoaded = appState.songsPerPage;
            updateAndRender();
        }
    });
    
    const closeFiltersBtn = document.getElementById('close-filters-btn');
    if (closeFiltersBtn) {
        closeFiltersBtn.addEventListener('click', () => {
            const filtersBar = document.querySelector('.explore-filters-bar');
            filtersBar.classList.add('hidden');
        });
    }
};

// ---- Inicia a Aplicação ----
document.addEventListener('DOMContentLoaded', () => {
    initializeState();
    setupGlobalListeners();
})
