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
    genres: [],
    movies: [],
  };

  componentDidMount() {
    fetchData('genres')
      .then(data => {
        const { genres } = data;

        if (genres && genres.length) {
          this.setState({
            genres,
          });
        }
      })
      .catch(console.warn);

    fetchData('nowPlaying')
      .then(data => {
        const { results } = data;

        if (results && results.length) {

          // @todo: comment on API paging and how that might potentially be handled - API v4 maybe?
          this.setState({
            movies: results,
          });
        }
      })
      .catch(console.warn);
  }

  render() {
    const { genres, movies } = this.state;

    if (!movies.length) {
      return 'Loading';
    }

    return (
      <List>
        { movies.map(movie => <Movie key={`movie-${movie.id}`} genres={genres} movie={movie} />) }
      </List>
    );
  }
}

export default MovieListing;
