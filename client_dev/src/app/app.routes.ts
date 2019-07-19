import {RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '../app/components/home/home.component';
import {NavbarComponent} from '../app/components/shared/navbar/navbar.component';
import {WeComponent} from '../app/components/we/we.component';
import {ContactoComponent} from '../app/components/contacto/contacto.component';
import {LoginComponent} from '../app/components/login/login.component';
import {RegisterComponent} from '../app/components/register/register.component';
import {UserEditComponent} from '../app/components/user-edit/user-edit';
import { MoviesComponent } from './components/videos/movies.component';
import {ListSongComponent} from './components/listSong/listSongs.component';
import { ManagerComponent } from './components/manager/manager.component';
import { FotosComponent } from './components/fotos/fotos.component';




const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'we', component: WeComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mis-datos', component: UserEditComponent},
  { path: 'movies', component: MoviesComponent},
  { path: 'fotos', component: FotosComponent},
  { path: 'songs/:id', component: ListSongComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
