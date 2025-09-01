// Chave usada no localStorage para salvar os livros (neste caso músicas)
// Assim, todos os dados ficam salvos no navegador mesmo após recarregar a página
const STORAGE_KEY = "music::songs"

// ========================
// Persistência (salvar, carregar, limpar os dados)
// ========================

// Carrega a lista de músicas do localStorage. Se não existir nada salvo, retorna um array vazio.
const loadSongs = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : [] // converte de texto JSON para array de objetos
}

// Salva a lista de músicas no localStorage (convertendo para texto JSON). Dessa forma, mesmo fechando o navegador, os dados continuam salvos.
const saveSongs = songs =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs))

// Remove todas as músicas do localStorage e retorna um array vazio
const clearSongs = () => {
  localStorage.removeItem(STORAGE_KEY)
  return [];
}

// Restaura uma lista inicial de músicas (pré-cadastradas). Útil para resetar o sistema com dados de exemplo ou para "popular" na primeira vez.
const resetSongs = () => {
  const songs = [
  { "id": 1, "title": "Garota de Ipanema", "artist": "Tom Jobim & Vinicius de Moraes", "genre": "MPB", "year": 1962, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 2, "title": "Aquarela do Brasil", "artist": "Ary Barroso", "genre": "Samba", "year": 1939, "decade": "1930s", "liked": false, "capa": "" },
  { "id": 3, "title": "Evidências", "artist": "Chitãozinho & Xororó", "genre": "Sertanejo", "year": 1990, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 4, "title": "Ai Se Eu Te Pego", "artist": "Michel Teló", "genre": "Sertanejo", "year": 2011, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 5, "title": "Anunciação", "artist": "Alceu Valença", "genre": "Forró", "year": 1983, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 6, "title": "Fogo e Paixão", "artist": "Wando", "genre": "MPB", "year": 1988, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 7, "title": "Do I Wanna Know?", "artist": "Arctic Monkeys", "genre": "Rock Alternativo", "year": 2013, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 8, "title": "Smells Like Teen Spirit", "artist": "Nirvana", "genre": "Rock", "year": 1991, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 9, "title": "Wonderwall", "artist": "Oasis", "genre": "Rock Alternativo", "year": 1995, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 10, "title": "Bohemian Rhapsody", "artist": "Queen", "genre": "Rock", "year": 1975, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 11, "title": "Billie Jean", "artist": "Michael Jackson", "genre": "Pop", "year": 1982, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 12, "title": "Shape of You", "artist": "Ed Sheeran", "genre": "Pop", "year": 2017, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 13, "title": "Pais e Filhos", "artist": "Legião Urbana", "genre": "Rock", "year": 1989, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 14, "title": "Tempo Perdido", "artist": "Legião Urbana", "genre": "Rock", "year": 1986, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 15, "title": "Lanterna dos Afogados", "artist": "Paralamas do Sucesso", "genre": "Rock", "year": 1989, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 16, "title": "O Mundo é um Moinho", "artist": "Cartola", "genre": "Samba", "year": 1976, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 17, "title": "Tá Escrito", "artist": "Grupo Revelação", "genre": "Pagode", "year": 2009, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 18, "title": "Depois do Prazer", "artist": "Só Pra Contrariar", "genre": "Pagode", "year": 1997, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 19, "title": "Knocking on Heaven’s Door", "artist": "Bob Dylan", "genre": "Folk", "year": 1973, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 20, "title": "Hallelujah", "artist": "Leonard Cohen", "genre": "Folk", "year": 1984, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 21, "title": "Hotel California", "artist": "Eagles", "genre": "Rock", "year": 1976, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 22, "title": "Stairway to Heaven", "artist": "Led Zeppelin", "genre": "Rock", "year": 1971, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 23, "title": "Imagine", "artist": "John Lennon", "genre": "Pop", "year": 1971, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 24, "title": "Like a Rolling Stone", "artist": "Bob Dylan", "genre": "Rock", "year": 1965, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 25, "title": "I Will Always Love You", "artist": "Whitney Houston", "genre": "Pop", "year": 1992, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 26, "title": "Hey Jude", "artist": "The Beatles", "genre": "Rock", "year": 1968, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 27, "title": "Thriller", "artist": "Michael Jackson", "genre": "Pop", "year": 1982, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 28, "title": "Dancing Queen", "artist": "ABBA", "genre": "Pop", "year": 1976, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 29, "title": "Sweet Child o' Mine", "artist": "Guns N' Roses", "genre": "Rock", "year": 1987, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 30, "title": "Livin' on a Prayer", "artist": "Bon Jovi", "genre": "Rock", "year": 1986, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 32, "title": "Wish You Were Here", "artist": "Pink Floyd", "genre": "Rock", "year": 1975, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 34, "title": "One", "artist": "U2", "genre": "Rock", "year": 1991, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 35, "title": "Don't Stop Believin'", "artist": "Journey", "genre": "Rock", "year": 1981, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 36, "title": "I Want to Hold Your Hand", "artist": "The Beatles", "genre": "Rock", "year": 1963, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 37, "title": "Gimme Shelter", "artist": "The Rolling Stones", "genre": "Rock", "year": 1969, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 38, "title": "What's Going On", "artist": "Marvin Gaye", "genre": "Soul", "year": 1971, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 39, "title": "Respect", "artist": "Aretha Franklin", "genre": "Soul", "year": 1967, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 40, "title": "I Heard It Through the Grapevine", "artist": "Marvin Gaye", "genre": "Soul", "year": 1968, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 41, "title": "Sexual Healing", "artist": "Marvin Gaye", "genre": "Soul", "year": 1982, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 42, "title": "Superstition", "artist": "Stevie Wonder", "genre": "Funk", "year": 1972, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 43, "title": "I Feel Good", "artist": "James Brown", "genre": "Funk", "year": 1965, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 44, "title": "Lose Yourself", "artist": "Eminem", "genre": "Hip Hop", "year": 2002, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 45, "title": "Juicy", "artist": "The Notorious B.I.G.", "genre": "Hip Hop", "year": 1994, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 46, "title": "Nuthin' but a 'G' Thang", "artist": "Dr. Dre ft. Snoop Dogg", "genre": "Hip Hop", "year": 1992, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 47, "title": "Hypnotize", "artist": "The Notorious B.I.G.", "genre": "Hip Hop", "year": 1997, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 48, "title": "Stan", "artist": "Eminem ft. Dido", "genre": "Hip Hop", "year": 2000, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 49, "title": "Can't Hold Us", "artist": "Macklemore & Ryan Lewis", "genre": "Hip Hop", "year": 2011, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 50, "title": "Happy", "artist": "Pharrell Williams", "genre": "Pop", "year": 2013, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 51, "title": "Uptown Funk", "artist": "Mark Ronson ft. Bruno Mars", "genre": "Pop", "year": 2014, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 52, "title": "Havana", "artist": "Camila Cabello ft. Young Thug", "genre": "Pop", "year": 2017, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 53, "title": "Old Town Road", "artist": "Lil Nas X ft. Billy Ray Cyrus", "genre": "Country", "year": 2019, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 54, "title": "Take Me Home, Country Roads", "artist": "John Denver", "genre": "Country", "year": 1971, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 55, "title": "Jolene", "artist": "Dolly Parton", "genre": "Country", "year": 1973, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 56, "title": "Ring of Fire", "artist": "Johnny Cash", "genre": "Country", "year": 1963, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 57, "title": "Despacito", "artist": "Luis Fonsi ft. Daddy Yankee", "genre": "Pop Latino", "year": 2017, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 58, "title": "La Bamba", "artist": "Ritchie Valens", "genre": "Rock and Roll", "year": 1958, "decade": "1950s", "liked": false, "capa": "" },
  { "id": 59, "title": "Mambo No. 5", "artist": "Lou Bega", "genre": "Pop Latino", "year": 1999, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 60, "title": "Livin' La Vida Loca", "artist": "Ricky Martin", "genre": "Pop Latino", "year": 1999, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 61, "title": "Macarena", "artist": "Los Del Río", "genre": "Pop Latino", "year": 1993, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 62, "title": "Smooth", "artist": "Santana ft. Rob Thomas", "genre": "Rock", "year": 1999, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 63, "title": "Tudo Que Você Podia Ser", "artist": "Clube da Esquina", "genre": "MPB", "year": 1972, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 64, "title": "Chega de Saudade", "artist": "João Gilberto", "genre": "Bossa Nova", "year": 1958, "decade": "1950s", "liked": false, "capa": "" },
  { "id": 65, "title": "Mas Que Nada", "artist": "Jorge Ben Jor", "genre": "Samba", "year": 1963, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 66, "title": "País Tropical", "artist": "Jorge Ben Jor", "genre": "Samba", "year": 1969, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 67, "title": "Anna Julia", "artist": "Los Hermanos", "genre": "Rock Alternativo", "year": 1999, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 68, "title": "O Vento", "artist": "Jota Quest", "genre": "Pop Rock", "year": 2000, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 69, "title": "Toda Forma de Amor", "artist": "Lulu Santos", "genre": "Pop", "year": 1988, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 70, "title": "Admirável Gado Novo", "artist": "Zé Ramalho", "genre": "MPB", "year": 1979, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 71, "title": "Catedral", "artist": "Zélia Duncan", "genre": "Pop Rock", "year": 1994, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 72, "title": "Lágrimas e Chuva", "artist": "Kid Abelha", "genre": "Pop Rock", "year": 1985, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 73, "title": "Me Chama", "artist": "Lobão", "genre": "Rock", "year": 1984, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 74, "title": "Malandragem", "artist": "Cássia Eller", "genre": "Rock", "year": 1994, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 75, "title": "O Segundo Sol", "artist": "Cássia Eller", "genre": "Rock", "year": 1999, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 76, "title": "Fullgás", "artist": "Marina Lima", "genre": "Pop", "year": 1984, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 77, "title": "Primeiros Erros", "artist": "Capital Inicial", "genre": "Rock", "year": 1985, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 78, "title": "À Francesa", "artist": "Marina Lima", "genre": "Pop", "year": 1989, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 79, "title": "Olhos de Jabuticaba", "artist": "Mundo Livre S/A", "genre": "Manguebeat", "year": 1994, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 80, "title": "A Praieira", "artist": "Chico Science & Nação Zumbi", "genre": "Manguebeat", "year": 1994, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 81, "title": "Meu Erro", "artist": "Os Paralamas do Sucesso", "genre": "Rock", "year": 1984, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 82, "title": "Exagerado", "artist": "Cazuza", "genre": "Rock", "year": 1985, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 83, "title": "Codinome Beija-Flor", "artist": "Cazuza", "genre": "MPB", "year": 1985, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 84, "title": "O Barquinho", "artist": "Maysa", "genre": "Bossa Nova", "year": 1961, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 85, "title": "Samba de Verão", "artist": "Marcos Valle", "genre": "Bossa Nova", "year": 1964, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 86, "title": "Canta Canta, Minha Gente", "artist": "Martinho da Vila", "genre": "Samba", "year": 1974, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 87, "title": "O Samba da Minha Terra", "artist": "Dorival Caymmi", "genre": "Samba", "year": 1940, "decade": "1940s", "liked": false, "capa": "" },
  { "id": 88, "title": "Vou Festejar", "artist": "Beth Carvalho", "genre": "Samba", "year": 1978, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 89, "title": "Águas de Março", "artist": "Elis Regina & Tom Jobim", "genre": "MPB", "year": 1972, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 90, "title": "O Bêbado e a Equilibrista", "artist": "Elis Regina", "genre": "MPB", "year": 1979, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 91, "title": "Sampa", "artist": "Caetano Veloso", "genre": "MPB", "year": 1978, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 92, "title": "Baby", "artist": "Gal Costa", "genre": "MPB", "year": 1969, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 93, "title": "Pra Não Dizer Que Não Falei das Flores", "artist": "Geraldo Vandré", "genre": "MPB", "year": 1968, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 94, "title": "Vaca Profana", "artist": "Gal Costa", "genre": "MPB", "year": 1984, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 95, "title": "O Canto da Cidade", "artist": "Daniela Mercury", "genre": "Axé", "year": 1992, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 96, "title": "Eva", "artist": "Banda Eva", "genre": "Axé", "year": 1997, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 97, "title": "Faraó", "artist": "Olodum", "genre": "Axé", "year": 1987, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 98, "title": "Mulher Rendeira", "artist": "Zé do Norte", "genre": "Forró", "year": 1953, "decade": "1950s", "liked": false, "capa": "" },
  { "id": 99, "title": "Asa Branca", "artist": "Luiz Gonzaga", "genre": "Forró", "year": 1947, "decade": "1940s", "liked": false, "capa": "" },
  { "id": 100, "title": "A Vida do Viajante", "artist": "Luiz Gonzaga", "genre": "Forró", "year": 1953, "decade": "1950s", "liked": false, "capa": "" },
  { "id": 101, "title": "Stand by Me", "artist": "Ben E. King", "genre": "Soul", "year": 1961, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 102, "title": "Georgia on My Mind", "artist": "Ray Charles", "genre": "Jazz", "year": 1960, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 103, "title": "At Last", "artist": "Etta James", "genre": "Soul", "year": 1960, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 104, "title": "What a Wonderful World", "artist": "Louis Armstrong", "genre": "Jazz", "year": 1967, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 105, "title": "My Way", "artist": "Frank Sinatra", "genre": "Pop", "year": 1969, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 106, "title": "Hound Dog", "artist": "Elvis Presley", "genre": "Rock and Roll", "year": 1956, "decade": "1950s", "liked": false, "capa": "" },
  { "id": 107, "title": "Jailhouse Rock", "artist": "Elvis Presley", "genre": "Rock and Roll", "year": 1957, "decade": "1950s", "liked": false, "capa": "" },
  { "id": 108, "title": "Johnny B. Goode", "artist": "Chuck Berry", "genre": "Rock and Roll", "year": 1958, "decade": "1950s", "liked": false, "capa": "" },
  { "id": 109, "title": "Tutti Frutti", "artist": "Little Richard", "genre": "Rock and Roll", "year": 1955, "decade": "1950s", "liked": false, "capa": "" },
  { "id": 110, "title": "I Walk the Line", "artist": "Johnny Cash", "genre": "Country", "year": 1956, "decade": "1950s", "liked": false, "capa": "" },
  { "id": 111, "title": "Good Vibrations", "artist": "The Beach Boys", "genre": "Pop", "year": 1966, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 112, "title": "California Dreamin'", "artist": "The Mamas & the Papas", "genre": "Folk", "year": 1965, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 113, "title": "Let It Be", "artist": "The Beatles", "genre": "Rock", "year": 1970, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 114, "title": "Rocket Man", "artist": "Elton John", "genre": "Pop", "year": 1972, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 115, "title": "Dancing in the Street", "artist": "Martha Reeves & the Vandellas", "genre": "Soul", "year": 1964, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 116, "title": "I Heard It Through the Grapevine", "artist": "Gladys Knight & the Pips", "genre": "Soul", "year": 1967, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 117, "title": "What's Love Got to Do with It", "artist": "Tina Turner", "genre": "Pop", "year": 1984, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 118, "title": "Every Breath You Take", "artist": "The Police", "genre": "Rock", "year": 1983, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 119, "title": "With or Without You", "artist": "U2", "genre": "Rock", "year": 1987, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 120, "title": "Losing My Religion", "artist": "R.E.M.", "genre": "Rock Alternativo", "year": 1991, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 121, "title": "Creep", "artist": "Radiohead", "genre": "Rock Alternativo", "year": 1992, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 122, "title": "Under the Bridge", "artist": "Red Hot Chili Peppers", "genre": "Rock", "year": 1991, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 123, "title": "Ironic", "artist": "Alanis Morissette", "genre": "Rock", "year": 1996, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 124, "title": "...Baby One More Time", "artist": "Britney Spears", "genre": "Pop", "year": 1998, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 125, "title": "Toxicity", "artist": "System of a Down", "genre": "Rock", "year": 2001, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 126, "title": "In the End", "artist": "Linkin Park", "genre": "Rock", "year": 2000, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 127, "title": "Crazy in Love", "artist": "Beyoncé ft. Jay-Z", "genre": "Pop", "year": 2003, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 128, "title": "Since U Been Gone", "artist": "Kelly Clarkson", "genre": "Pop Rock", "year": 2004, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 129, "title": "Poker Face", "artist": "Lady Gaga", "genre": "Pop", "year": 2008, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 130, "title": "Rolling in the Deep", "artist": "Adele", "genre": "Pop Soul", "year": 2010, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 131, "title": "Someone Like You", "artist": "Adele", "genre": "Pop Soul", "year": 2011, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 132, "title": "Counting Stars", "artist": "OneRepublic", "genre": "Pop", "year": 2013, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 133, "title": "Blank Space", "artist": "Taylor Swift", "genre": "Pop", "year": 2014, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 134, "title": "Hello", "artist": "Adele", "genre": "Pop Soul", "year": 2015, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 135, "title": "Sorry", "artist": "Justin Bieber", "genre": "Pop", "year": 2015, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 136, "title": "Thinking Out Loud", "artist": "Ed Sheeran", "genre": "Pop", "year": 2014, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 137, "title": "Seaside", "artist": "The Kooks", "genre": "Rock Alternativo", "year": 2006, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 138, "title": "I'm Yours", "artist": "Jason Mraz", "genre": "Pop", "year": 2008, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 139, "title": "Drops of Jupiter", "artist": "Train", "genre": "Pop Rock", "year": 2001, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 140, "title": "Complicated", "artist": "Avril Lavigne", "genre": "Pop Punk", "year": 2002, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 141, "title": "Hey Ya!", "artist": "OutKast", "genre": "Hip Hop", "year": 2003, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 142, "title": "Crazy", "artist": "Gnarls Barkley", "genre": "Soul", "year": 2006, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 143, "title": "Viva La Vida", "artist": "Coldplay", "genre": "Rock Alternativo", "year": 2008, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 144, "title": "Yellow", "artist": "Coldplay", "genre": "Rock Alternativo", "year": 2000, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 145, "title": "Mr. Brightside", "artist": "The Killers", "genre": "Rock Alternativo", "year": 2003, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 146, "title": "Hips Don't Lie", "artist": "Shakira ft. Wyclef Jean", "genre": "Pop Latino", "year": 2006, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 147, "title": "Umbrella", "artist": "Rihanna ft. Jay-Z", "genre": "Pop", "year": 2007, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 148, "title": "Single Ladies (Put a Ring on It)", "artist": "Beyoncé", "genre": "Pop", "year": 2008, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 149, "title": "Seven Nation Army", "artist": "The White Stripes", "genre": "Rock Alternativo", "year": 2003, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 150, "title": "I Gotta Feeling", "artist": "The Black Eyed Peas", "genre": "Pop", "year": 2009, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 151, "title": "In The Air Tonight", "artist": "Phil Collins", "genre": "Pop Rock", "year": 1981, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 152, "title": "Take on Me", "artist": "A-ha", "genre": "Pop", "year": 1985, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 153, "title": "Girls Just Want to Have Fun", "artist": "Cyndi Lauper", "genre": "Pop", "year": 1983, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 154, "title": "Sweet Dreams (Are Made of This)", "artist": "Eurythmics", "genre": "Synth-pop", "year": 1983, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 155, "title": "Like a Virgin", "artist": "Madonna", "genre": "Pop", "year": 1984, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 159, "title": "Africa", "artist": "Toto", "genre": "Pop Rock", "year": 1982, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 161, "title": "Bizarre Love Triangle", "artist": "New Order", "genre": "Synth-pop", "year": 1986, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 162, "title": "Blue Monday", "artist": "New Order", "genre": "Synth-pop", "year": 1983, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 163, "title": "Enjoy the Silence", "artist": "Depeche Mode", "genre": "Synth-pop", "year": 1990, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 164, "title": "Personal Jesus", "artist": "Depeche Mode", "genre": "Synth-pop", "year": 1989, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 165, "title": "Lullaby", "artist": "The Cure", "genre": "Rock", "year": 1989, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 166, "title": "Just Like Heaven", "artist": "The Cure", "genre": "Rock", "year": 1987, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 167, "title": "Love Will Tear Us Apart", "artist": "Joy Division", "genre": "Post-Punk", "year": 1980, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 168, "title": "Rebel Rebel", "artist": "David Bowie", "genre": "Glam Rock", "year": 1974, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 169, "title": "Ziggy Stardust", "artist": "David Bowie", "genre": "Glam Rock", "year": 1972, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 171, "title": "Bennie and the Jets", "artist": "Elton John", "genre": "Pop", "year": 1973, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 172, "title": "Tiny Dancer", "artist": "Elton John", "genre": "Pop", "year": 1971, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 174, "title": "Waterloo", "artist": "ABBA", "genre": "Pop", "year": 1974, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 175, "title": "Take a Chance on Me", "artist": "ABBA", "genre": "Pop", "year": 1977, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 176, "title": "Stayin' Alive", "artist": "Bee Gees", "genre": "Disco", "year": 1977, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 177, "title": "How Deep Is Your Love", "artist": "Bee Gees", "genre": "Disco", "year": 1977, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 178, "title": "Night Fever", "artist": "Bee Gees", "genre": "Disco", "year": 1977, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 179, "title": "Le Freak", "artist": "Chic", "genre": "Disco", "year": 1978, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 180, "title": "I Will Survive", "artist": "Gloria Gaynor", "genre": "Disco", "year": 1978, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 185, "title": "Let's Get It On", "artist": "Marvin Gaye", "genre": "Soul", "year": 1973, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 187, "title": "September", "artist": "Earth, Wind & Fire", "genre": "Disco", "year": 1978, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 192, "title": "Sweet Caroline", "artist": "Neil Diamond", "genre": "Pop", "year": 1969, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 193, "title": "All You Need Is Love", "artist": "The Beatles", "genre": "Rock", "year": 1967, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 195, "title": "You've Lost That Lovin' Feelin'", "artist": "The Righteous Brothers", "genre": "Soul", "year": 1964, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 196, "title": "My Girl", "artist": "The Temptations", "genre": "Soul", "year": 1964, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 197, "title": "Unchained Melody", "artist": "The Righteous Brothers", "genre": "Pop", "year": 1965, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 198, "title": "Can't Help Falling in Love", "artist": "Elvis Presley", "genre": "Pop", "year": 1961, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 199, "title": "I Got You Babe", "artist": "Sonny & Cher", "genre": "Pop", "year": 1965, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 200, "title": "A Day in the Life", "artist": "The Beatles", "genre": "Rock", "year": 1967, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 201, "title": "DDU-DU DDU-DU", "artist": "BLACKPINK", "genre": "K-Pop", "year": 2018, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 202, "title": "Dynamite", "artist": "BTS", "genre": "K-Pop", "year": 2020, "decade": "2020s", "liked": false, "capa": "" },
  { "id": 203, "title": "Gangnam Style", "artist": "PSY", "genre": "K-Pop", "year": 2012, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 204, "title": "LALISA", "artist": "Lisa", "genre": "K-Pop", "year": 2021, "decade": "2020s", "liked": false, "capa": "" },
  { "id": 205, "title": "IDOL", "artist": "BTS", "genre": "K-Pop", "year": 2018, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 206, "title": "Kill This Love", "artist": "BLACKPINK", "genre": "K-Pop", "year": 2019, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 207, "title": "How You Like That", "artist": "BLACKPINK", "genre": "K-Pop", "year": 2020, "decade": "2020s", "liked": false, "capa": "" },
  { "id": 208, "title": "DNA", "artist": "BTS", "genre": "K-Pop", "year": 2017, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 209, "title": "Fancy", "artist": "TWICE", "genre": "K-Pop", "year": 2019, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 210, "title": "BOOMBAYAH", "artist": "BLACKPINK", "genre": "K-Pop", "year": 2016, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 211, "title": "A Kind of Magic", "artist": "Queen", "genre": "Rock", "year": 1986, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 212, "title": "Another One Bites the Dust", "artist": "Queen", "genre": "Rock", "year": 1980, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 213, "title": "I Want to Break Free", "artist": "Queen", "genre": "Rock", "year": 1984, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 214, "title": "We Will Rock You", "artist": "Queen", "genre": "Rock", "year": 1977, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 215, "title": "Don't Stop Me Now", "artist": "Queen", "genre": "Rock", "year": 1979, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 216, "title": "Somebody to Love", "artist": "Queen", "genre": "Rock", "year": 1976, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 217, "title": "Ai Que Saudade D'ocê", "artist": "Gilberto Gil", "genre": "MPB", "year": 1973, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 218, "title": "Andar com Fé", "artist": "Gilberto Gil", "genre": "MPB", "year": 1982, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 219, "title": "Palco", "artist": "Gilberto Gil", "genre": "MPB", "year": 1982, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 220, "title": "Vamos Fugir", "artist": "Gilberto Gil", "genre": "Reggae", "year": 1984, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 221, "title": "A Novidade", "artist": "Gilberto Gil", "genre": "MPB", "year": 1978, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 222, "title": "Rock and Roll", "artist": "Rita Lee", "genre": "Rock", "year": 1975, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 223, "title": "Mania de Você", "artist": "Rita Lee", "genre": "Pop", "year": 1979, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 224, "title": "Lança Perfume", "artist": "Rita Lee", "genre": "Pop", "year": 1980, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 225, "title": "Flagra", "artist": "Rita Lee", "genre": "Pop", "year": 1982, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 226, "title": "Desculpe o Auê", "artist": "Rita Lee", "genre": "Pop", "year": 1983, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 227, "title": "Amor e Sexo", "artist": "Rita Lee", "genre": "Pop", "year": 1983, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 228, "title": "Ovelha Negra", "artist": "Rita Lee", "genre": "Rock", "year": 1975, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 229, "title": "Eu Não Existo Sem Você", "artist": "Tom Jobim", "genre": "Bossa Nova", "year": 1961, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 230, "title": "Corcovado", "artist": "Tom Jobim", "genre": "Bossa Nova", "year": 1960, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 231, "title": "Chega de Saudade", "artist": "Tom Jobim", "genre": "Bossa Nova", "year": 1958, "decade": "1950s", "liked": false, "capa": "" },
  { "id": 232, "title": "O Morro Não Tem Vez", "artist": "Tom Jobim", "genre": "Bossa Nova", "year": 1963, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 233, "title": "Samba de Uma Nota Só", "artist": "Tom Jobim", "genre": "Bossa Nova", "year": 1960, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 234, "title": "I Feel It Coming", "artist": "The Weeknd ft. Daft Punk", "genre": "Pop", "year": 2016, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 235, "title": "Blinding Lights", "artist": "The Weeknd", "genre": "Pop", "year": 2019, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 236, "title": "Levitating", "artist": "Dua Lipa", "genre": "Pop", "year": 2020, "decade": "2020s", "liked": false, "capa": "" },
  { "id": 237, "title": "As It Was", "artist": "Harry Styles", "genre": "Pop", "year": 2022, "decade": "2020s", "liked": false, "capa": "" },
  { "id": 239, "title": "Bad Guy", "artist": "Billie Eilish", "genre": "Pop", "year": 2019, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 240, "title": "Driver's License", "artist": "Olivia Rodrigo", "genre": "Pop", "year": 2021, "decade": "2020s", "liked": false, "capa": "" },
  { "id": 241, "title": "good 4 u", "artist": "Olivia Rodrigo", "genre": "Pop", "year": 2021, "decade": "2020s", "liked": false, "capa": "" },
  { "id": 242, "title": "Happier Than Ever", "artist": "Billie Eilish", "genre": "Pop", "year": 2021, "decade": "2020s", "liked": false, "capa": "" },
  { "id": 243, "title": "Bohemian Rhapsody", "artist": "Panic! At The Disco", "genre": "Pop Punk", "year": 2005, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 244, "title": "Misery Business", "artist": "Paramore", "genre": "Pop Punk", "year": 2007, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 245, "title": "Welcome to the Black Parade", "artist": "My Chemical Romance", "genre": "Pop Punk", "year": 2006, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 246, "title": "Basket Case", "artist": "Green Day", "genre": "Pop Punk", "year": 1994, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 247, "title": "All the Small Things", "artist": "Blink-182", "genre": "Pop Punk", "year": 1999, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 248, "title": "Pássaro de Fogo", "artist": "Paula Fernandes", "genre": "Sertanejo", "year": 2009, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 251, "title": "Caminhoneiro", "artist": "Roberto Carlos", "genre": "Sertanejo", "year": 1984, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 252, "title": "Love on Top", "artist": "Beyoncé", "genre": "Soul", "year": 2011, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 253, "title": "Rehab", "artist": "Amy Winehouse", "genre": "Soul", "year": 2006, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 256, "title": "Levels", "artist": "Avicii", "genre": "Eletrônica", "year": 2011, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 257, "title": "Wake Me Up", "artist": "Avicii", "genre": "Eletrônica", "year": 2013, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 258, "title": "Titanium", "artist": "David Guetta ft. Sia", "genre": "Eletrônica", "year": 2011, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 259, "title": "Get Lucky", "artist": "Daft Punk ft. Pharrell Williams", "genre": "Eletrônica", "year": 2013, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 260, "title": "One More Time", "artist": "Daft Punk", "genre": "Eletrônica", "year": 2000, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 261, "title": "I Could Be The One", "artist": "Avicii vs Nicky Romero", "genre": "Eletrônica", "year": 2012, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 262, "title": "Animals", "artist": "Martin Garrix", "genre": "Eletrônica", "year": 2013, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 263, "title": "Strobe", "artist": "Deadmau5", "genre": "Eletrônica", "year": 2009, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 264, "title": "Closer", "artist": "The Chainsmokers ft. Halsey", "genre": "Eletrônica", "year": 2016, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 265, "title": "Lean On", "artist": "Major Lazer & DJ Snake ft. MØ", "genre": "Eletrônica", "year": 2015, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 267, "title": "Oceano", "artist": "Djavan", "genre": "MPB", "year": 1989, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 268, "title": "Flor de Lis", "artist": "Djavan", "genre": "MPB", "year": 1976, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 269, "title": "Sina", "artist": "Djavan", "genre": "MPB", "year": 1982, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 270, "title": "Se...", "artist": "Djavan", "genre": "MPB", "year": 1984, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 271, "title": "Tropicana", "artist": "Alceu Valença", "genre": "MPB", "year": 1982, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 272, "title": "Morena Tropicana", "artist": "Alceu Valença", "genre": "MPB", "year": 1982, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 273, "title": "Anarchy in the U.K.", "artist": "Sex Pistols", "genre": "Punk Rock", "year": 1976, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 274, "title": "London Calling", "artist": "The Clash", "genre": "Punk Rock", "year": 1979, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 275, "title": "Blitzkrieg Bop", "artist": "Ramones", "genre": "Punk Rock", "year": 1976, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 276, "title": "I Wanna Be Sedated", "artist": "Ramones", "genre": "Punk Rock", "year": 1978, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 277, "title": "God Save the Queen", "artist": "Sex Pistols", "genre": "Punk Rock", "year": 1977, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 278, "title": "Should I Stay or Should I Go", "artist": "The Clash", "genre": "Punk Rock", "year": 1982, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 279, "title": "I Will Survive", "artist": "Gloria Gaynor", "genre": "Soul", "year": 1978, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 280, "title": "Midnight Train to Georgia", "artist": "Gladys Knight & The Pips", "genre": "Soul", "year": 1973, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 281, "title": "Let's Stay Together", "artist": "Al Green", "genre": "Soul", "year": 1972, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 282, "title": "Easy", "artist": "Lionel Richie", "genre": "Soul", "year": 1977, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 283, "title": "I Got a Woman", "artist": "Ray Charles", "genre": "Soul", "year": 1954, "decade": "1950s", "liked": false, "capa": "" },
  { "id": 284, "title": "Hit the Road Jack", "artist": "Ray Charles", "genre": "Soul", "year": 1961, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 290, "title": "Sertanejo Universitário", "artist": "Zé Neto & Cristiano", "genre": "Sertanejo", "year": 2010, "decade": "2010s", "liked": false, "capa": "" },
  { "id": 292, "title": "Telefone Mudo", "artist": "Trio Parada Dura", "genre": "Sertanejo", "year": 1977, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 293, "title": "Fio de Cabelo", "artist": "Chitãozinho & Xororó", "genre": "Sertanejo", "year": 1986, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 294, "title": "Estrada da Vida", "artist": "Milionário & José Rico", "genre": "Sertanejo", "year": 1978, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 295, "title": "Deus Me Livre", "artist": "Daniel", "genre": "Sertanejo", "year": 2000, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 296, "title": "Lobo Mau", "artist": "Rita Lee", "genre": "Rock", "year": 1975, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 297, "title": "Doce Vampiro", "artist": "Rita Lee", "genre": "Pop Rock", "year": 1979, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 298, "title": "Papai me Empresta o Carro", "artist": "Rita Lee", "genre": "Pop Rock", "year": 1982, "decade": "1980s", "liked": false, "capa": "" },
  { "id": 299, "title": "Pagu", "artist": "Rita Lee", "genre": "Rock", "year": 2000, "decade": "2000s", "liked": false, "capa": "" },
  { "id": 300, "title": "É o Amor", "artist": "Zezé Di Camargo & Luciano", "genre": "Sertanejo", "year": 1991, "decade": "1990s", "liked": false, "capa": "" },
  { "id": 301, "title": "Apesar de Você", "artist": "Chico Buarque", "genre": "MPB", "year": 1970, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 302, "title": "Cálice", "artist": "Chico Buarque & Milton Nascimento", "genre": "MPB", "year": 1973, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 303, "title": "Construção", "artist": "Chico Buarque", "genre": "MPB", "year": 1971, "decade": "1970s", "liked": false, "capa": "" },
  { "id": 304, "title": "Girl from Ipanema", "artist": "Tom Jobim", "genre": "Bossa Nova", "year": 1963, "decade": "1960s", "liked": false, "capa": "" },
  { "id": 305, "title": "Wave", "artist": "Tom Jobim", "genre": "Bossa Nova", "year": 1967, "decade": "1960s", "liked": false, "capa": "" }
];
  saveSongs(songs) // salva as músicas no localStorage
  return songs              // retorna as músicas
}

