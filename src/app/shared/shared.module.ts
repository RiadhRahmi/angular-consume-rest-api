import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnDropdownDirective} from './directives/an-dropdown.directive';
import {PrefixPipe} from './pipes/prefix.pipe';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {DaterangepickerDirective} from './directives/daterangepicker.directive';
import {UniqueEmailValidatorDirective} from './directives/unique-email-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AnDropdownDirective,
    PrefixPipe,
    CapitalizePipe,
    DaterangepickerDirective,
    UniqueEmailValidatorDirective,
  ],
  exports: [
    CommonModule,
    AnDropdownDirective,
    PrefixPipe,
    CapitalizePipe,
    DaterangepickerDirective,
    UniqueEmailValidatorDirective,
  ]
})
export class SharedModule { }
