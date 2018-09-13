// SuT
import { buildImgURL, fetchData } from './api-tmdb';

describe('buildImgURL', () => {
  it('returns a string ending with the path', () => {
    expect(buildImgURL('foo')).toEqual(expect.stringMatching(/\/foo$/));
  });

  it('returns a string including the size when provided', () => {
    expect(buildImgURL('foo', 'bar')).toEqual(expect.stringMatching(/\/bar\/foo$/));
  });
});

describe('fetchData', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('gets some data', () => {
    const response = { results: [12345] };
    fetch.mockResponseOnce(JSON.stringify(response));

    fetchData('nowPlaying').then(data => expect(data).toEqual(response));
  });

  it('handles the api key', () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    fetchData('nowPlaying');

    expect(fetch.mock.calls[0]).toEqual(expect.stringMatching(/api_key=[^&]+/));
  });

  it('handles the page config', () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    fetchData('nowPlaying', { page: 2 });

    expect(fetch.mock.calls[0]).toEqual(expect.stringMatching(/page=2$/));
  });

  it('throws an error', () => {
    fetch.mockResponseOnce('', { status: 400 });

    fetchData('nowPlaying').catch(error => expect(error.message).toEqual(expect.stringContaining('400')));
  });
});
