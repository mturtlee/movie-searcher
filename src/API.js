import { queries } from "@testing-library/react";
import { useState, useEffect } from "react";

function fetchWithAuthorization(url, options = {}) {
  const baseUrl = "https://api.themoviedb.org/";

  const authorizationToken =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDk1ZTA2ZGIzNGEyODA0Mzk3YTMyYTczZGY1N2RiMCIsInN1YiI6IjY0NzllMTg2MGUyOWEyMDBiZjFlMzE5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1ByVfuwJvJoMkzuPTphVplak-0iNNh42t9EYKbyyLho";

  const authorizationHeaderName = "Authorization";

  const fullUrl = `${baseUrl}${url}`;

  const fetchOptions = { ...options };

  fetchOptions.headers = fetchOptions.headers || {};

  fetchOptions.accept = {};

  fetchOptions.headers[authorizationHeaderName] = authorizationToken;

  return fetch(fullUrl, fetchOptions);
}

const useMovies = (currentPage, query) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const searchMovies = (query) => {
    fetchWithAuthorization(
      `3/search/movie?query=${query}&include_adult=false&language=en-US&page=${currentPage}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const apiRequest = query
      ? `3/search/movie?query=${query}&include_adult=false&language=en-US&page=${currentPage}`
      : `3/tv/popular?language=en-US&page=${currentPage}`;

    fetchWithAuthorization(apiRequest, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch((err) => console.error(err));
  }, [currentPage, query]);

  return {
    movies,
    loading,
    totalPages,
    searchMovies,
  };
};

export default useMovies;
