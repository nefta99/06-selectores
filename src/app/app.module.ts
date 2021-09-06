import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; //Esto es para leer lo servicios https o http

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaisesModule } from './paises/paises.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
    //PaisesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
