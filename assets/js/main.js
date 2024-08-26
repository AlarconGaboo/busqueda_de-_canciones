document.getElementById('search-button').addEventListener('click', function() {
    const artist = document.getElementById('artist-input').value.trim();
    const song = document.getElementById('song-input').value.trim();
    const lyricsResultDiv = document.getElementById('lyrics-result');

    // Limpia la letra mostrada si el usuario vuelve a buscar
    lyricsResultDiv.innerHTML = '';

    if (artist === '' || song === '') {
        lyricsResultDiv.textContent = 'Por favor, ingresa el nombre del artista y la canción.';
        console.log('Error: Artista o canción no ingresados.');
        return;
    }

    console.log(`Buscando letra para el artista: "${artist}" y la canción: "${song}"`);

    fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
        .then(response => response.json())
        .then(data => {
            console.log('Datos recibidos de la API:', data); // Muestra los datos obtenidos de la API

            if (data.lyrics) {
                let lyrics = data.lyrics;

                // Filtra las líneas vacías y "Paroles de la chanson"
                const filteredLyrics = lyrics.split('\n')
                    .filter(line => line.trim() !== '' && !line.includes("Paroles de la chanson"));

                console.log('Letras filtradas:', filteredLyrics); // Muestra las letras después de filtrarlas

                // Muestra cada línea de la letra en un div separado con comillas
                filteredLyrics.forEach(line => {
                    const lineElement = document.createElement('div');
                    lineElement.textContent = `"${line}"`;
                    lineElement.classList.add('lyric-line');
                    lyricsResultDiv.appendChild(lineElement);
                });

                if (filteredLyrics.length === 0) {
                    lyricsResultDiv.textContent = 'No se encontró la letra de la canción.';
                }
            } else {
                lyricsResultDiv.textContent = 'No se encontró la letra de la canción.';
            }
        })
        .catch(error => {
            console.error('Error al obtener la letra:', error);
            lyricsResultDiv.textContent = 'Hubo un error al obtener la letra de la canción. Por favor, intenta nuevamente.';
        });
});

// Limpia la letra cuando el usuario empieza a escribir en cualquiera de los campos
document.getElementById('artist-input').addEventListener('input', clearLyrics);
document.getElementById('song-input').addEventListener('input', clearLyrics);

function clearLyrics() {
    document.getElementById('lyrics-result').innerHTML = '';  // Limpia el contenido de las letras
    console.log('Letra borrada al comenzar una nueva búsqueda.');
}
