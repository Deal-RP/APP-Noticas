import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService) {

  }

  //Cargar las noticias al iniciar la pagina
  ngOnInit() {
    this.cargarNoticias();
  }

  //Metodo generico para cargar noticias
  cargarNoticias( event? ) {
    this.noticiasService.getTopHeadlines()
      .subscribe( resp => {

        //Manejo de infinity scroll, al ya no tener noticia
        if ( resp.articles.length === 0 ) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        
        //Cargar los noticias recibidas por parte del servicio al arreglo
        this.noticias.push( ...resp.articles );

        //Manejo de infinity scroll
        if ( event ) {
          event.target.complete();
        }

      });
  }
  
  //Metodo para infinity scroll (carga "infinita")
  loadData( event ) {
    this.cargarNoticias( event );
  }
}
