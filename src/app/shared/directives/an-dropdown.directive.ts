import {Directive, ElementRef, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appAnDropdown]'
})
export class AnDropdownDirective {

  constructor(private el: ElementRef) { }

  @Input('highlightColor') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.setColor(this.highlightColor || 'red' );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setColor(null);
  }

  private setColor(color: string) {
    this.el.nativeElement.style.color = color;
  }

}
