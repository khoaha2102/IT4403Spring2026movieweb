function renderMovies(movies, container = "#homeView .movie-grid") {
  if (!movies || movies.length === 0) {
    const message =
      container === "#favoritesView .movie-grid"
        ? "No favorites yet."
        : "No movies found. Try another search.";

    $(container).html(`<p>${message}</p>`);
    return;
  }

  let html = "";

  movies.forEach(function (movie) {
    if (!movie || !movie.id) return;

    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "https://placehold.co/300x450?text=No+Image";

    html += `
      <div class="movie-card" data-id="${movie.id}">
        <img src="${poster}" alt="${movie.title || "Movie"} poster">
        <h3>${movie.title || "Untitled Movie"}</h3>
        <p>⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
      </div>
    `;
  });

  $(container).html(html || "<p>No valid movies found.</p>");
}

function renderMovieDetails(movie, trailerKey = null) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://placehold.co/300x450?text=No+Image";

  let trailerHTML = "";

  if (trailerKey) {
    trailerHTML = `
      <div class="trailer-container">
        <h3>Trailer</h3>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/${trailerKey}"
          title="${movie.title || "Movie"} Trailer"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    `;
  } else {
    trailerHTML = `
      <div class="trailer-container">
        <h3>Trailer</h3>
        <p>No trailer available.</p>
      </div>
    `;
  }

  const html = `
    <img src="${poster}" alt="${movie.title || "Movie"} poster">
    <h2>${movie.title || "Untitled Movie"}</h2>
    <p><strong>Release Date:</strong> ${movie.release_date || "N/A"}</p>
    <p><strong>Rating:</strong> ${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
    <p>${movie.overview || "No description available."}</p>

    ${trailerHTML}

    <button id="favoriteToggleBtn" data-id="${movie.id}">Loading...</button>
  `;

  $("#movieModal .movie-details").html(html);
}

function renderGenres(genres) {
  let options = `<option value="">All Genres</option>`;

  genres.forEach(function (genre) {
    options += `<option value="${genre.id}">${genre.name}</option>`;
  });

  $("#genreSelect").html(options);
}

function renderTopPopular(movies) {
  const topMovies = movies.slice(0, 5);
  let html = "";

  topMovies.forEach(function (movie, index) {
    if (!movie || !movie.id) return;

    html += `
      <div class="top-item" data-id="${movie.id}">
        <div class="top-rank">${index + 1}</div>
        <div class="top-info">
          <h4>${movie.title || "Untitled Movie"}</h4>
          <p>⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
        </div>
      </div>
    `;
  });

  $("#topPopularList").html(html || "<p>No top movies available.</p>");
}
