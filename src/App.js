import Header from "./components/Header";

import MovieList from "./components/Movie-list";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MovieList />,
    },
    {
      path: "movie/:id",
      element: <MovieDetails />,
    },
  ]);
  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
      {/* <MovieList /> */}
    </div>
  );
}

export default App;
