import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTextTrim]'
})
export class TextTrimDirective {
  @Input('characters') characters: number = 30;
  @Input('placement') placement: string = 'top';
  constructor(private elRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    if (this.elRef.nativeElement.innerText && this.elRef.nativeElement.innerText.length > this.characters) {
      this.elRef.nativeElement.innerText = this.elRef.nativeElement.innerText.substr(0, this.characters) + '...';
      if (!this.elRef.nativeElement.attributes.placement)
        this.elRef.nativeElement.attributes.placement = this.placement;
    }
  }
}
