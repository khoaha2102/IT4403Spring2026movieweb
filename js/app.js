$(document).ready(function () {

  // NAV BUTTONS
  $("#homeBtn").click(function () {
    showView("homeView");
  });

  $("#searchBtn").click(function () {
    showView("searchView");
  });

  $("#favoritesBtn").click(function () {
    showView("favoritesView");
  });

  $("#backBtn").click(function () {
    showView("homeView");
  });

  // SEARCH BUTTON
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

  // CLICK MOVIE → DETAILS
  $(document).on("click", ".movie-card", function () {
    const movieId = $(this).data("id");

    getMovieDetails(movieId).done(function (movie) {
      renderMovieDetails(movie);
      showView("detailsView");
    }).fail(function () {
      console.log("Details failed");
    });
  });

  // LOAD HOME MOVIES
  getPopularMovies().done(function (data) {
    renderMovies(data.results);
  }).fail(function () {
    console.log("API failed");
  });

});

// SHOW VIEW (SPA)
function showView(viewId) {
  $("#homeView, #searchView, #favoritesView, #detailsView").hide();
  $("#" + viewId).show();
}
