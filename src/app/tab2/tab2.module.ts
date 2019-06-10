import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { NgCalendarModule } from 'ionic2-calendar';
import localeESMX from '@angular/common/locales/es-MX';

registerLocaleData(localeESMX);

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgCalendarModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },
  ]
})
export class Tab2PageModule { }
