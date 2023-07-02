import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Pagination,
} from "@mui/material/";

import useMovies from "../API";
import { useState } from "react";
import SearchBar from "./SearchBar";

const MediaCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <Card sx={{ maxWidth: 345 }} className="Card-style">
      <CardMedia
        component="img"
        sx={{ height: 540 }}
        title={movie.name}
        src={posterUrl}
        alt="pic"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title} {movie.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState(null);

  const { movies, loading, totalPages } = useMovies(currentPage);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const handleSearch = (input) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDk1ZTA2ZGIzNGEyODA0Mzk3YTMyYTczZGY1N2RiMCIsInN1YiI6IjY0NzllMTg2MGUyOWEyMDBiZjFlMzE5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1ByVfuwJvJoMkzuPTphVplak-0iNNh42t9EYKbyyLho",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="movie-list-container">
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="movie-grid">
        {loading ? (
          <h1>loading</h1>
        ) : (
          <>
            {searchResults ? (
              <>
                {searchResults.map((movie) => (
                  <MediaCard key={movie.id} movie={movie} />
                ))}
              </>
            ) : (
              <>
                {movies.results.map((movie) => (
                  <MediaCard key={movie.id} movie={movie} />
                ))}
              </>
            )}
          </>
        )}
      </div>

      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
            size="large"
          />
        </Stack>
      </div>
    </div>
  );
};

export default MovieList;
