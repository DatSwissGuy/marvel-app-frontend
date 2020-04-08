import { Component, Input, OnInit } from '@angular/core';
import { PageVisitsService } from '../../services/page-visits.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getPageVisits } from '../../reducers';
import { PageVisits } from '../../model/page-visits';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {

  constructor(
    private pageVisitsService: PageVisitsService,
    private store: Store<any>,
  ) {
  }

  @Input() characterName: string;
  @Input() characterImage: string;
  @Input() characterDescription: string;
  @Input() characterWikiUrl: string;
  @Input() characterId: number;

  private alreadyVisited: boolean;
  public shouldAnimate = false;
  public pageVisits: number;
  private pageVisits$: Observable<PageVisits>;

  ngOnInit(): void {
    this.pageVisits$ = this.store.select(getPageVisits);
    this.pageVisits$.subscribe(
      response => {
        if (response) {
          this.alreadyVisited = response.already_visited;
          this.pageVisits = this.alreadyVisited ? response.visits : response.visits - 1;
        }
      }
    );
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
}
