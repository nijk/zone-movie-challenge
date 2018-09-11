const KEY = 'f29b8b0f8ba12153ed41105fe7f67c66';

const URL = 'https://api.themoviedb.org';

const VERSION = '3';

const endpoints = {
  nowPlaying: '/movie/now_playing',
  genres: '/genre/movie/list',
};

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

  const { page } = config;
  const endpoint = endpoints[endpointName];
  const params = [[ 'api_key', KEY ]];

  if (page > 1) {
    params.push([ 'page', page ]);
  }

  const paramString = params.map(param => `${param[0]}=${param[1]}`).join('&');

  return `${URL}/${VERSION}${endpoint}?${paramString}`;
};

export const fetchData = (endpointName, config) => {
  const { page } = config;
  const URL = buildURL(endpointName, { page });

  return fetch(URL);
};

export default {
  endpoints
}
