import React, { Component } from 'react';
import styled from 'styled-components';

import Movie from './Movie';
import { fetchData } from './api-tmdb';

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

class MovieListing extends Component {
  state = {
    filteredGenres: [], // collection of genres selected in the filter
    filteredMinVote: 3.0,
    genres: [], // all genres
    movies: [], // all movies
  };

  componentDidMount() {
    fetchData('genres')
      .then(data => {
        const { genres } = data;

        if (genres && genres.length) {
          this.setState({ genres });
        }
      })
      .catch(console.warn);

    fetchData('nowPlaying')
      .then(data => {
        const { results } = data;

        if (results && results.length) {
          this.setState({ movies: results });
        }
      })
      .catch(console.warn);
  }

  /**
   * Toggles the provided genre in the filter state
   * @param genre
   */
  filterByGenre = (genre) => {
    if (!genre) {
      return;
    }

    const isFiltered = this.state.filteredGenres.some(({ id }) => id === genre.id);

    this.setState(({ filteredGenres }) => ({
      filteredGenres: isFiltered ?
        filteredGenres.filter(({ id }) => id !== genre.id) : [ ...filteredGenres, genre ],
    }));
  };

  /**
   * Returns a subset of movies that match the genre filters
   * @param movies
   * @returns {Array<Object>}
   */
  getMoviesFilteredByGenre = (movies = []) => {
    const { filteredGenres } = this.state;

    if (!filteredGenres.length) {
      return movies;
    }

    return movies.filter(({ genre_ids }) =>
      filteredGenres.every(({ id }) => genre_ids.some(genreId => genreId === id)));
  };

  /**
   * Returns a subset of movies that match the genre filters
   * @param movies
   * @returns {Array<Object>}
   */
  getMoviesFilteredByVoteAverage = (movies = []) => {
    const { filteredMinVote } = this.state;

    if (!filteredMinVote) {
      return movies;
    }

    return movies.filter(({ vote_average }) => vote_average >= filteredMinVote);
  };

  getMovies = () => {
    const { movies } = this.state;
    const movieList = this.getMoviesFilteredByGenre(movies);

    return this.getMoviesFilteredByVoteAverage(movieList);
  };

  render() {
    const { filteredGenres, genres, movies } = this.state;

    if (!movies.length || !genres.length) {
      return 'Loading';
    }

    return (
      <div>
        <div>
          Filters: { !!filteredGenres.length && filteredGenres.map(({ name }) => name).join(', ') }
        </div>
        <List>
          {
            this.getMovies().map(movie => (
              <Movie
                genres={genres}
                key={`movie-${movie.id}`}
                movie={movie}
                onClickGenre={this.filterByGenre}
              />
            ))
          }
        </List>
      </div>
    );
  }
}

export default MovieListing;
