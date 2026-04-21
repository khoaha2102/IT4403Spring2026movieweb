// Render movie cards
function renderMovies(movies, container = "#homeView .movie-grid") {
  let html = "";

  movies.forEach(function (movie) {
    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "https://placehold.co/300x450?text=No+Image";

    html += `
      <div class="movie-card" data-id="${movie.id}">
        <img src="${poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average}</p>
      </div>
    `;
  });

  $(container).html(html);
}

// Render movie details page
function renderMovieDetails(movie) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://placehold.co/300x450?text=No+Image";

  const html = `
    <img src="${poster}" alt="${movie.title}">
    <h2>${movie.title}</h2>
    <p>Release Date: ${movie.release_date || "N/A"}</p>
    <p>Rating: ${movie.vote_average || "N/A"}</p>
    <p>${movie.overview || "No description available."}</p>
  `;

  $("#detailsView .movie-details").html(html);
}
