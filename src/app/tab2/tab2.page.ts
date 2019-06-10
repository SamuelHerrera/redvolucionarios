import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  minDate = new Date().toISOString();

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'es-MX'
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.precargarDummies();

  }

  precargarDummies() {
    let inicio = new Date();
    inicio.setHours(Math.floor(Math.random() * 20) + 9);
    let fin = inicio;
    fin.setHours(fin.getHours());
    this.addEvent(inicio, fin);
    for (let i = 0; i < 30; i++) {
      inicio = new Date();
      inicio.setDate(Math.floor(Math.random() * 30) + 1);
      inicio.setHours(Math.floor(Math.random() * 20) + 9);
      fin = inicio;
      fin.setHours(fin.getHours());
      this.addEvent(inicio, fin);
    }
  }
 
  // Create the right event format and reload source
  addEvent(inicio, fin) {
    const eventCopy = {
      title: 'Convocatoria de los Galardones RED 2017',
      startTime: inicio,
      endTime: fin,
      allDay: false,
      // tslint:disable-next-line:max-line-length
      desc: 'La militancia y el trabajo en el partido se reconocen desde la Red Jóvenes X México. Ya está abierta la convocatoria de los Galardones RED.',
      item: {
        subtitle: '08 Jun 2019',
        title: 'Asamblea Regional de la Red Jóvenes x México en Campeche',
        image: 'http://redjovenesxmexico.com/wp-content/uploads/2017/07/19944490_867982273353997_7198108672596367740_o-1170x750.jpg',
        // tslint:disable-next-line:max-line-length
        content: 'Con rumbo a la XXII Asamblea Nacional de nuestro partido, realizamos nuestra última Asamblea Regional de la Red Jóvenes X México en el Estado',
        url: 'http://redjovenesxmexico.com/asamblea-regional-de-la-red-jovenes-x-mexico-en-campeche/',
        type: 'evento',
        confirmacionEvento: 0,
        badges: ['jovenes', 'CDMX', 'campeche']
      }
    };

    if (eventCopy.allDay) {
      const start = eventCopy.startTime;
      const end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
  }
  // Change current month/week/day
  next() {
    // tslint:disable-next-line:no-string-literal
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    // tslint:disable-next-line:no-string-literal
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode: CustomEvent) {
    this.calendar.mode = mode.detail.value;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    const start = formatDate(event.startTime, 'medium', this.locale);
    const end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

}
