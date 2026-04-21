$(document).ready(function () {
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
});

function showView(viewId) {
  $("#homeView, #searchView, #favoritesView, #detailsView").hide();
  $("#" + viewId).show();
}
