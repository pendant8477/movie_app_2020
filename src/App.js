import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Movie from "./Movie";
import "./App.css";
import "./reset.css";

class App extends React.Component {
    state = {
        isLoading: true,
        movies: [],
    };
    getMovies = async () => {
        const {
            data: {
                data: { movies },
            },
        } = await axios.get(
            "https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating"
        );
        this.setState({ movies, isLoading: false });
        //console.log(movies.data.data.movies)
        console.log(movies);
        //비동기 처리 async await
    };
    componentDidMount() {
        this.getMovies();
    }
    render() {
        const { isLoading, movies } = this.state;
        return (
            <section className="container">
                {isLoading ? (
                    <div className="loader">
                        <span className="loader__text">Loading...</span>
                    </div>
                ) : (
                    <div className="movies">
                        {movies.map((movie) => (
                        <Movie
                            key={movie.id}
                            id={movie.id}
                            year={movie.year}
                            title={movie.title}
                            summary={movie.summary}
                            poster={movie.medium_cover_image}
                            genres={movie.genres}
                        />
                        ))}
                    </div>
                )}
            </section>
        );
    }
}

export default App;

//https://yts-proxy.now.sh/list_movies.json
