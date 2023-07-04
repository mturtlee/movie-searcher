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
          {movie.title || movie.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { movies, loading, totalPages, searchMovies } = useMovies(
    currentPage,
    searchQuery
  );
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearch = (input) => {
    searchMovies(input);
    setCurrentPage(1);
    setSearchQuery(input);
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
            {movies.map((movie) => (
              <MediaCard key={movie.id} movie={movie} />
            ))}
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
