import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'chatTime',
})
export class ChatTime implements PipeTransform {

  transform(value: string, ...args) {

    let formatDay = args[0] || 'YYYY-MM-DD';
    let formatHour = args[1] || 'HH:mm:ss';

    let today = moment().format(formatDay);
    let day = moment(value).format(formatDay);

    let format = day === today ? formatHour : formatDay;

    return moment(value).format(format);
  }
}