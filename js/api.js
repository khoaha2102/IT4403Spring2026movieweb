const API_KEY = "8d6d0afa1e5173177b90d97661c359fe";
const BASE_URL = "https://api.themoviedb.org/3";
const SESSION_ID = "20e597d97d11913d5b0748f0e8dc9dd9b03a9b56";
const ACCOUNT_ID = "23034059";

const cache = {};
let favoritesCache = null;

function getCacheKey(url, params) {
  return url + "?" + Object.keys(params).sort().map(k => `${k}=${params[k]}`).join("&");
}

function getPopularMovies() {
  const url = `${BASE_URL}/movie/popular`;
  const params = { api_key: API_KEY };
  const key = getCacheKey(url, params);

  if (cache[key]) {
    return $.Deferred().resolve(cache[key]).promise();
  }

  return $.ajax({
    url,
    method: "GET",
    data: params
  }).done(function (data) {
    cache[key] = data;
  });
}

function searchMovies(query) {
  const url = `${BASE_URL}/search/movie`;
  const params = { api_key: API_KEY, query: query };
  const key = getCacheKey(url, params);

  if (cache[key]) {
    return $.Deferred().resolve(cache[key]).promise();
  }

  return $.ajax({
    url,
    method: "GET",
    data: params
  }).done(function (data) {
    cache[key] = data;
  });
}

function getMovieDetails(id) {
  const url = `${BASE_URL}/movie/${id}`;
  const params = { api_key: API_KEY };
  const key = getCacheKey(url, params);

  if (cache[key]) {
    return $.Deferred().resolve(cache[key]).promise();
  }

  return $.ajax({
    url,
    method: "GET",
    data: params
  }).done(function (data) {
    cache[key] = data;
  });
}

function getFavoriteMovies() {
  const url = `${BASE_URL}/account/${ACCOUNT_ID}/favorite/movies`;
  const params = {
    api_key: API_KEY,
    session_id: SESSION_ID
  };

  if (favoritesCache) {
    return $.Deferred().resolve(favoritesCache).promise();
  }

  return $.ajax({
    url,
    method: "GET",
    data: params
  }).done(function (data) {
    favoritesCache = data;
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
  }).done(function () {
    favoritesCache = null;
  });
}

function isFavorite(movieId) {
  if (favoritesCache) {
    return $.Deferred().resolve(
      favoritesCache.results.some(movie => movie.id === movieId)
    ).promise();
  }

  return getFavoriteMovies().then(function (data) {
    return data.results.some(movie => movie.id === movieId);
  });
}

function getGenres() {
  const url = `${BASE_URL}/genre/movie/list`;
  const params = { api_key: API_KEY };
  const key = getCacheKey(url, params);

  if (cache[key]) {
    return $.Deferred().resolve(cache[key]).promise();
  }

  return $.ajax({
    url,
    method: "GET",
    data: params
  }).done(function (data) {
    cache[key] = data;
  });
}

function getMoviesByGenre(genreId) {
  const url = `${BASE_URL}/discover/movie`;
  const params = {
    api_key: API_KEY,
    with_genres: genreId
  };
  const key = getCacheKey(url, params);

  if (cache[key]) {
    return $.Deferred().resolve(cache[key]).promise();
  }

  return $.ajax({
    url,
    method: "GET",
    data: params
  }).done(function (data) {
    cache[key] = data;
  });
}

function getMovieVideos(id) {
  const url = `${BASE_URL}/movie/${id}/videos`;
  const params = { api_key: API_KEY };
  const key = getCacheKey(url, params);

  if (cache[key]) {
    return $.Deferred().resolve(cache[key]).promise();
  }

  return $.ajax({
    url,
    method: "GET",
    data: params
  }).done(function (data) {
    cache[key] = data;
  });
}
