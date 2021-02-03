import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

//Servicio para traer la data

//Traer las constantes 
const apiKey = environment.apiKey;
const apiUlr = environment.apiUlr;

//Header para el apiKey que conecta con los JSON
const headers = new HttpHeaders({
  'X-Api-key': apiKey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  //Manejo de las paginas de noticias
  headlinesPage = 0;

  //Manejo de las paginas en cambio de categorias
  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http: HttpClient ) { }


  //Construir el link API
  private ejecutarQuery<T>( query: string ) {

    query = apiUlr + query;

    return this.http.get<T>( query, { headers } );

  }

  //Obtener las noticia de Para ti
  getTopHeadlines() {
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${ this.headlinesPage }`);
  }

  //Obtener las noticia por categorias
  getTopHeadlinesCategoria( categoria: string ) {

    //Logica para manejar numero de pagina
    if ( this.categoriaActual === categoria ) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${ categoria }&page=${ this.categoriaPage }`);
  }

}
