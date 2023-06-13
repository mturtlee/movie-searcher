import Header from "./components/Header";
import useMovies from "./API";

function App() {
  useMovies();

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
