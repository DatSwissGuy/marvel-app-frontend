import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MarvelSearchResult } from '../../model/marvel-search-result';
import { MarvelApiResults } from '../../model/marvel-api-results';
import { MarvelComic } from '../../model/marvel-comic';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelSearchResultFactory } from '../../model/marvel-search-result.factory';
import { Store } from '@ngrx/store';
import { getCharacterComicSeriesApiResults, getComicSeriesSearchResults } from '../../reducers';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { RequestComicSeriesList, RequestComicSeriesSearch } from '../../actions/marvel.actions';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-series-container',
  templateUrl: './series-container.component.html',
  styleUrls: ['./series-container.component.scss']
})
export class SeriesContainerComponent implements OnInit {
  searchResults$: Observable<MarvelSearchResult[]>;
  searchTermSubject$ = new Subject<string>();
  series$: Observable<MarvelApiResults<MarvelComic>>;
  characterId: number;
  searchTerm: string;
  page: number;
  resultLimit = environment.apiResultLimit;
  typeaheadResultLimit = environment.apiResultLimit;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchResultFactory: MarvelSearchResultFactory,
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.series$ = this.store.select(getCharacterComicSeriesApiResults);
    this.searchResults$ = this.store.select(getComicSeriesSearchResults).pipe(
      filter(data => data !== null),
      map(data => data.results.map(value => this.searchResultFactory.fromComic(value)))
    );
    this.characterId = +this.route.snapshot.paramMap.get('id');
    this.route.queryParamMap.subscribe(queryParamMap => this.searchTerm = queryParamMap.get('search'));
    this.searchTermSubject$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(searchTerm => this.store.dispatch(new RequestComicSeriesSearch({
        limit: this.typeaheadResultLimit,
        characterId: this.characterId,
        search: searchTerm
      })));
    this.route.queryParamMap.subscribe(queryParamMap => this.page = Math.floor(+queryParamMap.get('page')));
    if (this.page === 0) {
      this.page = 1;
    }
    this.route.queryParamMap.subscribe(queryParamMap => this.searchTerm = queryParamMap.get('search'));
    this.store.dispatch(new RequestComicSeriesList({
      offset: (this.page - 1) * this.resultLimit,
      limit: this.resultLimit,
      characterId: this.characterId,
      search: this.searchTerm
    }));
  }

  onPageChange(event: { offset: number, limit: number }): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {page: Math.ceil(event.offset / event.limit + 1)},
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
    this.store.dispatch(new RequestComicSeriesList({
      offset: event.offset,
      limit: event.limit,
      characterId: this.characterId,
      search: this.searchTerm
    }));
  }

  onSearchQueryChange(searchTerm: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {search: searchTerm},
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
    this.searchTermSubject$.next(searchTerm);
  }

  onSearchBlur(): void {
    this.store.dispatch(new RequestComicSeriesList({
      characterId: this.characterId,
      search: this.searchTerm
    }));
  }
}
