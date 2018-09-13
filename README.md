# Zone Movie Challenge

Provides a solution to [this challenge](https://github.com/zone/frontend/blob/master/challenges/movie-listings.md).

## Install & run

1. `yarn install`
2. `yarn start`

## Run tests

`yarn test`

### Notes

I've manually added `displayName` to the StyledComponents that are relevant to unit tests. It avoids ejecting the Create React App config and using `babel-plugin-styled-components`, which in a real world scenario would be a better choice.

#### Assumptions
I've made some assumptions about what is required for this challenge but in real project I would discuss these things with other team members to get the requirements 100% correct.

1. The TMDb API v3 returns paged results on the [Movies Now Playing endpoint](https://developers.themoviedb.org/3/movies/get-now-playing). I initially looked into requesting all pages in a sequential loop after getting the `page=1` response back and rendering the list, but aside from the obvious perf issues of making 51 sequential XHR requests I hit an issue with there being a limit of 40 requests on the API. I then tried the v4 API and found that the data structure didn't quite look right for the project requirements. I then considered batching the requests into at least two groups, but it occurred to me that there could be a bunch of potential issues with the order of events and the data fetching if the user was able to access the filters prior to the fetching being completed. It was at this point I realised that I was probably over-thinking it and realised that just grabbing the first page of movies was probably sufficient! I re-read the challenge and noticed that it said this:

    > The input API's should only be called once.

    So I've stopped at page 1 of the results.

2. Given that the genre names should be displayed for each movie, I thought it might make sense to have them behave as filters. This is supplementary functionality that could removed without affecting the main filters.

3. I've kept things as lightweight as possible rather than to provide a production quality app, for example I've left out considerations such as:
    1. Routing
    2. State management
    3. API abstractions & error handling
    4. Offline support
    5. App furniture (app icons, manifest mostly as per Create React App defaults)
    6. i18n & RTL styling
    7. SVG inlining/sprites
    8. UI stuff including: responsive styling, responsive images, critical path styling
    9. React Storybook stories for components

4. X-Browser testing limited to latest Chrome, Firefox & Safari on Mac OSX

5. I've popped the Zone logo on the app header. Hopefully you won't sue me :)
