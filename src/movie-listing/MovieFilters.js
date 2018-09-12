import React from 'react';
import styled from 'styled-components';




const MovieFilters = ({ genres, onFilterGenre, onFilterRating, selectedGenres }) => {

  return (
    <div>
      <h3>Filters</h3>

      { genres.map(genre => (
        <label key={`genre-filter-${genre.id}`}>
          <input
            checked={selectedGenres.some(({ id }) => id === genre.id)}
            onChange={() => onFilterGenre(genre)}
            type="checkbox"
          />
          <span>{genre.name}</span>
        </label>
      ))}
    </div>
  );
};

export default MovieFilters;
