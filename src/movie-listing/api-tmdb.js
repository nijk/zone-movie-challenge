const LANG = 'en-GB';
const KEY = 'f29b8b0f8ba12153ed41105fe7f67c66';
const URL = 'https://api.themoviedb.org';
const VERSION = '3';
const IMG_URL = 'https://image.tmdb.org/t/p';
const IMG_SIZE_DEFAULT = 'original';

const endpoints = {
  nowPlaying: '/movie/now_playing',
  genres: '/genre/movie/list',
};

export const buildImgURL = (path, size = IMG_SIZE_DEFAULT) => `${IMG_URL}/${size}/${path}`;

const buildURL = (endpointName = '', config = {}) => {
  if (!KEY || !URL || !VERSION) {
    console.error(`Cannot build URL, config is incorrect. 
    KEY: ${KEY}, URL: ${URL}, VERSION: ${VERSION}`);
    return '';
  }

  if (!Object.prototype.hasOwnProperty.call(endpoints, endpointName)) {
    console.error(`Endpoint: ${endpointName} does not exist`, endpoints);
    return '';
  }

  const { page = 1 } = config;
  const endpoint = endpoints[endpointName];
  const params = [
    [ 'api_key', KEY ],
    [ 'language', LANG ],
  ];

  if (page > 1) {
    params.push([ 'page', page ]);
  }

  const paramString = params.map(param => `${param[0]}=${param[1]}`).join('&');

  return `${URL}/${VERSION}${endpoint}?${paramString}`;
};

export async function fetchData(endpointName, config = {}) {
  const { page } = config;
  const URL = buildURL(endpointName, { page });

  let response = await fetch(URL);
  const { status, statusText, url } = response;

  if (status === 200) {
    return await response.json();
  }

  const message = `
  ${status} for ${url}.
  Reason: ${statusText}
  `;
  throw new Error(message);
}

export default {
  endpoints
}
