import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'relativeTime',
})
export class RelativeTime implements PipeTransform {

  transform(value: string, ...args) {
    return moment(new Date(value)).fromNow(true) + ' ago';
  }
}