import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { colours } from '../styles';
import { genresPropType } from './prop-types';

const borderBottom = css`border-bottom: 1px dashed ${colours.lightGrey};`;

const Wrapper = styled.div`
  background-color: ${colours.lightestGrey};
  margin: 0 0 2rem;
  padding: 1rem;
`;

const Title = styled.h3`
  border-bottom: 1px solid ${colours.lightGrey};
  margin: 0 0 1rem;
  padding: 0 0 1rem;
`;

const Fieldset = styled.fieldset`
  border: none;
  ${borderBottom}
  margin: 0 0 1rem;
  padding: 0 1rem 2rem;
`;

const Legend = styled.legend`
  font-weight: 600;
  margin: 0;
  padding: 0 0 2rem;
`;

const RatingLabel = styled.label`
  align-items: center;
  display: flex;
`;

const RatingLabelText = styled.span`
  margin-left: 1rem;
  padding: .5rem;
  width: 2rem;
`;

const GenresWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -1rem;
`;

const GenreLabel = styled.label`
  align-items: center;
  display: flex;
  flex: 0 0 25%;
  padding: 0 0 1rem;
`;

const GenreLabelText = styled.span`
  padding: 0 1rem 0 .5rem;
`;

// @todo: propTypes & defaultProps
const MovieFilters = ({ genres, onFilterGenre, onFilterRating, selectedGenres, selectedRating }) => (
  <Wrapper>
    <Title>Filters</Title>
    <Fieldset>
      <Legend>Rating</Legend>
      <RatingLabel>
        <input
          max="10"
          min="0"
          onChange={onFilterRating}
          type="range"
          step="0.5"
          value={selectedRating}
        />
        <RatingLabelText>{selectedRating}</RatingLabelText>
      </RatingLabel>
    </Fieldset>
    <Fieldset>
      <Legend>Genres</Legend>
      <GenresWrapper>
        {
          !!genres.length ? genres.map(genre => (
            <GenreLabel key={`genre-filter-${genre.id}`}>
              <input
                checked={selectedGenres.some(({ id }) => id === genre.id)}
                onChange={() => onFilterGenre(genre)}
                type="checkbox"
              />
              <GenreLabelText>{genre.name}</GenreLabelText>
            </GenreLabel>
          )) : 'No genres!'
        }
      </GenresWrapper>
    </Fieldset>
  </Wrapper>
);

MovieFilters.propTypes = {
  genres: genresPropType.isRequired,
  onFilterGenre: PropTypes.func.isRequired,
  onFilterRating: PropTypes.func.isRequired,
  selectedGenres: genresPropType.isRequired,
  selectedRating: PropTypes.number.isRequired,
};

MovieFilters.defaultProps = {
  genres: [],
  selectedGenres: [],
  selectedRating: [],
};

export default MovieFilters;
