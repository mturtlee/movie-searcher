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
const useMovies = (currentPage) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuthorization(`3/tv/popular?language=en-US&page=${currentPage}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setMovies(data);
      })
      .catch((err) => console.error(err));
  }, [currentPage]);
  return {
    movies,
    loading,
    totalPages: movies.total_pages,
  };
};

export default useMovies;
