import { Component } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { AuthService } from '../tab3/services/auth.service';
import { ModalService } from '../tab3/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  user: any;

  configuraciones: any[] = [
    {
      campo: 'Activar chat',
      valor: false,
      tipo: 'toggle'
    }, {
      campo: 'Activar notificaciones',
      valor: false,
      tipo: 'toggle'
    }, {
      campo: 'Suscripciones',
      valor: [],
      tipo: 'select',
      opciones: [
        {
          texto: 'informatica'
        }, {
          texto: 'deportes'
        }, {
          texto: 'cultura'
        }, {
          texto: 'educacion'
        }
      ]
    }
  ];

  detalles: any[] = [
    {
      campo: 'No. Afiliacion',
      valor: '23456345634456'
    }, {
      campo: 'Fecha de nacimiento',
      valor: '22-Nov-1993'
    }, {
      campo: 'Edad',
      valor: '25'
    }, {
      campo: 'Telefono',
      valor: '999-4709-930',
      editable: true
    }, {
      campo: 'Correo',
      valor: 'samuelherrerafuente@gmail.com',
      editable: true
    }, {
      campo: 'Direccion',
      valor: 'C.123 No.765',
      editable: true
    }, {
      campo: 'Clave de elector',
      valor: 'HRFNJS344332221H400'
    }, {
      campo: 'CURP',
      valor: 'HEFJ9344332221H400'
    }, {
      campo: 'Estado',
      valor: '31'
    }, {
      campo: 'Municipio',
      valor: '050'
    }, {
      campo: 'Seccion',
      valor: '1104'
    }, {
      campo: 'Localidad',
      valor: '0005'
    }
  ];

  constructor(
    private platform: Platform,
    private auth: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.loadAll();
    });
  }

  loadAll() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.router.navigate(['/tabs/tab3/chat/home']);
  }
}
