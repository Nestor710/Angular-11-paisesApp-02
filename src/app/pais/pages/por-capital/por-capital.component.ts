import { Component, OnInit, Output, Input } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {

  paises:Pais[] = [];
  termino:string = '';
  hayError:boolean = false;
  paisesSugeridos:Pais[] = [];

  constructor( private _pS:PaisService ) { }

  ngOnInit(): void {
  }

  buscar( termino:string ){
    this.hayError = false;
    this.termino = termino;
    this._pS.buscarCapital( this.termino )
            .subscribe( data => {
              console.log( data );
              this.paises = data;
            }, (err) =>{
              this.hayError = true
            } )
  }

  sugerencias( termino:string ){
    this.hayError = false;

    this._pS.buscarPais( termino )
            .subscribe( paises =>  this.paisesSugeridos = paises.slice( 0,5 ),
            (err) => this.paisesSugeridos = [] );
  }

}
