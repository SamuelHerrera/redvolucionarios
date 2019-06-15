import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { formatDate } from '@angular/common';
import { BlogService } from '../services/blog.service';
import { Contenido } from '../services/contenido.model';
// import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

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

  // tslint:disable-next-line:max-line-length
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
      title: evento.title,
      startTime: evento.inicio,
      endTime: evento.fin ? evento.fin : auxTime,
      allDay: false,
      // tslint:disable-next-line:max-line-length
      desc: evento.content,
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
      buttons: [
        {
          text: 'Mapa',
          cssClass: 'primary',
          handler: () => {
            console.log('Confirm Okay');
            this.openEventInMaps();
          }
        },
        {
          text: 'Cerrar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    alert.present();
  }


  openEventInMaps() {
    // const options: LaunchNavigatorOptions = {
    //   start: 'Campeche, MX',
    //   app: this.launchNavigator.APP.USER_SELECT
    // };

    // document.addEventListener('deviceready', function() {
    //   this.launchNavigator.navigate('Campeche, MX', options)
    //     .then(
    //       success => console.log('Launched navigator'),
    //       error => console.log('Error launching navigator', error)
    //     );
    // }, false);


  }
}
