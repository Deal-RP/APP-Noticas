import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  //Almacenar las noticias
  noticias: Article[] = [];

  constructor( private storage: Storage,
               public toastController: ToastController) {

    //Para que se cargue cada vez que se llame este service
    this.cargarFavoritos();

  }

  //Mostrar un mensaje flotante
  async presentToast( message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  //Guardar las noticias
  guardarNoticia( noticia: Article ) {

    //Evaluar si ya ha sido almacenada antes
    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if ( !existe ) {
      //colocar la noticia al incio del arreglo
      this.noticias.unshift( noticia );
      //Guardar la noticia, con la etiqueta favoritos
      this.storage.set('favoritos', this.noticias );
    }

    this.presentToast( 'Agregado a favorito' );
  }

  //Cargar las noticias almacenadas
  async cargarFavoritos() {
    //Obtener la data con la etiqueta favoritos (await = para esperar hasta que cargue la informacion)
    const favoritos = await this.storage.get('favoritos');

    //Solo lo asigna si hay favoritos guardados
    if ( favoritos ) {
      this.noticias = favoritos;
    }
  }

  //Borrar de favorito
  borrarNoticia( noticia: Article ) {
    //Elimina todo aquello que tenga el mismo titulo
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );

    //Almacenar el arreglo filtrado
    this.storage.set('favoritos', this.noticias );

    this.presentToast( 'Borrado de favoritos' );
  }

}
