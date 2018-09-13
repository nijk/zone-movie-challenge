import React, { Component } from 'react';
import styled from 'styled-components';

import { sortObjectByKey } from '../utils';

import MovieFilters from './MovieFilters';
import Movie from './Movie';
import { fetchData } from './api-tmdb';

const Loading = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 2rem;
  padding: 0;
`;

class MovieListing extends Component {
  state = {
    selectedGenres: [], // collection of genres selected in the filter
    selectedRating: 3.0,
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

    const isFiltered = this.state.selectedGenres.some(({ id }) => id === genre.id);

    this.setState(({ selectedGenres }) => ({
      selectedGenres: isFiltered ?
        selectedGenres.filter(({ id }) => id !== genre.id) : [ ...selectedGenres, genre ],
    }));
  };

  filterByRating = (e) => this.setState({ selectedRating: e.target.value });

  /**
   * Returns a subset of movies that match the genre filters
   * @param movies {Array<Object>}
   * @returns {Array<Object>}
   */
  getMoviesFilteredByGenre = (movies = []) => {
    const { selectedGenres } = this.state;

    if (!selectedGenres.length) {
      return movies;
    }

    return movies.filter(({ genre_ids }) =>
      selectedGenres.every(({ id }) => genre_ids.some(genreId => genreId === id)));
  };

  /**
   * Returns a subset of movies that match the minimum rating
   * @param movies {Array<Object>}
   * @returns {Array<Object>}
   */
  getMoviesFilteredByRating = (movies = []) => {
    const { selectedRating } = this.state;

    if (!selectedRating) {
      return movies;
    }

    return movies.filter(({ vote_average }) => vote_average >= selectedRating);
  };

  /**
   * Filters all movies, returning only the movies which should be rendered
   * @returns {Array<Object>}
   */
  getMovies = () => {
    const movieList = this.getMoviesFilteredByGenre(this.state.movies);

    return this
      .getMoviesFilteredByRating(movieList)
      // note: This sort is effectively unnecessary as the API already returns the results ordered by popularity,
      // but I've explicitly added it to ensure that the requirements are met should the API change in the future
      .sort(sortObjectByKey('popularity', { type: 'number', order: 'desc' }));
  };

  /**
   * Filters and sorts all genres, returning only the genres which relate to rendered movies
   * @returns {Array<Object>}
   */
  getGenres = (movies) => {
    const { genres } = this.state;
    const allGenres = movies
      .reduce((acc, { genre_ids }) => [ ...acc, ...genre_ids ], [])
      .map(genreId => genres.find(({ id }) => genreId === id))
      .sort(sortObjectByKey('name', { type: 'string', order: 'desc' }));

    return [ ...new Set(allGenres) ];
  };

  render() {
    const { selectedGenres, selectedRating, genres, movies } = this.state;

    if (!movies.length || !genres.length) {
      return (
        <Loading>
          <h3>Loading...</h3>
        </Loading>
      );
    }

    const movieList = this.getMovies();
    const genreList = this.getGenres(movieList);

    return (
      <div>
        <MovieFilters
          genres={genreList}
          onFilterGenre={this.filterByGenre}
          onFilterRating={this.filterByRating}
          selectedGenres={selectedGenres}
          selectedRating={selectedRating}
        />
        <List>
          {
            movieList.length ? movieList.map(movie => (
              <Movie
                genres={genres}
                key={`movie-${movie.id}`}
                movie={movie}
                onClickGenre={this.filterByGenre}
              />
            )) : 'No results!'
          }
        </List>
      </div>
    );
  }
}

export default MovieListing;
