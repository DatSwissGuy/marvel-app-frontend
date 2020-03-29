import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelCharacter } from '../../model/marvel-character';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { MarvelSearchResultFactory } from '../../model/marvel-search-result.factory';
import { MarvelSearchResult } from '../../model/marvel-search-result';
import { Store } from '@ngrx/store';
import { RequestCharacterList, RequestCharacterSearch } from '../../actions/marvel.actions';
import { MarvelApiResults } from '../../model/marvel-api-results';
import { getCharacterApiResults, getCharacterSearchApiResults } from '../../reducers';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-main-content',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  resultLimit = environment.apiResultLimit;
  typeaheadResultLimit = environment.apiTypeaheadResultLimit;
  page: number;
  searchTerm: string;
  searchTermSubject$ = new Subject<string>();
  searchResults$: Observable<MarvelSearchResult[]>;
  characters$: Observable<MarvelApiResults<MarvelCharacter>>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchResultFactory: MarvelSearchResultFactory,
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParamMap => this.searchTerm = queryParamMap.get('search'));
    this.route.queryParamMap.subscribe(queryParamMap => this.page = Math.floor(+queryParamMap.get('page')));
    this.characters$ = this.store.select(getCharacterApiResults);
    this.searchResults$ = this.store.select(getCharacterSearchApiResults).pipe(
      filter(data => data !== null),
      map(data => data.results.map(value => this.searchResultFactory.fromCharacter(value)))
    );
    this.searchTermSubject$.pipe(
      debounceTime(600),
      distinctUntilChanged(),
    )
      .subscribe((searchTerm: string) => {
          this.store.dispatch(new RequestCharacterSearch({
            limit: this.typeaheadResultLimit,
            search: searchTerm
          }));
        },
        error => console.log(`subscribe() error: ${error}`));
    if (this.page === 0) {
      this.page = 1;
    }

    this.store.dispatch(new RequestCharacterList({
      offset: (this.page - 1) * this.resultLimit,
      limit: this.resultLimit,
      search: this.searchTerm
    }));
  }

  onSearchResultClick(id: number): void {
    this.router.navigate(['character', id]);
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

  onKeyDownEnter() {
    this.store.dispatch(new RequestCharacterList({
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
    this.store.dispatch(new RequestCharacterList({
      offset: event.offset,
      limit: event.limit,
      search: this.searchTerm
    }));
  }
}
