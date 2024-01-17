import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dasherize',
  standalone: true
})
export class DasherizePipe implements PipeTransform {

  transform(value: string): string {
    return value.toLowerCase().split(" ").join("-")
  }

}
