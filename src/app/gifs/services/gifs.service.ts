import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = '7fd8GG6iP9g2GfA15lqdOD2CMDij1OVE';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(): string[] {
    return [ ...this._historial ];
  }

  constructor(
    private _http: HttpClient
  ) {

    // cargamos el historial del localstorage
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];

    // cargamos los resultados del localstorage que obtuvimos en el primer elemento del historial
    if( localStorage.getItem('resultados') ) {
      this.resultados = JSON.parse( localStorage.getItem('resultados')! );
    }
  }

  buscarGifs( query: string = '' ) {

    query = query.trim().toLocaleLowerCase();
    
    if( !this._historial.includes( query ) ) {

      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);

    } else {

      // la busqueda se coloca al primer lugar
      const index = this._historial.indexOf( query );
      this._historial.splice( index, 1 );

      this._historial.unshift( query );
    }

    // guardamos en el LocalStorage el historial
    localStorage.setItem( 'historial', JSON.stringify( this._historial ) );

    const params = new HttpParams()
          .set( 'api_key', this.apiKey )
          .set( 'limit', '10' )
          .set( 'q', query );

    console.log( params.toString() );

    this._http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
      .subscribe( ( resp: SearchGifsResponse ) => {
        this.resultados = resp.data;

        // guardamos en el LocalStorage el resultado
        localStorage.setItem( 'resultados', JSON.stringify( this.resultados ) );
        console.log( this.resultados );
      });

  }

}
