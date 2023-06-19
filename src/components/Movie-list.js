import { Card, CardMedia, CardContent, Typography } from "@mui/material/";

import useMovies from "../API";

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
          {movie.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const MovieList = () => {
  const { movies, loading } = useMovies();
  console.log(movies);

  return (
    <div className="movie-grid">
      {loading ? (
        <h1>loading</h1>
      ) : (
        <>
          {movies.results.map((movie) => (
            <MediaCard key={movie.id} movie={movie} />
          ))}
        </>
      )}
    </div>
  );
};

export default MovieList;
