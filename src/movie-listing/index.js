import React, { Component } from 'react';

import { buildImgURL, fetchData } from './api-tmdb';

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

    return movies.map(movie => <Movie key={`movie-${movie.id}`} genres={genres} movie={movie} />);
  }
}

const Movie = ({ genres, movie }) => {
  const { genre_ids, backdrop_path, title } = movie;
  const matchedGenres = genres.filter(({ id }) => genre_ids.some(genre_id => id === genre_id));
  const size = 'w1280';
  const imgURL = buildImgURL(backdrop_path, size);

  return (
    <div>
      <h2>{title}</h2>
      { matchedGenres.map(({ name }) => name).join(', ') }
      <img alt="" src={imgURL} />
    </div>
  );
};

export default MovieListing;
