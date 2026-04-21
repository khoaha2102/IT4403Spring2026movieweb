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

  // 🔥 TEST API HERE
  getPopularMovies().done(function (data) {
    console.log("Movies:", data.results);
  }).fail(function () {
    console.log("API failed");
  });

});

function showView(viewId) {
  $("#homeView, #searchView, #favoritesView, #detailsView").hide();
  $("#" + viewId).show();
}