// ========================
// CRUD funcional (Create, Read, Update, Delete)
// ========================

// Adiciona uma nova música (retorna um novo array sem modificar o original)
const addSong = (songs, newSong) => [...songs, newSong]


// Remove uma música pelo id (filtra todas menos a que tem o id fornecido)
const deleteSong = (songs, id) =>
  songs.filter(song => song.id !== parseInt(id))

// ========================
// Listagem e formatação
// ========================

// Lista apenas as músicas de um artista específico
const listSongsByArtist = (songs, artistName) =>
  songs.filter(song => song.artist === artistName)

// Lista apenas as músicas de um gênero específico
const listSongsByGenre = (songs, genreName) =>
  songs.filter(song => song.genre === genreName)

// Lista músicas de acordo com a década
const listSongsByDecade = (songs, decade) =>
  songs.filter(song => song.decade === decade)

// Conta quantas músicas cada artista/banda possui
// Retorna um objeto no formato { artista: quantidade }
const countSongsByArtist = (songs) =>
  songs.reduce((acc, song) => {
    acc[song.artist] = (acc[song.artist] || 0) + 1
    return acc
  }, {})

// Conta quantas músicas existem por década
const countSongsByDecade = (songs) =>
  songs.reduce((acc, song) => {
    acc[song.decade] = (acc[song.decade] || 0) + 1
    return acc
  }, {})

