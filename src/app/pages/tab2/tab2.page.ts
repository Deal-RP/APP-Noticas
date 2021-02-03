import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  //Obtener el segmento
  @ViewChild(IonSegment) segment: IonSegment;

  //Diferentes categorias
  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology', ];
  noticias: Article[] = [];


  constructor( private noticiasService: NoticiasService ) {

  }


  //Iniciar con las noticias
  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias( this.categorias[0] );
  }

  //Logica para cambiar de categoria
  cambioCategoria( event ) {

    this.noticias = [];
    this.cargarNoticias( event.detail.value );

  }

  //Logica para cargar las noticias
  cargarNoticias( categoria: string, event? ) {

    this.noticiasService.getTopHeadlinesCategoria( categoria )
          .subscribe( resp => {
            // console.log(resp);
            this.noticias.push( ...resp.articles );

            if ( event ) {
              event.target.complete();
            }
          });
  }

  //Logica para cargar las noticias en el infinity scroll
  loadData( event ) {
    this.cargarNoticias( this.segment.value, event );
  }

}
