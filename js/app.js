$(document).ready(function () {
  showView("homeView");

  getGenres().done(function (data) {
    renderGenres(data.genres);
  }).fail(function () {
    console.log("Failed to load genres");
    showMessage("Failed to load genres ⚠", "error");
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

  $("#closeModalBtn").click(function () {
    $("#movieModal").fadeOut();
  });

  $(window).click(function (event) {
    if ($(event.target).is("#movieModal")) {
      $("#movieModal").fadeOut();
    }
  });

  $("#searchSubmit").click(function () {
    const query = $("#searchInput").val().trim();

    if (!query) {
      showMessage("Please enter a movie title.", "error");
      return;
    }

    $("#searchView .movie-grid").html("<p>Loading search results...</p>");

    searchMovies(query).done(function (data) {
      renderMovies(data.results, "#searchView .movie-grid");
      showView("searchView");
    }).fail(function () {
      console.log("Search failed");
      showMessage("Search failed ⚠", "error");
    });
  });

  $("#genreSelect").change(function () {
    const genreId = $(this).val();

    $("#homeView .movie-grid").html("<p>Loading movies...</p>");

    if (!genreId) {
      getPopularMovies().done(function (data) {
        renderMovies(data.results, "#homeView .movie-grid");
        renderTopPopular(data.results);
      }).fail(function () {
        showMessage("Failed to load popular movies ⚠", "error");
      });
      return;
    }

    getMoviesByGenre(genreId).done(function (data) {
      renderMovies(data.results, "#homeView .movie-grid");
      showView("homeView");
    }).fail(function () {
      showMessage("Failed to load movies by genre ⚠", "error");
    });
  });

  $(document).on("click", ".movie-card", function () {
    const movieId = $(this).data("id");

    getMovieDetails(movieId).done(function (movie) {
      renderMovieDetails(movie);
      $("#movieModal").fadeIn();

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
      showMessage("Failed to load movie details ⚠", "error");
    });
  });

  $(document).on("click", "#favoriteToggleBtn", function () {
    const movieId = $(this).data("id");
    const isFav = $(this).data("fav");
    const btn = $(this);

    addFavorite(movieId, !isFav).done(function () {
      if (isFav) {
        showMessage("Removed from Favorites ❌", "success");
        btn.text("Add to Favorites");
        btn.data("fav", false);
      } else {
        showMessage("Added to Favorites ✔", "success");
        btn.text("Remove from Favorites");
        btn.data("fav", true);
      }

      loadFavorites();
    }).fail(function () {
      showMessage("Failed to update favorite ⚠", "error");
    });
  });

  $("#homeView .movie-grid").html("<p>Loading movies...</p>");

  getPopularMovies().done(function (data) {
    renderMovies(data.results, "#homeView .movie-grid");
    renderTopPopular(data.results);
  }).fail(function () {
    console.log("API failed");
    showMessage("Failed to load popular movies ⚠", "error");
  });
});

function showView(viewId) {
  $("#homeView, #searchView, #favoritesView").hide();
  $("#" + viewId).show();
}

function loadFavorites() {
  $("#favoritesView .movie-grid").html("<p>Loading favorites...</p>");

  getFavoriteMovies().done(function (data) {
    renderMovies(data.results, "#favoritesView .movie-grid");
  }).fail(function () {
    console.log("Failed to load favorites");
    showMessage("Failed to load favorites ⚠", "error");
  });
}

function showMessage(text, type = "info") {
  const box = $("#statusMessage");

  box.removeClass("success error");

  if (type === "success") {
    box.addClass("success");
  } else if (type === "error") {
    box.addClass("error");
  }

  box.text(text).fadeIn();

  setTimeout(() => {
    box.fadeOut();
  }, 2000);
}
