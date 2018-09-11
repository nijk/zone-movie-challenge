import React, { Component } from 'react';

import { fetchData } from './api-tmdb';

class MovieListing extends Component {
  state = {
    movies: [],
    pages: 0,
  };

  componentDidMount() {
    fetchData('nowPlaying')
      .then(data => {
        const { results } = data;

        if (results && results.length) {
          this.setState((prevState) => ({
            movies: [ ...prevState.movies, ...results],
          }));
        }
      })
      .catch(console.warn);
  }

  render() {
    const { movies } = this.state;
    return movies.length ? movies.map(({ id, title }) => <Movie key={`movie-${id}`} title={title} />) : 'Loading';
  }
}

const Movie = ({ id, title }) => <h2>{title}</h2>;

export default MovieListing;
