$(document).ready(function () {
  showView("homeView");

  getGenres().done(function (data) {
    renderGenres(data.genres);
  }).fail(function () {
    console.log("Failed to load genres");
  });

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

    if (!query) {
      alert("Please enter a movie title.");
      return;
    }

    $("#searchView .movie-grid").html("<p>Loading search results...</p>");

    searchMovies(query).done(function (data) {
      renderMovies(data.results, "#searchView .movie-grid");
      showView("searchView");
    }).fail(function () {
      console.log("Search failed");
      alert("Search failed");
    });
  });

  $("#genreSelect").change(function () {
    const genreId = $(this).val();

    $("#homeView .movie-grid").html("<p>Loading movies...</p>");

    if (!genreId) {
      getPopularMovies().done(function (data) {
        renderMovies(data.results, "#homeView .movie-grid");
      }).fail(function () {
        alert("Failed to load popular movies");
      });
      return;
    }

    getMoviesByGenre(genreId).done(function (data) {
      renderMovies(data.results, "#homeView .movie-grid");
      showView("homeView");
    }).fail(function () {
      alert("Failed to load movies by genre");
    });
  });

  $(document).on("click", ".movie-card", function () {
    const movieId = $(this).data("id");

    getMovieDetails(movieId).done(function (movie) {
      renderMovieDetails(movie);
      showView("detailsView");

      isFavorite(movieId).then(function (fav) {
        const btn = $("#favoriteToggleBtn");

        if (fav) {
          btn.text("Remove from Favorites");
          btn.data("fav", true);
        } else {
          btn.text("Add to Favorites");
          btn.data("fav", false);
        }
      });
    }).fail(function () {
      console.log("Details failed");
      alert("Failed to load movie details");
    });
  });

  $(document).on("click", "#favoriteToggleBtn", function () {
    const movieId = $(this).data("id");
    const isFav = $(this).data("fav");
    const btn = $(this);

    addFavorite(movieId, !isFav).done(function () {
      if (isFav) {
        alert("Removed from Favorites");
        btn.text("Add to Favorites");
        btn.data("fav", false);
      } else {
        alert("Added to Favorites");
        btn.text("Remove from Favorites");
        btn.data("fav", true);
      }

      loadFavorites();
    }).fail(function () {
      alert("Failed to update favorite");
    });
  });

  $("#homeView .movie-grid").html("<p>Loading movies...</p>");

  getPopularMovies().done(function (data) {
    renderMovies(data.results, "#homeView .movie-grid");
  }).fail(function () {
    console.log("API failed");
    alert("Failed to load popular movies");
  });
});

function showView(viewId) {
  $("#homeView, #searchView, #favoritesView, #detailsView").hide();
  $("#" + viewId).show();
}

function loadFavorites() {
  $("#favoritesView .movie-grid").html("<p>Loading favorites...</p>");

  getFavoriteMovies().done(function (data) {
    renderMovies(data.results, "#favoritesView .movie-grid");
  }).fail(function () {
    console.log("Failed to load favorites");
    alert("Failed to load favorites");
  });
}
