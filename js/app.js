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

    // 🔥 NEW: get trailer
    getMovieVideos(movieId).done(function (videoData) {

      let trailer = videoData.results.find(function (v) {
        return v.type === "Trailer" && v.site === "YouTube";
      });

      const trailerKey = trailer ? trailer.key : null;

      // 🔥 pass trailer to UI
      renderMovieDetails(movie, trailerKey);
      $("#movieModal").fadeIn();

      // keep your favorites logic EXACTLY the same
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
      // if trailer fails, still show movie
      renderMovieDetails(movie, null);
      $("#movieModal").fadeIn();
    });

  }).fail(function (xhr) {
    console.log("Details failed for movieId:", movieId, xhr.responseText);
    handleApiError(xhr);
  });
}
