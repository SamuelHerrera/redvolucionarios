import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { formatDate } from '@angular/common';
import { BlogService } from '../services/blog.service';
import { Contenido } from '../services/contenido.model';

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

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private blogService: BlogService) { }

  ngOnInit() {
    this.precargarDummies();

  }

  precargarDummies() {
    this.blogService.get_eventos().subscribe((eventos: Contenido[]) => {
      if (eventos) {
        eventos.forEach((evento: Contenido) => {
          this.addEvent(evento);
        });
      }
    });
  }

  // Create the right event format and reload source
  addEvent(evento: Contenido) {
    console.log(evento);
    const auxTime = evento.inicio;
    auxTime.setHours(evento.inicio.getHours() + 1);
    const eventCopy = {
      title: 'Convocatoria de los Galardones RED 2017',
      startTime: evento.inicio,
      endTime: evento.fin ? evento.fin : auxTime,
      allDay: false,
      // tslint:disable-next-line:max-line-length
      desc: 'La militancia y el trabajo en el partido se reconocen desde la Red Jóvenes X México. Ya está abierta la convocatoria de los Galardones RED.',
      item: evento
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
      message: 'Inicia: ' + start + '<br><br>Termina: ' + end,
      buttons: ['Cerrar']
    });
    alert.present();
  }

}
