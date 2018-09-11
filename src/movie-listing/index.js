import React, { Component } from 'react';

import { fetchData } from './api-tmdb';

class MovieListing extends Component {
  state = {
    movies: [],
    pages: 0,
  };

  componentDidMount() {
    const fetchNowPlaying = (page = 1) => fetchData('nowPlaying', { page })
      .then(response => {
        response.json().then(data => {
          const { page: pg, results, total_pages } = data;

          console.log('MovieListing->didMount', data);

          if (results.length) {
            this.setState((prevState) => ({
              movies: [ ...prevState.movies, ...results],
            }), () => {
              if (pg < 40) {
                console.log(`About to fetch page ${pg + 1} of ${total_pages}`);
                fetchNowPlaying(pg + 1);
              }
            });
          }
        });
      });

    fetchNowPlaying();
  }

  render() {
    const { movies } = this.state;
    return movies.length ? movies.map(({ id, title }) => <Movie key={`movie-${id}`} title={title} />) : 'Loading';
  }
}

const Movie = ({ id, title }) => <h2>{title}</h2>;

export default MovieListing;
