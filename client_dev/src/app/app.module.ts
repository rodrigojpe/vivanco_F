import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// components
import { AppComponent } from './app.component';
// routues
import {APP_ROUTING} from './app.routes';
import { HomeComponent } from './components/home/home.component';

import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// facebook import
import {AdminModule} from './admin/admin.module';
import { FacebookModule } from 'ngx-facebook';
import { WeComponent } from './components/we/we.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit';
import { MoviesComponent } from './components/videos/movies.component';
import { ManagerComponent } from './components/manager/manager.component';
import {PlayerComponent} from './components/player/player.component';

import {ListSongComponent} from './components/listSong/listSongs.component';





// service
import { MyserviceService } from './myservice.service';
import { ArtistService } from './services/artist.service';
import { UploadService } from './services/upload.service';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { ContactService } from './services/contact.service';

import { CompareValidatorDirective } from './shared2/compare-validator.directive';
import { FotosComponent } from './components/fotos/fotos.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ManagerComponent,
    WeComponent,
    ContactoComponent,
    LoginComponent,
    RegisterComponent,
    UserEditComponent,
    MoviesComponent,
    PlayerComponent,
    ListSongComponent,
    CompareValidatorDirective,
    FotosComponent
  ],
  imports: [
    BrowserModule,
    FacebookModule.forRoot(),
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    YoutubePlayerModule
  ],
  providers: [
    MyserviceService,
    ArtistService,
    UploadService,
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
