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
    pais   : ['',Validators.required],
    frontera   : ['',Validators.required],
  })


  //llenar selectores
  regiones : string  [] = [];
  paises : PaisSmall[] =[];
  fronteras : string [] = [];

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

    //Cuando cambie la region
    this.miFormulario.get('region')?.valueChanges
        .pipe(
          tap((_) =>{
            //Esto es para resetear el segundo select   
            this.miFormulario.get('pais')?.reset('');
          }),
          switchMap(region =>this.paiseservices.getPaisesPorRegion(region))
        )        
        .subscribe(paises => {
          //console.log(paises);
           this.paises = paises;
        })


    //Cuando cambia el pais
    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      tap(()=>{
        this.fronteras = [];
        this.miFormulario.get('frontera')?.reset('');
      }),
      switchMap(ccodigo => this.paiseservices.getPaisesPorCodigo(ccodigo))
    )
    .subscribe(pais => {
      //Con esto hace que se llene el campo de frontera
      console.log(pais?.borders);
      this.fronteras = pais?.borders || [];
    })

  }


  guardar(){
    console.log(this.miFormulario.value);
  }
}