// Conta músicas agrupadas por gênero
const countSongsByGenre = (songs) =>
  songs.reduce((acc, song) => {
    acc[song.genre] = (acc[song.genre] || 0) + 1
    return acc
  }, {})

// ========================
// Formatação de saída
// ========================
// Permite formatar a lista de músicas de forma flexível.
// Recebe uma função "formatFn" que define como cada música deve aparecer.
const formatSongs = (songs, formatFn) =>
  songs.map((song, index) => formatFn(song, index)).join('\n')

// Formatação curta: apenas o título com numeração
const shortFormat = (song, i) => `${i + 1}. ${song.title}`

// Formatação completa: id, título, artista e ano
const fullFormat = song =>
  `${song.id} - "${song.title}" (${song.artist}, ${song.year})`

// ========================
// Playlists (operações funcionais para criar listas)
// ========================

// take: pega os primeiros N elementos de uma lista
const take = ([x, ...xs], n) =>
  n <= 0 || x === undefined ? [] : [x, ...take(xs, n - 1)]

// drop: remove os primeiros N elementos e retorna o restante.
const drop = ([x, ...xs], n) =>
  n <= 0 || x === undefined ? [x, ...xs].filter(v => v !== undefined)
    : drop(xs, n - 1)

// chunkSongs: divide a lista em "blocos" de tamanho N (útil para criar playlists)
const chunkSongs = ([x, ...xs], n) => {
  if (x === undefined) return []
  const first = take([x, ...xs], n)
  const rest = drop([x, ...xs], n)
  return [first, ...chunkSongs(rest, n)]
}

