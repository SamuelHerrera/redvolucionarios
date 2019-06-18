import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contenido } from './contenido.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private noticias: Contenido[] = [
    {
      subtitle: '08 Jun 2019',
      title: 'Convocatoria de los Galardones RED 2017',
      image: 'http://redjovenesxmexico.com/wp-content/uploads/2017/07/logo_galardonesRED-1170x750.png',
      // tslint:disable-next-line:max-line-length
      content: 'La militancia y el trabajo en el partido se reconocen desde la Red Jóvenes X México. Ya está abierta la convocatoria de los Galardones RED.',
      url: 'http://redjovenesxmexico.com/convocatoria-de-los-galardones-red-2017/',
      type: 'noticia',
      confirmacionEvento: 0,
      badges: ['internet', 'yucatan', 'fashion'],
      inicio: null,
      fin: null
    }, {
      subtitle: '18 Jun 2019',
      title: 'Asamblea Regional de la Red Jóvenes x México en Monterrey',
      image: 'http://redjovenesxmexico.com/wp-content/uploads/2017/07/19732035_865729386912619_5317404181002911255_n.jpg',
      // tslint:disable-next-line:max-line-length
      content: 'Gran Asamblea Regional de la Red Jóvenes x México en Monterrey, con la presencia de los Estados de Guanajuato, Nuevo León, Zacatecas, Coahuila, Querétaro, San Luis Potosí, Aguascalientes y Tamaulipas.',
      url: 'http://redjovenesxmexico.com/asamblea-regional-de-la-red-jovenes-x-mexico-en-monterrey/',
      type: 'evento',
      confirmacionEvento: 0,
      badges: ['jovenes', 'Nuevo Leon', 'noreste'],
      inicio: new Date(),
      fin: null
    }, 
    
    {
      subtitle: '20 Jun 2019',
      title: 'Asamblea Regional de la Red Jóvenes x México en Puebla',
      image: 'http://redjovenesxmexico.com/wp-content/uploads/2017/07/19601231_862802193872005_6007233327893768533_n.jpg',
      // tslint:disable-next-line:max-line-length
      content: 'En Puebla llevamos a cabo nuestra primera Asamblea Regional de la Red Jóvenes x México rumbo a la XXII Asamblea Nacional del PRI',
      url: 'http://redjovenesxmexico.com/asamblea-regional-de-la-red-jovenes-x-mexico-en-puebla/',
      type: 'noticia',
      confirmacionEvento: 0,
      badges: ['regional', 'asamblea'],
      inicio: null,
      fin: null
    }, {
      subtitle: '22 Jun 2019',
      title: 'Asamblea Regional de la Red Jóvenes x México en el Edo. de México',
      image: 'http://redjovenesxmexico.com/wp-content/uploads/2017/07/19554742_862238183928406_2766354078052194277_n-914x750.jpg',
      // tslint:disable-next-line:max-line-length
      content: 'Asamblea Regional en Estado de México, en la Red Jóvenes x México estamos trabajando sin descanso rumbo a la XXII Asamblea Nacional del PRI, gracias a los Jóvenes de Michoacán, Hidalgo y Edomex que participaron.',
      url: 'http://redjovenesxmexico.com/asamblea-regional-de-la-red-jovenes-x-mexico-en-puebla/',
      type: 'noticia',
      confirmacionEvento: 0,
      badges: ['regional', 'Edomex', 'asamblea'],
      inicio: null,
      fin: null
    },
    
    {
      subtitle: '22 Jun 2019',
      title: 'Asamblea Regional de la Red Jóvenes x México en el Edo. de México',
      image: 'http://redjovenesxmexico.com/wp-content/uploads/2017/07/19554742_862238183928406_2766354078052194277_n-914x750.jpg',
      // tslint:disable-next-line:max-line-length
      content: 'GrAsambleaan Asamblea Regional de la Red Jóvenes x México en Monterrey, con la presencia de los Estados de Guanajuato, Nuevo León, Zacatecas, Coahuila, Querétaro, San Luis Potosí, Aguascalientes y Tamaulipas.',
      url: 'http://redjovenesxmexico.com/asamblea-regional-de-la-red-jovenes-x-mexico-en-el-edo-de-mexico',
      //redjovenesxmexico.com/asamblea-regional-de-la-red-jovenes-x-mexico-en-el-edo-de-mexico/http://redjovenesxmexico.com/asamblea-regional-de-la-red-jovenes-x-mexico-en-monterrey/',
      type: 'evento',
      confirmacionEvento: 0,
      badges: ['jovenes', 'Edomex', 'mexiquense'],
      inicio: new Date(),
      fin: null
    }, 
  ];

  private preguntas: any = [
    {
      id: '',
      texto: '¿Cual es tu deporte favorito?',
      opciones: [
        {
          texto: 'Futbol',
          id: ''
        }, {
          texto: 'Basquetbol',
          id: ''
        }, {
          texto: 'Tenis',
          id: ''
        }
      ],
      respuestaId: ''
    },
    {
      id: '',
      texto: '¿Juegas videojuedos?',
      opciones: [
        {
          texto: 'Si',
          id: ''
        }, {
          texto: 'No',
          id: ''
        }, {
          texto: 'A veces',
          id: ''
        }
      ],
      respuestaId: ''
    },
    {
      id: '',
      texto: '¿Eres estudiante?',
      opciones: [
        {
          texto: 'Si',
          id: ''
        }, {
          texto: 'No',
          id: ''
        }
      ],
      respuestaId: ''
    }
  ];

  constructor(private httpClient: HttpClient) { }

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
}
