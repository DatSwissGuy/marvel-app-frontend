import { MarvelCharacter } from '../model/marvel-character';
import { MarvelActionsUnion, MarvelActionTypes } from '../actions/marvel.actions';
import { MarvelApiResults } from '../model/marvel-api-results';
import { MarvelComic } from '../model/marvel-comic';

export interface State {
  seriesSearch: MarvelApiResults<MarvelComic>;
  eventsSearch: MarvelApiResults<MarvelComic>;
  characters: MarvelApiResults<MarvelCharacter>;
  comics: MarvelApiResults<MarvelComic>;
  series: MarvelApiResults<MarvelComic>;
  stories: MarvelApiResults<MarvelComic>;
  events: MarvelApiResults<MarvelComic>;
  character: MarvelApiResults<MarvelCharacter>;
  characterSearch: MarvelApiResults<MarvelCharacter>;
  comicSearch: MarvelApiResults<MarvelComic>;
  isLoading: boolean;
  wikiUrl: MarvelApiResults<MarvelCharacter>;
}

const initialState: State = {
  seriesSearch: null,
  characters: null,
  comics: null,
  series: null,
  stories: null,
  events: null,
  character: null,
  characterSearch: null,
  comicSearch: null,
  isLoading: false,
  eventsSearch: null,
  wikiUrl: null
};

export function reducer(
  state: State = initialState,
  action: MarvelActionsUnion
): State {
  switch (action.type) {

    case MarvelActionTypes.SuccessCharacterList:
      return {
        ...state,
        characters: action.payload.apiResults
      };

    case MarvelActionTypes.SuccessComicList:
      return {
        ...state,
        comics: action.payload.apiResults
      };

    case MarvelActionTypes.SuccessCharacterDetail:
      return {
        ...state,
        character: action.payload.apiResults
      };

    case MarvelActionTypes.SuccessCharacterSearch:
      return {
        ...state,
        characterSearch: action.payload.apiResults
      };

    case MarvelActionTypes.SuccessComicSearch:
      return {
        ...state,
        comicSearch: action.payload.apiResults
      };

    case MarvelActionTypes.SuccessComicSeriesSearch:
      return {
        ...state,
        seriesSearch: action.payload.apiResults
      };

    case MarvelActionTypes.SuccessCharacterEventsSearch:
      return {
        ...state,
        eventsSearch: action.payload.apiResults
      };

    case MarvelActionTypes.RequestCharacterEventsSearch:
      return {
        ...state,
        eventsSearch: null
      };

    case MarvelActionTypes.RequestCharacterList:
      if (state.characters !== null) {
        if ((state.characters.offset === action.payload.offset) && (state.characters.limit === action.payload.limit)) {
          return state;
        }
      }
      return {
        ...state,
        characters: null
      };

    case MarvelActionTypes.RequestComicList:
      if (state.comics !== null) {
        if ((state.comics.offset === action.payload.offset) && (state.comics.limit === action.payload.limit)) {
          return state;
        }
      }
      return {
        ...state,
        comics: null
      };

    case MarvelActionTypes.RequestCharacterDetail:
      if ((state.character ? state.character.results[0].id : null) !== action.payload.characterId) {
        return {
          ...state,
          character: null,
          comics: null,
        };
      }
      return state;

    case MarvelActionTypes.RequestCharacterSearch:
      return {
        ...state,
        characterSearch: null
      };

    case MarvelActionTypes.RequestComicSearch:
      return {
        ...state,
        comicSearch: null
      };

    case MarvelActionTypes.RequestComicSeriesSearch:
      return {
        ...state,
        seriesSearch: null
      };

    case MarvelActionTypes.RequestHttp:
      return {
        ...state,
        isLoading: true
      };

    case MarvelActionTypes.SuccessHttp:
      return {
        ...state,
        isLoading: false
      };

    case MarvelActionTypes.RequestComicSeriesList:
      if (state.series !== null) {
        if ((state.series.offset === action.payload.offset) && (state.series.limit === action.payload.limit)) {
          return state;
        }
      }
      return {
        ...state,
        series: null
      };

    case MarvelActionTypes.RequestComicStoriesList:
      if (state.stories !== null) {
        if ((state.stories.offset === action.payload.offset) && (state.stories.limit === action.payload.limit)) {
          return state;
        }
      }
      return {
        ...state,
        stories: null
      };

    case MarvelActionTypes.RequestComicEventsList:
      if (state.events !== null) {
        if ((state.events.offset === action.payload.offset) && (state.events.limit === action.payload.limit)) {
          return state;
        }
      }
      return {
        ...state,
        events: null
      };

    case MarvelActionTypes.SuccessComicSeriesList:
      return {
        ...state,
        series: action.payload.apiResults
      };

    case MarvelActionTypes.SuccessComicStoriesList:
      return {
        ...state,
        stories: action.payload.apiResults
      };

    case MarvelActionTypes.SuccessComicEventsList:
      return {
        ...state,
        events: action.payload.apiResults
      };

    case MarvelActionTypes.RequestCharacterWikiUrl:
      if ((state.character ? state.character.results[0].id : null) !== action.payload.characterId) {
        return {
          ...state,
          wikiUrl: null,
        };
      }
      return state;

    case MarvelActionTypes.SuccessCharacterWikiUrl:
      return {
        ...state,
        wikiUrl: action.payload.apiResults
      };

    default:
      return state;
  }
}

export const getCharacterApiResults = (state: State) => state.characters;

export const getCharacterComicApiResults = (state: State) => state.comics;

export const getHasComics = (character: MarvelCharacter) => character ? character.comics.available > 0 : false;

export const getCharacterComicSeriesApiResults = (state: State) => state.series;

export const getHasSeries = (character: MarvelCharacter) => character ? character.series.available > 0 : false;

export const getCharacterComicStoriesApiResults = (state: State) => state.stories;

export const getHasStories = (character: MarvelCharacter) => character ? character.stories.available > 0 : false;

export const getCharacterComicEventsApiResults = (state: State) => state.events;

export const getHasEvents = (character: MarvelCharacter) => character ? character.events.available > 0 : false;

export const getCharacterWikiUrl = (character: MarvelCharacter) => {
  if (character === null) {
    return null;
  }
  return character.urls.find(url => url.type === 'wiki');
};

export const getCharacterDetailApiResults = (state: State) => state.character ? state.character.results[0] : null;

export const getCharacterHeaderImage = (character: MarvelCharacter) => {
  if (character === null) {
    return null;
  } else {
    if (character.thumbnail.path.includes('image_not_available')) {
      return null;
    } else {
      return `${character.thumbnail.path}.${character.thumbnail.extension}`;
    }
  }
};

export const getCharacterSearchApiResults = (state: State) => state.characterSearch;

export const getComicSearchApiResults = (state: State) => state.comicSearch;

export const getComicSeriesSearchApiResults = (state: State) => state.seriesSearch;

export const getCharacterEventsSearchApiResults = (state: State) => state.eventsSearch;

export const getLoadingState = (state: State) => state.isLoading;









