import React from 'react';
import styled, { css } from 'styled-components';

import { colours } from '../styles';

const borderBottom = css`border-bottom: 1px dashed ${colours.lightGrey};`;

const Wrapper = styled.div`
  background-color: ${colours.lightestGrey};
  margin: 0 0 2rem;
  padding: 1rem;
`;

const Title = styled.h3`
  ${borderBottom}
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

const GenresWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -1rem;
`;

const Label = styled.label`
  align-items: center;
  display: flex;
  flex: 0 0 25%;
  padding: 0 0 1rem;
`;

const Input = styled.input`
`;

const LabelText = styled.span`
  padding: 0 1rem 0 .5rem;
`;

const MovieFilters = ({ genres, onFilterGenre, onFilterRating, selectedGenres }) => {

  return (
    <Wrapper>
      <Title>Filters</Title>
      <Fieldset>
        <Legend>Genres</Legend>
        <GenresWrapper>
          { genres.map(genre => (
            <Label key={`genre-filter-${genre.id}`}>
              <Input
                checked={selectedGenres.some(({ id }) => id === genre.id)}
                onChange={() => onFilterGenre(genre)}
                type="checkbox"
              />
              <LabelText>{genre.name}</LabelText>
            </Label>
          ))}
        </GenresWrapper>
      </Fieldset>
      <Fieldset>
        <Legend>Rating</Legend>
      </Fieldset>
    </Wrapper>
  );
};

export default MovieFilters;
