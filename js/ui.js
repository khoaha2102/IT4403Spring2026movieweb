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
    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "https://placehold.co/300x450?text=No+Image";

    html += `
      <div class="movie-card" data-id="${movie.id}">
        <img src="${poster}" alt="${movie.title} poster">
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
      </div>
    `;
  });

  $(container).html(html);
}

function renderMovieDetails(movie) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://placehold.co/300x450?text=No+Image";

  const html = `
    <img src="${poster}" alt="${movie.title} poster">
    <h2>${movie.title}</h2>
    <p><strong>Release Date:</strong> ${movie.release_date || "N/A"}</p>
    <p><strong>Rating:</strong> ${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
    <p>${movie.overview || "No description available."}</p>
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
    html += `
      <div class="top-item" data-id="${movie.id}">
        <div class="top-rank">${index + 1}</div>
        <div class="top-info">
          <h4>${movie.title}</h4>
          <p>⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
        </div>
      </div>
    `;
  });

  $("#topPopularList").html(html);
}
