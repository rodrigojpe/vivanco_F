import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AdminRouterModule} from './admin.routing.module';
//components

import { MainComponent} from './components/main/main.component';
import { AddSongComponent} from './components/addSong/addSong.component';
import { EditAlbumComponent} from './components/editAlbum/editAlbum.component';
import { ListComponent} from './components/list/list.component';
import { ListArtisComponent} from './components/listArtis/listArtis.component';
import { AddAlbumComponent } from './components/addAlbum/addAlbum.component';
import { ArtistAddComponent} from './components/artisAdd/addArtist.component';
import { ArtistEditComponent} from './components/editArtis/editArtis.component';
import { ArtistDetailsComponent } from './components/detailsArtis/detailsArtis.component';
import { AlbumDetailsComponent } from './components/albumDetails/albumDetails.component';

//songs
import { EditSongComponent } from './components/songEdit/songEdit.component';





import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Services
import { AdminGuard } from '../services/admin.guard';
import { UserService } from '../services/user.service';
import { AlbumService } from '../services/album.service';
import { ArtistService } from '../services/artist.service';
import { UploadService } from '../services/upload.service';


//Pipes
// import { SearchPipe } from './pipes/search.pipe';

@NgModule({

  declarations : [
    MainComponent,
    AddSongComponent,
    EditAlbumComponent,
    ListComponent,
    ListArtisComponent,
    AddAlbumComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailsComponent,
    AlbumDetailsComponent,
    EditSongComponent
  ],
  imports : [
    CommonModule,
    FormsModule,
    HttpModule,
    AdminRouterModule,
    BrowserAnimationsModule
  ],
  exports:[
    MainComponent,
    AddSongComponent,
    EditAlbumComponent,
    ListComponent,
    ListArtisComponent,
    AddAlbumComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    AlbumDetailsComponent,
    EditSongComponent
  ],
  providers:[
    AdminGuard,
    UserService,
    AlbumService,
    ArtistService,
    UploadService
  ]
})

export class AdminModule {}
