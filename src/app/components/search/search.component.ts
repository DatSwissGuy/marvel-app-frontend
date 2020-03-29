import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MarvelSearchResult } from '../../model/marvel-search-result';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchTermControl: FormControl = new FormControl();
  focusOnSearching = false;
  focusOnSearchResults = false;

  @Input() set searchTerm(searchTerm: string) {
    this.searchTermControl.setValue(searchTerm, {emitEvent: searchTerm !== this.searchTermControl.value});
  }

  @Input() searchResults: MarvelSearchResult[];
  @Output() searchChange = new EventEmitter();
  @Output() searchClick = new EventEmitter();
  @Output() searchEnter = new EventEmitter();


  ngOnInit(): void {
    this.searchTermControl.valueChanges
      .subscribe(searchTerm => {
          const searchTermWithOneTrailingWhiteSpace = searchTerm.trimStart().replace(/  +/g, ' ');
          this.searchTermControl.setValue(searchTermWithOneTrailingWhiteSpace, {emitEvent: false});

          const searchTermWithoutWhiteSpaces = searchTermWithOneTrailingWhiteSpace.trim();
          this.searchChange.emit(searchTermWithoutWhiteSpaces);
        }
      );
  }

  onBlur(): void {
    this.focusOnSearching = false;
  }

  onKeyUpEnter(): void {
    this.focusOnSearching = false;
    this.searchEnter.emit();
  }

  onFocus(): void {
    this.focusOnSearching = true;
  }

  onMouseover(): void {
    this.focusOnSearchResults = true;
  }

  onMouseout(): void {
    this.focusOnSearchResults = false;
  }

  isSearchResultZero(): boolean {
    return this.searchResults.length === 0;
  }

}
