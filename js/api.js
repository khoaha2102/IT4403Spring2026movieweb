const API_KEY = "8d6d0afa1e5173177b90d97661c359fe";
const BASE_URL = "https://api.themoviedb.org/3";

function getPopularMovies() {
  return $.ajax({
    url: `${BASE_URL}/movie/popular`,
    method: "GET",
    data: {
      api_key: API_KEY
    }
  });
}

function searchMovies(query) {
  return $.ajax({
    url: `${BASE_URL}/search/movie`,
    method: "GET",
    data: {
      api_key: API_KEY,
      query: query
    }
  });
}
