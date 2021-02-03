import { Component } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  //Modificar las propiedades del slide para evitar deslizar
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };


  //Para poder enviar la clase datalocalService al HTML noticias
  constructor( public datalocalService: DataLocalService ) {

  }


}
