import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MarvelSearchResultFactory } from '../../model/marvel-search-result.factory';
import { RequestCharacterDetail } from '../../actions/marvel.actions';
import { Store } from '@ngrx/store';
import {
  getAverageCharacterRating,
  getCharacterDetailApiResults,
  getCharacterHeaderImage,
  getCharacterWikiUrl,
  getFavoriteId,
  getHasComics,
  getHasEvents,
  getHasSeries,
  getHasStories,
  getIsAuthenticated,
  getIsFavorite,
  getIsFavoritesLoaded,
  getUserCharacterRating
} from '../../reducers';
import { MarvelCharacter } from '../../model/marvel-character';
import { ComicsContainerComponent } from '../comics-container/comics-container.component';
import { SeriesContainerComponent } from '../series-container/series-container.component';
import { EventsContainerComponent } from '../events-container/events-container.component';
import { StoriesContainerComponent } from '../stories-container/stories-container.component';
import { MarvelCharacterUrl } from '../../model/marvel-character-url';
import {
  RequestAverageCharacterRating,
  RequestDeleteUserRating,
  RequestUpdateCharacterRating,
  RequestUserCharacterRating,
  RequestUserCharacterVoting
} from '../../actions/rating.actions';
import { AverageCharacterRating } from '../../model/average-character-rating';
import { CharacterRating } from '../../model/character-rating';
import { RequestAddFavorite, RequestDeleteFavorite } from '../../actions/favorite.actions';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  character$: Observable<MarvelCharacter>;
  characterWikiUrl$: Observable<MarvelCharacterUrl>;
  characterId: number;
  headerImage$: Observable<string>;
  hasComics$: Observable<boolean>;
  hasSeries$: Observable<boolean>;
  hasStories$: Observable<boolean>;
  hasEvents$: Observable<boolean>;
  activeTab: string;
  averageRating$: Observable<AverageCharacterRating>;
  userRating$: Observable<CharacterRating>;
  userRating: CharacterRating;
  isLoggedIn$: Observable<boolean>;
  isLoggedIn: boolean;
  isFavorite$: Observable<boolean>;
  isFavoritesLoaded$: Observable<boolean>;
  favoriteId: number;
  characterName: string;
  characterImage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchResultFactory: MarvelSearchResultFactory,
    private store: Store<any>,
  ) {
  }

  ngOnInit(): void {
    this.character$ = this.store.select(getCharacterDetailApiResults);
    this.characterWikiUrl$ = this.store.select(getCharacterWikiUrl);
    this.headerImage$ = this.store.select(getCharacterHeaderImage);
    this.hasComics$ = this.store.select(getHasComics);
    this.hasSeries$ = this.store.select(getHasSeries);
    this.hasStories$ = this.store.select(getHasStories);
    this.hasEvents$ = this.store.select(getHasEvents);
    this.characterId = +this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(queryParamMap => this.activeTab = queryParamMap.get('tab'));
    this.store.dispatch(new RequestCharacterDetail({
      characterId: this.characterId
    }));
    this.averageRating$ = this.store.select(getAverageCharacterRating);
    this.userRating$ = this.store.select(getUserCharacterRating);
    this.userRating$.subscribe(
      characterRating => this.userRating = characterRating
    );
    this.store.dispatch(new RequestAverageCharacterRating({
      characterId: this.characterId
    }));
    this.isLoggedIn$ = this.store.select(getIsAuthenticated);
    this.isLoggedIn$.subscribe(
      data => this.isLoggedIn = data
    );
    if (this.isLoggedIn) {
      this.store.dispatch(new RequestUserCharacterRating({
        characterId: this.characterId
      }));
    }
    this.isFavorite$ = this.store.select(getIsFavorite);
    this.store.select(getCharacterDetailApiResults).subscribe(
      character => {
        if (character) {
          this.characterImage = character.thumbnail.path + '.' + character.thumbnail.extension;
          this.characterName = character.name;
        }
      }
    );
    this.store.select(getFavoriteId).subscribe(
      favoriteId => this.favoriteId = favoriteId
    );
    this.isFavoritesLoaded$ = this.store.select(getIsFavoritesLoaded);
  }

  addToFavorites(): void {
    this.store.dispatch(new RequestAddFavorite({
      characterId: this.characterId,
      characterName: this.characterName,
      imageUrl: this.characterImage
    }));
  }

  deleteFromFavorites(): void {
    if (this.favoriteId) {
      this.store.dispatch(new RequestDeleteFavorite({
        favoriteId: this.favoriteId
      }));
    }
  }

  onTabChange(event): void {
    this.router.navigate(['character', this.characterId, event]);
  }

  vote(event: number): void {
    if (this.userRating) {
      this.store.dispatch(new RequestUpdateCharacterRating({
        characterRating: {
          id: this.userRating.id,
          character_id: this.userRating.character_id,
          rating: event
        }
      }));
    } else {
      this.store.dispatch(new RequestUserCharacterVoting({
        characterId: this.characterId,
        rating: event
      }));
    }
  }

  deleteVote(event): void {
    this.store.dispatch(new RequestDeleteUserRating({
      characterRating: {
        id: this.userRating.id,
        character_id: this.userRating.character_id,
        rating: event
      }
    }));
  }

  getComponent(): any {
    switch (this.activeTab) {
      case 'comics':
        return ComicsContainerComponent;

      case 'series':
        return SeriesContainerComponent;

      case 'stories':
        return StoriesContainerComponent;

      case 'events':
        return EventsContainerComponent;

      default:
        return ComicsContainerComponent;
    }
  }
}
