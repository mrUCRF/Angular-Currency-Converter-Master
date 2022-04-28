import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConverterComponent } from './converter/converter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConverterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent, ConverterComponent]
})
export class AppModule { }
