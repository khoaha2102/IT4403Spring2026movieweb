const API_KEY = "8d6d0afa1e5173177b90d97661c359fe";
const BASE_URL = "https://api.themoviedb.org/3";
const SESSION_ID = "20e597d97d11913d5b0748f0e8dc9dd9b03a9b56";
const ACCOUNT_ID = "23034059";
// Get popular movies
function getPopularMovies() {
  return $.ajax({
    url: `${BASE_URL}/movie/popular`,
    method: "GET",
    data: {
      api_key: API_KEY
    }
  });
}

// Search movies
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

function getFavoriteMovies() {
  return $.ajax({
    url: `${BASE_URL}/account/${ACCOUNT_ID}/favorite/movies`,
    method: "GET",
    data: {
      api_key: API_KEY,
      session_id: SESSION_ID
    }
  });
}

function addFavorite(movieId, favorite = true) {
  return $.ajax({
    url: `${BASE_URL}/account/${ACCOUNT_ID}/favorite`,
    method: "POST",
    data: {
      api_key: API_KEY,
      session_id: SESSION_ID
    },
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      media_type: "movie",
      media_id: movieId,
      favorite: favorite
    })
  });
}

function addFavorite(movieId, favorite = true) {
  return $.ajax({
    url: `${BASE_URL}/account/${ACCOUNT_ID}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`,
    method: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      media_type: "movie",
      media_id: movieId,
      favorite: favorite
    })
  });
}
