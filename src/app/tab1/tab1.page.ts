import { Component, OnInit, HostListener, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Contenido } from '../services/contenido.model';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  loading = true;
  mostrarBusqueda = false;
  contenido: Contenido[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadData(null);
  }

  loadData(text: string, append = false) {
    this.loading = true;
    this.blogService.get_products(text).subscribe((contenido: Contenido[]) => {
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

  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.loadData(null, true);
      event.target.complete();
    }, 2000);
  }

}
