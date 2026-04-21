function renderMovies(movies) {
  let html = "";

  movies.forEach(function (movie) {
    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "https://placehold.co/300x450?text=No+Image";

    html += `
      <div class="movie-card">
        <img src="${poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average}</p>
      </div>
    `;
  });

  $("#homeView .movie-grid").html(html);
}
