// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        MenuComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]) // Puedes añadir rutas aquí si las necesitas
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