// Cria uma playlist apenas com músicas de um gênero.
const createPlaylistByGenre = (songs, genre) => {
  return songs.filter(song => song.genre.toLowerCase() === genre.toLowerCase())
}

// Cria uma playlist filtrando por gênero e também pela década.
const createPlaylistByDG = (songs, genre, decade) => {
  const mixByGenre = songs.filter(song => song.genre.toLowerCase() === genre.toLowerCase())
  const mixByDecade = mixByGenre.filter(song => song.decade === decade)
  return mixByDecade
}

// Cria uma playlist filtrando as músicas por artista.
const createPlaylistByArtist = (songs, artist) => {
  return songs.filter(song => song.artist.toLowerCase() === artist.toLowerCase());
}

// Cria uma playlist filtrando as músicas pelas palavras-chave de "humor"
const createPlaylistByMood = (songs, moodMapping, targetMood) => {
    // Função que encontra os gêneros associados ao mood (estilo).
    const targetGenres = Object.keys(moodMapping).filter(genre => moodMapping[genre] === targetMood);
    // Se nenhum gênero for encontrado, retorna um array vazio.
    if (targetGenres.length === 0) {
        return [];
    }
    // Filtra as músicas que correspondem a um desses gêneros
    const playlistSongs = songs.filter(song => targetGenres.includes(song.genre));
    // Retorna a lista de músicas encontrada
    return playlistSongs;
};

