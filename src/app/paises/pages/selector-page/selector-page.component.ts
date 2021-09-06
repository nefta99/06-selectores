import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisSmall } from '../../interfaces/paises.interfaces';
import { PaisService } from '../../services/pais.service';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario : FormGroup = this.fb.group({
    region : ['',Validators.required],
    pais : ['',Validators.required],
  })


  //llenar selectores
  regiones : string [] = [];
  paises : PaisSmall [] =[];

  constructor(private fb : FormBuilder,
              private paiseservices : PaisService) { }

  ngOnInit(): void {
    this.regiones = this.paiseservices.regiones;

    //Cuando cambie la region

    // this.miFormulario.get('region')?.valueChanges
    //   .subscribe(region => {
    //     console.log(region);
    //     this.paiseservices.getPaisesPorRegion(region)
    //         .subscribe(paises =>{
    //             console.log(paises);
    //             this.paises = paises;
    //         })
    //   })

    this.miFormulario.get('region')?.valueChanges
        .pipe(
          tap(( _ ) =>{
            //Esto es para resetear el segundo select
            this.miFormulario.get('pais')?.reset('');
          }),
          switchMap(region =>this.paiseservices.getPaisesPorRegion(region))
        )        
        .subscribe(paises => {
           this.paises = paises;
        })

  }


  guardar(){
    console.log(this.miFormulario.value);
  }
}
