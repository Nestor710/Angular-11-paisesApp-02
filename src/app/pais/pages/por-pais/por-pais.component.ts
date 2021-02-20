import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  `
  li {
    cursor: pointer;
  }
  `
  ]
})
export class PorPaisComponent {

  termino:string = '';
  hayError: boolean = false;
  paises:Pais[] = [];
  paisesSugeridos:Pais[] = [];

  constructor( private _pS: PaisService ) { }

  buscar( termino:string ){
    this.hayError = false;
    this.termino = termino
    this._pS.buscarPais( this.termino )
              .subscribe( data => {
                this.paises = data
                console.log(data);
              }, (err) =>{
                this.hayError = true;
                this.paises = [];
              } )

    console.log(this.termino);
    
  }

  sugerencias( termino:string ){
    this.hayError = false;

    this._pS.buscarPais( termino )
            .subscribe( paises =>  this.paisesSugeridos = paises.slice( 0,5 ),
            (err) => this.paisesSugeridos = [] );
  }

}