// Como os moods se "repetem", juntamos os moods em uma playlist. Pegamos os moods (elétrico, dançante, etc.) e comparamos com os estilos (skatecore, gymcore, etc.). Com isso, fazemos playlists específicas do estilo.

const createPlaylistByStyle = (songs, styleMapping, moodMapping, targetStyle) => {
    // 1. Encontra o array de humores para o estilo alvo
    const targetMoods = styleMapping[targetStyle];
    // Se não houver humores mapeados para o estilo, retorna um array vazio
    if (!targetMoods) {
        return [];
    }
    // 2. Coleta todos os gêneros que correspondem a esses humores
    const targetGenres = new Set(); // Usa um Set para garantir gêneros únicos
    targetMoods.forEach(mood => {
        const genresForMood = Object.keys(moodMapping).filter(genre => moodMapping[genre] === mood);
        genresForMood.forEach(genre => targetGenres.add(genre));
    });
    // 3. Filtra as músicas com base nesses gêneros
    return songs.filter(song => targetGenres.has(song.genre));
};

// Outros
const kwMood = {
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

// Extrai e ordena valores do array (songs).
const getUnique = (songs, propertyName) => {
    const uniqueValues = [...new Set(songs.map(song => song[propertyName]))];
    uniqueValues.sort();
    return uniqueValues;
};

// Rendriza as opções de filtro e as coloca em um menu HTML.
const renderFilterOptions = (options, selector, defaultOptionText) => {
    const filterElement = document.querySelector(selector);
    if (filterElement) {
        const optionsHTML = options.map(option => `<option value="${option}">${option}</option>`).join('');
        filterElement.innerHTML = `<option value="${defaultOptionText}">${defaultOptionText}</option>` + optionsHTML;
    }
};

// Ordena por critérios, como título e ano.
const sortSongs = (songs, sortMethod, sortDirection) => {
    let sortedSongs = [...songs]
    switch (sortMethod) {
        case 'title': sortedSongs.sort((a, b) => a.title.localeCompare(b.title)); break;
        //                                                 '-> compara os títulos das músicas
        case 'year': sortedSongs.sort((a, b) => {
            const yearA = parseInt(a.year, 10) || 0;
            const yearB = parseInt(b.year, 10) || 0;
            return yearB - yearA;
        });
            break;
        case 'default': break;
    }
    if (sortDirection === 'desc') { sortedSongs.reverse(); }
    return sortedSongs
};

// ========================
// Exporta todas as funções como um objeto Music
// Isso facilita o uso em outros arquivos (ex: ui.js)
// ========================
export const Music = {
  // Persistência
  loadSongs, saveSongs, resetSongs, clearSongs,

  // CRUD
  addSong, deleteSong,
  
  // Exibição
  listSongsByArtist, listSongsByGenre, listSongsByDecade,
  countSongsByArtist, countSongsByDecade, countSongsByGenre,
  formatSongs, shortFormat, fullFormat,

  // Playlist
  take, drop, chunkSongs, createPlaylistByGenre, createPlaylistByDG, createPlaylistByArtist, createPlaylistByMood, createPlaylistByStyle, 

  // Outros
  renderFilterOptions, sortSongs, getUnique,
  getSongWithCover: async (song) => {
    try {
      const response = await fetch('http://localhost:3000/api/get-song-preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          song: song.title,
          artist: song.artist
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Se a resposta for bem-sucedida, retorna o objeto de música com a capa e a prévia
        return {
          ...song,
          capa: data.coverUrl,
          preview: data.previewUrl
        };
      } else {
        console.error('Erro do servidor:', data.error);
        return { ...song, capa: './img/default-cover.png' };
      }
    } catch (error) {
      console.error('Erro de rede ao buscar a capa:', error);
      return { ...song, capa: './img/default-cover.png' };
    }
  }
};