import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string, searchTerm: string): string {
    if (!searchTerm) {
      return value;
    }

    const regex: RegExp = new RegExp(searchTerm, 'gi');
    const match = value.match(regex);

    if (!match) {
      return value;
    }

    const replacedValue = value.replace(regex, '<mark>' + match[0] + '</mark>');
    return this.sanitizer.bypassSecurityTrustHtml(replacedValue) as string;
  }
}
