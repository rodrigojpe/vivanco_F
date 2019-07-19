import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import { MainComponent } from './components/main/main.component';
import { AddSongComponent } from './components/addSong/addSong.component';
import { EditAlbumComponent } from './components/editAlbum/editAlbum.component';
import { ListComponent } from './components/list/list.component';
import { ListArtisComponent } from './components/listArtis/listArtis.component';
import { AddAlbumComponent } from './components/addAlbum/addAlbum.component';
import { ArtistAddComponent} from './components/artisAdd/addArtist.component';
import { ArtistEditComponent } from './components/editArtis/editArtis.component';
import { ArtistDetailsComponent } from './components/detailsArtis/detailsArtis.component';
import { AlbumDetailsComponent } from './components/albumDetails/albumDetails.component';



//songs
import { EditSongComponent } from './components/songEdit/songEdit.component';



//import guard de seguridad
 import { AdminGuard } from '../services/admin.guard';

const adminRouters : Routes = [
  {
  path : 'admin-panel',
  component : MainComponent,
  canActivate :[AdminGuard],
  children: [
    {path : '', redirectTo: 'listado', pathMatch:'full'},
    {path : 'listado', component: ListComponent},
    {path : 'list-artist/:page', component: ListArtisComponent},
    {path :  'artist-add', component: ArtistAddComponent },
    {path :  'artist-edit/:id', component: ArtistEditComponent },
    {path : 'editar-album/:id', component: EditAlbumComponent},
    {path : 'songs/:album', component: AddSongComponent},
    {path : 'artist/:id', component: ArtistDetailsComponent},
    {path : 'album/:id', component: AlbumDetailsComponent},
    {path : 'crear-album/:artist', component: AddAlbumComponent},
    {path : 'song-edit/:id', component: EditSongComponent}

        ]
      },
      {path: 'listado-del-panel', component:ListComponent}
];
@NgModule({
  imports:[
    RouterModule.forChild(adminRouters)
  ],
  exports:[
    RouterModule
  ]
})

export class AdminRouterModule { }
