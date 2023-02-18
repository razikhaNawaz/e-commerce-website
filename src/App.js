import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [Movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://delete-post-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong...Retrying");
      }

      const data = await response.json();
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const deleteMovieHandler = useCallback(async (id) => {
    // https://react-http-cba4b-default-rtdb.firebaseio.com/movies/-NHB7l3SSaVMg17wOC2S
  
      const response=await fetch(
      `https://delete-post-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json/${id}`,
      {
        method: 'DELETE'
      }
      
    );
    //setMovies(Movies.filter((movie) => movie.id !== id));
    console.log(response);
      
    
    //setMovies(movies.filter(movie)=>movie.id !===)
  },[]);

  let content = <p>No movies found</p>;
  if (error) {
    content = <p>{error}</p>;
  }
  if (Movies.length > 0) {
    content = <MoviesList movies={Movies} onDeleteMovie={deleteMovieHandler.bind(null,id)} />;
    console.log(Movies);
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://delete-post-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Context-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;