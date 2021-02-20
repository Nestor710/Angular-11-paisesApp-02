import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from "rxjs/operators";
import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Pais;

  constructor( private activaredRoute:ActivatedRoute,
                private _pS:PaisService ) {
}

  ngOnInit(): void {
    // con el operador switchMap de Rxjs
    this.activaredRoute.params
    .pipe( 
      switchMap( ({ id }) => this._pS.getPaisPorCodigo( id ) ),
      tap( console.log )
     )
     .subscribe( resp => this.pais = resp );


      // Sin el SwitchMap del operador Rxjs
/*     this.activaredRoute.params
    .subscribe( ({ id }) => {
      console.log( id );
      this._pS.getPaisPorCodigo( id )
      .subscribe( pais =>{
        console.log(pais);
        
      } )
    } ) */

  }


}
