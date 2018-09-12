import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colours } from '../styles';

import { genresPropType, moviePropType } from './prop-types';
import { buildImgURL } from './api-tmdb';

const imgWidth = 500;
const imgHeight = 750;

const ListItem = styled.li`
  box-shadow: 0 1px 5px ${colours.lightGrey};
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0 2rem 2rem 0;
  max-width: ${imgWidth}px;
  padding: 0;
`;

const TitleBar = styled.div`
  background-color: ${colours.darkGrey};
  color: ${colours.white};
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
`;

const Title = styled.h2`
  margin: 0 0 1rem;
  padding: 0;
`;

const Img = styled.img`
  height: ${imgHeight}px;
  max-width: 100%;
  width: ${imgWidth}px;
`;

const GenresList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
`;

const GenresListItem = styled.li`
  list-style: none;
  margin: 0 1rem 0 0;

  &:last-child {
    margin-right: 0;
  }
`;

const genreTagBgColour = colours.blue;
const GenreTag = styled.button`
  background-color: ${genreTagBgColour};
  border: none;
  border-radius: .5rem;
  color: ${colours.white};
  cursor: pointer;
  font-size: 1.4rem;
  margin: 0;
  padding: .5rem 1rem;
`;

// @todo: propTypes & defaultProps
const Movie = ({ genres, movie, onClickGenre }) => {
  const { poster_path, genre_ids, overview, title } = movie;
  const matchedGenres = genres.filter(({ id }) => genre_ids.some(genre_id => id === genre_id));
  const size = `w${imgWidth}`;
  const imgURL = buildImgURL(poster_path, size);

  return (
    <ListItem>
      <TitleBar>
        <Title>{title}</Title>
        {
          matchedGenres && (
            <GenresList>
              {
                matchedGenres.map(genre => (
                  <GenresListItem key={`genre-${genre.id}`}>
                    <GenreTag onClick={() => onClickGenre(genre)}>
                      {genre.name}
                    </GenreTag>
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

Movie.propTypes = {
  genres: genresPropType.isRequired,
  movie: moviePropType.isRequired,
  onClickGenre: PropTypes.func.isRequired,
};

Movie.defaultProps = {
  genres: [],
  movie: {},
};

export default Movie;
