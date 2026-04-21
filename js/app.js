$(document).ready(function () {

  $("#homeBtn").click(function () {
    showView("homeView");
  });

  $("#searchBtn").click(function () {
    showView("searchView");
  });

  $("#favoritesBtn").click(function () {
    loadFavorites();
    showView("favoritesView");
  });

  $("#backBtn").click(function () {
    showView("homeView");
  });

  $("#searchSubmit").click(function () {
    const query = $("#searchInput").val().trim();

    if (!query) return;

    searchMovies(query).done(function (data) {
      renderMovies(data.results, "#searchView .movie-grid");
      showView("searchView");
    }).fail(function () {
      console.log("Search failed");
    });
  });

  $(document).on("click", ".movie-card", function () {
    const movieId = $(this).data("id");

    getMovieDetails(movieId).done(function (movie) {
      renderMovieDetails(movie);
      showView("detailsView");
    }).fail(function () {
      console.log("Details failed");
    });
  });

  $(document).on("click", "#addFavoriteBtn", function () {
    const movieId = $(this).data("id");

    console.log("Favorite button clicked, movie id:", movieId);

    addFavorite(movieId, true).done(function () {
      console.log("Added to Favorites");
      alert("Added to Favorites");
    }).fail(function (xhr) {
      console.log("Failed to add favorite", xhr.responseText);
      alert("Failed to add favorite");
    });
  });

  getPopularMovies().done(function (data) {
    renderMovies(data.results);
  }).fail(function () {
    console.log("API failed");
  });

});

function showView(viewId) {
  $("#homeView, #searchView, #favoritesView, #detailsView").hide();
  $("#" + viewId).show();
}

function loadFavorites() {
  getFavoriteMovies().done(function (data) {
    renderMovies(data.results, "#favoritesView .movie-grid");
  }).fail(function () {
    console.log("Failed to load favorites");
  });
}
