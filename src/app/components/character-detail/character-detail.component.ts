import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getPageVisits } from '../../reducers';
import { PageVisits } from '../../model/page-visits';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<any>
  ) {
  }

  @Input() characterName: string;
  @Input() characterImage: string;
  @Input() characterDescription: string;
  @Input() characterWikiUrl: string;
  @Input() characterId: number;
  @Input() isLoggedIn: boolean;

  // TODO move to character.component
  @Input() isFavorite: boolean;
  @Input() isFavoritesLoaded: boolean;

  @Output() addFavorite = new EventEmitter();
  @Output() deleteFavorite = new EventEmitter();

  private alreadyVisited: boolean;
  public shouldAnimate = false;
  public pageVisits: number;
  private pageVisits$: Observable<PageVisits>;
  private pageVisitSubscription: Subscription;

  ngOnInit(): void {
    this.pageVisits$ = this.store.select(getPageVisits);
    this.pageVisitSubscription = this.pageVisits$.subscribe(
      response => {
        if (response) {
          this.alreadyVisited = response.already_visited;
          this.pageVisits = this.alreadyVisited ? response.visits : response.visits - 1;
        }
      }
    );
  }

  addToFavorites() {
    this.addFavorite.emit();
  }

  deleteFromFavorites() {
    this.deleteFavorite.emit();
  }

  openWikiLink(): void {
    window.open(this.characterWikiUrl.toString());
  }

  countOneUp() {
    if (this.alreadyVisited === false) {
      setTimeout(() => {
        this.pageVisits += 1;
        this.alreadyVisited = true;
        this.shouldAnimate = true;
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    this.pageVisitSubscription.unsubscribe();
  }

}
