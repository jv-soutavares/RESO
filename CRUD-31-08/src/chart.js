// O módulo "Livraria" é uma IIFE (Immediately Invoked Function Expression).
// Isso cria um escopo privado para as variáveis e funções, evitando poluição global.
export const renderCharts = (songs) => {
  const palette = ["#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#a78bfa"]; // Define uma paleta de cores para os gráficos.

  // Funções genéricas para contagem de dados
  // countByProperty é uma função utilitária que conta a frequência de uma propriedade (ex: 'artist', 'genre').
  const countByProperty = (songs, property) => {
    return songs.reduce((acc, song) => {
      const value = song[property];
      if (value) {
        // Usa o acumulador (acc) para armazenar a contagem.
        // Se a propriedade já existir, incrementa; se não, inicializa com 1.
        acc[value] = (acc[value] || 0) + 1;
      }
      return acc;
    }, {}); // Inicia o acumulador como um objeto vazio.
  };

  // ---- Top Artistas ----
  const artistCounts = countByProperty(songs, 'artist'); // Conta as músicas por artista.
  const sortedArtists = Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1]) // Ordena os artistas por quantidade de músicas (em ordem decrescente).
    .slice(0, 5); // Pega apenas os 5 primeiros artistas (o "top 5").

  // Obtém o contexto do canvas para o gráfico de artistas.
  const topArtistsCtx = document.getElementById("topArtistsChart");
  if (topArtistsCtx) {
    // Cria um novo gráfico de barras (Chart) com os dados e opções.
    new Chart(topArtistsCtx, {
      type: "bar",
      data: {
        labels: sortedArtists.map(a => a[0]), // Rótulos para o eixo X (nomes dos artistas).
        datasets: [{
          label: "Qtd. Músicas",
          data: sortedArtists.map(a => a[1]), // Dados para o eixo Y (quantidade de músicas).
          backgroundColor: palette // Usa as cores da paleta.
        }]
      },
      options: {
        responsive: true, // Garante que o gráfico se adapte ao tamanho da tela.
        plugins: { legend: { display: false } }, // Oculta a legenda do gráfico.
        scales: { // Configurações dos eixos X e Y.
          x: { ticks: { color: "#ddd", font: { size: 11 } } },
          y: {
            ticks: { color: "#ddd", precision: 0, stepSize: 1 },
            beginAtZero: true // Garante que o eixo Y comece em 0.
          }
        }
      }
    });
  }

  // ---- Gêneros ----
  const genreCounts = countByProperty(songs, 'genre'); // Conta as músicas por gênero.
  const genreCtx = document.getElementById("genreChart"); // Obtém o contexto do canvas.
  if (genreCtx) {
    new Chart(genreCtx, {
      type: "doughnut", // Tipo de gráfico: rosca.
      data: {
        labels: Object.keys(genreCounts), // Rótulos: os nomes dos gêneros.
        datasets: [{
          label: "Qtd. Músicas",
          data: Object.values(genreCounts), // Dados: a quantidade de músicas por gênero.
          backgroundColor: palette
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Permite que o gráfico altere a proporção.
        plugins: {
          legend: {
            labels: {
              color: "#ddd", font: { size: 12 }, boxWidth: 18, padding: 10
            }
          }
        }
      }
    });
  }

  // ---- Décadas ----
  const decadeCounts = countByProperty(songs, 'decade'); // Conta as músicas por década.
  const sortedDecades = Object.keys(decadeCounts)
    .map(d => ({ label: d, value: parseInt(d) })) // Converte as chaves de string para objetos com valores numéricos.
    .sort((a, b) => a.value - b.value); // Ordena as décadas em ordem crescente.

  const decadeCtx = document.getElementById("decadeChart"); // Obtém o contexto do canvas.
  if (decadeCtx) {
    new Chart(decadeCtx, {
      type: "line", // Tipo de gráfico: linha.
      data: {
        labels: sortedDecades.map(d => d.label), // Rótulos: as décadas em ordem.
        datasets: [{
          label: "Qtd. Músicas",
          data: sortedDecades.map(d => decadeCounts[d.label]), // Dados: a quantidade de músicas por década.
          borderColor: "#a78bfa",
          backgroundColor: "#6d28d9",
          fill: true, // Preenche a área abaixo da linha.
          tension: 0.3 // Adiciona uma pequena curva à linha para suavizá-la.
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: "#ddd" } } },
        scales: {
          x: { ticks: { color: "#ddd" } },
          y: {
            ticks: { color: "#ddd", precision: 0, stepSize: 1 },
            beginAtZero: true
          }
        }
      }
    });
  }
};