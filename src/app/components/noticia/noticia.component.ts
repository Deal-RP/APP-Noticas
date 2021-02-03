import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
//Plugin para poder compartir en apps sociales
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
//Servicio para almacenar de manera local
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss']
})
export class NoticiaComponent implements OnInit {

  //Parametros recibidos por las diferentes HTML
  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor( private iab: InAppBrowser,
               private actionSheetCtrl: ActionSheetController,
               private socialSharing: SocialSharing,
               private datalocalService: DataLocalService ) { }

  ngOnInit() {
    console.log('Favoritos', this.enFavoritos );
  }

    //Abrir noticia con el link y el plugin nativo
  abrirNoticia() {
    //Bandera _system para que abra en el navegador nativo
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  //Activar el sheetController (estrutura del menu)
  async lanzarMenu() {

    //Declarar un objeto dinamico(boton)
    let guardarBorrarBtn;

    //Evaluar desde que pagina es la peticion
    if ( this.enFavoritos ) {
      //Logica borrar noticia
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        //Colocar estilos
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar de favorito');
          this.datalocalService.borrarNoticia( this.noticia );
        }
      };

    } else {
      //Logica agregar favorito
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        //Colocar el estilo
        cssClass: 'action-dark',
        handler: () => {
          //Llama al servicio para almacenar la noticia
          console.log('Favorito');
          this.datalocalService.guardarNoticia( this.noticia );
        }
      };

    }


    //Donde se declara los botones
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Share clicked');

            //Este metodo no funciona en el Desktop, por ser plugin para nativo
            //Metodo para poder dar la opcion de compartit
            this.socialSharing.share(
              this.noticia.title,
              this.noticia.source.name,
              '',
              this.noticia.url
            );

        }
      },
      //Mostrar el objeto asignado en la parte de arriba
      guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {

          console.log('Cancel clicked');

        }
      }]
    });

    await actionSheet.present();

  }

}
