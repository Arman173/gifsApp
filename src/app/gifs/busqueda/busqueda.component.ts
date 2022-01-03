import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(
    private _gifsService: GifsService
  ) {}

  buscar() {

    const valor = this.txtBuscar.nativeElement.value;

    // si no hay nada escrito, no se agregara el valor
    if ( valor.trim().length === 0 ) return;
    
    this._gifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = '';
  }

}
