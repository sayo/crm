import {Directive, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";

@Directive({
  selector: '[equals]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EqualsValidatorDirective,
    multi: true
  }]
})
export class EqualsValidatorDirective implements Validator {

  @Input()
  private equals: string;

  validate(control: AbstractControl): { [key: string]: any } {

    let value = control.value;
    let parent = control.parent;
    let targetControl = parent.get(this.equals);

    if (targetControl == null) return null;
    let result = value === targetControl.value;

    return result ? null : {this: {value}};
  }
}


