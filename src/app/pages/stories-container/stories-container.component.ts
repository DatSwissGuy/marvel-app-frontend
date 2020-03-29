import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MarvelApiResults } from '../../model/marvel-api-results';
import { MarvelComic } from '../../model/marvel-comic';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelSearchResultFactory } from '../../model/marvel-search-result.factory';
import { Store } from '@ngrx/store';
import { getComicStoriesApiResults } from '../../reducers';
import { RequestComicStoriesList } from '../../actions/marvel.actions';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-stories-container',
  templateUrl: './stories-container.component.html',
  styleUrls: ['./stories-container.component.scss']
})
export class StoriesContainerComponent implements OnInit {
  stories$: Observable<MarvelApiResults<MarvelComic>>;
  characterId: number;
  page: number;
  resultLimit = environment.apiResultLimit;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchResultFactory: MarvelSearchResultFactory,
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.stories$ = this.store.select(getComicStoriesApiResults);
    this.characterId = +this.route.snapshot.paramMap.get('id');
    this.route.queryParamMap.subscribe(queryParamMap => this.page = Math.floor(+queryParamMap.get('page')));
    if (this.page === 0) {
      this.page = 1;
    }

    this.store.dispatch(new RequestComicStoriesList({
      offset: (this.page - 1) * this.resultLimit,
      limit: this.resultLimit,
      characterId: this.characterId,
    }));
  }

  onPageChange(event: { offset: number, limit: number }): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {page: Math.ceil(event.offset / event.limit + 1)},
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
    this.store.dispatch(new RequestComicStoriesList({
      offset: event.offset,
      limit: event.limit,
      characterId: this.characterId,
    }));
  }
}
