import {Directive} from '@angular/core';
import {AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


export function uniqueEmailValidator(userService: UserService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.checkUniqueEmail(c.value).pipe(
      map(data => {
          return (data['data'] && data['data'].length > 0) ? {'uniqueEmail': true} : null;
        }
      )
    );
  };
}

@Directive({
  selector: '[appUniqueEmailValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueEmailValidatorDirective,
      multi: true
    }
  ]
})

export class UniqueEmailValidatorDirective implements AsyncValidator {
  constructor(private userService: UserService) {
  }

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return uniqueEmailValidator(this.userService)(ctrl);
  }
}
