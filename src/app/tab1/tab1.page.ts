import { Component, OnInit, Input, Inject, LOCALE_ID } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Contenido } from '../services/contenido.model';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Plugins } from '@capacitor/core';
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
// import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

const { Share } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // tslint:disable-next-line:variable-name
  private _searchText: string;
  noticias: any;

  get item(): any {
    return this._searchText;
  }

  @Input()
  set searchText(val: string) {
    if (val) {
      console.log(val);
      this._searchText = val;
      this.loadData(this._searchText);
    }
  }

  loading = true;
  contenido: Contenido[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private blogService: BlogService, private socialSharing: SocialSharing) { }

  ngOnInit(): void {
    this.loadData(null);
  }

  loadData(text: string, append = false, event: any = false) {
    this.loading = true;
    this.blogService.get_contenido(text).subscribe((contenido: Contenido[]) => {
      if (append) {
        this.contenido = contenido.concat(this.contenido);
      } else {
        this.contenido = contenido;
      }
      this.loading = false;
      if (event) {
        event.target.complete();
      }
    });
  }

  async shareOnFacebook(contenido: Contenido) {
    // this.socialSharing.shareViaFacebook(contenido.title, contenido.image).then(response => {
    //   console.log(response);
    // }).catch((error) => { console.log(error); });
    const shareRet = await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies'
    });
  }

  shareOnTwitter(contenido: Contenido) {
    this.socialSharing.shareVia(contenido.title, contenido.image).then(response => {
      console.log(response);
    }).catch((error) => { console.log(error); });
  }

  shareOnInstagram(contenido: Contenido) {
    this.socialSharing.shareViaWhatsApp(contenido.title, contenido.image).then(response => {
      console.log(response);
    }).catch((error) => { console.log(error); });
  }

  doRefresh(event) {
    if (this._searchText) {
      this.loadData(this._searchText, true, event);
    } else {
      this.loadData(null, true, event);
    }
  }

  // Calendar event was clicked
  async onEventSelected(event: Contenido) {
    // Use Angular date pipe for conversion
    const start = formatDate(event.inicio, 'medium', this.locale);
    const end = formatDate(event.fin, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.content,
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
    //   start: 'London, ON',
    //   app: this.launchNavigator.APP.USER_SELECT
    // };

    // document.addEventListener('deviceready', function () {
    //   this.launchNavigator.navigate('Campeche, MX', options)
    //     .then(
    //       success => console.log('Launched navigator'),
    //       error => console.log('Error launching navigator', error)
    //     );
    // }, false);
  }

  public get_contenido(text: string) {
    return new Observable(observer => {
      setTimeout(() => {
        if (text) {
          observer.next(this.noticias.filter((noticia) => {
            return noticia.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
          }));
        } else {
          observer.next(this.noticias);
        }
      }, 1000);
    });
  }

  public get_eventos() {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.noticias.filter((noticia) => {
          return noticia.type === 'evento';
        }));
      }, 1000);
    });
  }

  public get_Preguntas() {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.preguntas);
      }, 1000);
    });
  }
  preguntas(preguntas: any) {
    throw new Error('Method not implemented.');
  }
}
