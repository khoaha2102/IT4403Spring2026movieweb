$(document).ready(function () {

  // BUTTONS
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

  getPopularMovies().done(function (data) {
    console.log("Movies:", data.results);
    renderMovies(data.results);
  }).fail(function () {
    console.log("API failed");
  });

});

function showView(viewId) {
  $("#homeView, #searchView, #favoritesView, #detailsView").hide();
  $("#" + viewId).show();
}
