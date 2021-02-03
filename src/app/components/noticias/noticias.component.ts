import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  //Las variables recibidas por parte de los diferentes TABS
  @Input() noticias: Article[] = [];
  //Saber si esta en favoritos para control de boton
  @Input() enFavoritos = false;


  constructor() { }

  ngOnInit() {
  }

}
