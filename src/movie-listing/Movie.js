import React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';

import { colours } from '../styles';

import { buildImgURL } from './api-tmdb';

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0 0 2rem;
  padding: 0;
`;

const TitleBar = styled.div`
  align-items: center;
  background-color: ${colours.darkGrey};
  color: ${colours.white};
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  padding: 0;
`;

const Img = styled.img`
  width: 100%;
  max-width: 1280px;
`;

const GenresList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
`;

const GenresListItem = styled.li`
  background-color: ${transparentize(0.25, colours.white)};
  border-radius: .5rem;
  color: ${colours.darkGrey};
  list-style: none;
  margin: 0 1rem 0 0;
  padding: .5rem 1rem;

  &:last-child {
    margin-right: 0;
  }
`;

// @todo: propTypes & defaultProps
const Movie = ({ genres, movie, onClickGenre }) => {
  const { backdrop_path, genre_ids, overview, title } = movie;
  const matchedGenres = genres.filter(({ id }) => genre_ids.some(genre_id => id === genre_id));
  const size = 'w1280';
  const imgURL = buildImgURL(backdrop_path, size);

  return (
    <ListItem>
      <TitleBar>
        <Title>{title}</Title>
        {
          matchedGenres && (
            <GenresList>
              {
                matchedGenres.map(genre => (
                  <GenresListItem key={`genre-${genre.id}`} onClick={() => onClickGenre(genre)}>
                    {genre.name}
                  </GenresListItem>
                ))
              }
            </GenresList>
          )
        }
      </TitleBar>
      <Img alt={overview} src={imgURL} />
    </ListItem>
  );
};

export default Movie;
