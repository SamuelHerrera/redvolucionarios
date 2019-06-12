import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Contenido } from '../services/contenido.model';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  loading = true;
  mostrarBusqueda = false;
  contenido: Contenido[] = [];

  constructor(private blogService: BlogService, private socialSharing: SocialSharing) { }

  ngOnInit(): void {
    this.loadData(null);
  }

  loadData(text: string, append = false) {
    this.loading = true;
    this.blogService.get_contenido(text).subscribe((contenido: Contenido[]) => {
      if (append) {
        this.contenido = contenido.concat(this.contenido);
      } else {
        this.contenido = contenido;
      }
      this.loading = false;
    });
  }

  onSearchChange(data) {
    const text: string = data.detail.value;
    this.loadData(text);
  }

  ocultarBusqueda() {
    this.mostrarBusqueda = false;
    this.loadData(null);
  }

  toggleBusqueda() {
    this.mostrarBusqueda = !this.mostrarBusqueda;
    if (!this.mostrarBusqueda) {
      this.loadData(null);
    }
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
    setTimeout(() => {
      console.log('Async operation has ended');
      this.loadData(null, true);
      event.target.complete();
    }, 2000);
  }

}
