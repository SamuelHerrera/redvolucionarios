import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-entrevista',
  templateUrl: './entrevista.page.html',
  styleUrls: ['./entrevista.page.scss'],
})
export class EntrevistaPage implements OnInit {

  preguntas: any[];

  constructor(private router: Router, private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.get_Preguntas().subscribe((preguntas: any[]) => {
      if (preguntas) {
        this.preguntas = preguntas;
      }
    });
  }

  completarEntrevista() {
    this.router.navigate(['tabs']);
  }

}
