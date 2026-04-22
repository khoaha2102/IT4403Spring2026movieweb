function performSearch() {
  const query = $("#searchInput").val().trim();

  if (!query) {
    showMessage("Please enter a movie title.", "error");
    return;
  }

  $("#searchView .movie-grid").html("<p>Loading search results...</p>");

  searchMovies(query).done(function (data) {
    const validResults = data.results.filter(function (movie) {
      return movie && movie.id && movie.title;
    });

    renderMovies(validResults, "#searchView .movie-grid");
    showView("searchView");
  }).fail(function (xhr) {
    console.log("Search failed");
    handleApiError(xhr);
  });
}

$(document).ready(function () {
  showView("homeView");

  getGenres().done(function (data) {
    renderGenres(data.genres);
  }).fail(function (xhr) {
    console.log("Failed to load genres");
    handleApiError(xhr);
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
    closeMovieModal();
  });

  $(window).click(function (event) {
    if ($(event.target).is("#movieModal")) {
      closeMovieModal();
    }
  });

  $("#searchSubmit").off("click").on("click", debounce(performSearch, 500));

  $("#searchInput").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault();
      performSearch();
    }
  });

  $("#genreSelect").change(function () {
    const genreId = $(this).val();

    $("#homeView .movie-grid").html("<p>Loading movies...</p>");

    if (!genreId) {
      getPopularMovies().done(function (data) {
        renderMovies(data.results, "#homeView .movie-grid");
        renderTopPopular(data.results);
      }).fail(function (xhr) {
        handleApiError(xhr);
      });
      return;
    }

    getMoviesByGenre(genreId).done(function (data) {
      renderMovies(data.results, "#homeView .movie-grid");
      showView("homeView");
    }).fail(function (xhr) {
      handleApiError(xhr);
    });
  });

  $(document).on("click", ".movie-card", function () {
    openMovieDetails($(this).data("id"));
  });

  $(document).on("click", ".top-item", function () {
    openMovieDetails($(this).data("id"));
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
    }).fail(function (xhr) {
      handleApiError(xhr);
    });
  });

  $("#homeView .movie-grid").html("<p>Loading movies...</p>");

  getPopularMovies().done(function (data) {
    renderMovies(data.results, "#homeView .movie-grid");
    renderTopPopular(data.results);
  }).fail(function (xhr) {
    console.log("API failed");
    handleApiError(xhr);
  });
});

function openMovieDetails(movieId) {
  if (!movieId) {
    showMessage("Movie details are unavailable for this item.", "error");
    return;
  }

  getMovieDetails(movieId).done(function (movie) {
    if (!movie || !movie.id) {
      showMessage("Movie details are unavailable for this item.", "error");
      return;
    }

    getMovieVideos(movieId).done(function (videoData) {
      let trailer = videoData.results.find(function (v) {
        return (v.type === "Trailer" || v.type === "Teaser") && v.site === "YouTube";
      });

      const trailerKey = trailer ? trailer.key : null;

      renderMovieDetails(movie, trailerKey);
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
      }).fail(function () {
        const btn = $("#favoriteToggleBtn");
        btn.text("Add to Favorites");
        btn.data("fav", false);
      });

    }).fail(function () {
      renderMovieDetails(movie, null);
      $("#movieModal").fadeIn();
    });

  }).fail(function (xhr) {
    console.log("Details failed for movieId:", movieId, xhr.responseText);
    handleApiError(xhr);
  });
}

function closeMovieModal() {
  $("#movieModal").fadeOut(function () {
    $("#movieModal .movie-details").html("");
  });
}

function showView(viewId) {
  $("#homeView, #searchView, #favoritesView").hide();
  $("#" + viewId).show();
}

function loadFavorites() {
  $("#favoritesView .movie-grid").html("<p>Loading favorites...</p>");

  getFavoriteMovies().done(function (data) {
    renderMovies(data.results, "#favoritesView .movie-grid");
  }).fail(function (xhr) {
    console.log("Failed to load favorites");
    handleApiError(xhr);
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

function debounce(fn, delay = 500) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function handleApiError(xhr) {
  if (xhr && xhr.status === 429) {
    showMessage("Too many requests. Please wait a moment and try again.", "error");
  } else if (xhr && xhr.status === 401) {
    showMessage("Authentication failed. Check your API/session settings.", "error");
  } else if (xhr && xhr.status === 404) {
    showMessage("Requested item could not be found.", "error");
  } else {
    showMessage("Something went wrong. Please try again.", "error");
  }
}
