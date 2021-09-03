import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario : FormGroup = this.fb.group({
    region : ['',Validators.required]
  })


  //llenar selectores
  regiones : string [] = [];

  constructor(private fb : FormBuilder,
              private paiseservices : PaisService) { }

  ngOnInit(): void {
    this.regiones = this.paiseservices.regiones;
  }


  guardar(){
    console.log(this.miFormulario.value);
  }
}
