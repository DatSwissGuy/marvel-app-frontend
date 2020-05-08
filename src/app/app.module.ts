import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpsInterceptor } from './http-interceptors/https.interceptor';
import { MarvelApiInterceptor } from './http-interceptors/marvel-api.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HighlightPipe } from './shared/pipes/highlight.pipe';
import { CharacterComponent } from './pages/character/character.component';
import { ComicCardComponent } from './components/comic-card/comic-card.component';
import { ComicListComponent } from './components/comic-list/comic-list.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { MarvelEffects } from './effects/marvel.effects';
import { LoaderInterceptor } from './http-interceptors/loader.interceptor';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CharacterNavComponent } from './components/character-nav/character-nav.component';
import { ComicSeriesListComponent } from './components/comic-series-list/comic-series-list.component';
import { ComicStoriesListComponent } from './components/comic-stories-list/comic-stories-list.component';
import { ComicEventsListComponent } from './components/comic-events-list/comic-events-list.component';
import { ComicsContainerComponent } from './pages/comics-container/comics-container.component';
import { SeriesContainerComponent } from './pages/series-container/series-container.component';
import { StoriesContainerComponent } from './pages/stories-container/stories-container.component';
import { EventsContainerComponent } from './pages/events-container/events-container.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { HeaderLoginComponent } from './components/header-login/header-login.component';
import { LoginComponent } from './components/login/login.component';
import { AuthEffects } from './effects/auth.effects';
import { AuthApiInterceptor } from './http-interceptors/auth-api.interceptor';
import { RatingEffects } from './effects/rating.effects';
import { RatingComponent } from './components/rating/rating.component';
import { UserEffects } from './effects/user.effects';
import { BackendApiInterceptor } from './http-interceptors/backend-api.interceptor';
import { CountUpModule } from 'ngx-countup';
// IPA 2020
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserProfileNavComponent } from './components/user-profile-nav/user-profile-nav.component';
import { FavoritesContainerComponent } from './pages/favorites-container/favorites-container.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { TabTwoContainerComponent } from './pages/tab-two-container/tab-two-container.component';
import { TabTwoListComponent } from './components/tab-two-list/tab-two-list.component';
import { FavoriteCardComponent } from './components/favorite-card/favorite-card.component';
import { FavoriteEffects } from './effects/favorite.effects';
import { FavoriteComponent } from './components/favorite/favorite.component';

// IPA 2020

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    CharacterListComponent,
    CharactersComponent,
    CharacterCardComponent,
    PaginationComponent,
    HighlightPipe,
    CharacterComponent,
    ComicCardComponent,
    ComicListComponent,
    LoadingSpinnerComponent,
    CharacterNavComponent,
    ComicSeriesListComponent,
    ComicStoriesListComponent,
    ComicEventsListComponent,
    ComicsContainerComponent,
    SeriesContainerComponent,
    StoriesContainerComponent,
    EventsContainerComponent,
    CharacterDetailComponent,
    HeaderLoginComponent,
    LoginComponent,
    RatingComponent,
    UserProfileComponent,
    UserDetailComponent,
    UserProfileNavComponent,
    FavoritesContainerComponent,
    FavoriteListComponent,
    TabTwoContainerComponent,
    TabTwoListComponent,
    FavoriteCardComponent,
    FavoriteComponent
  ],
  entryComponents: [
    CharactersComponent,
    ComicsContainerComponent,
    SeriesContainerComponent,
    StoriesContainerComponent,
    EventsContainerComponent,
    FavoritesContainerComponent,
    TabTwoContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CountUpModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([MarvelEffects, AuthEffects, RatingEffects, UserEffects, FavoriteEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: MarvelApiInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendApiInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthApiInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})

export class AppModule {
}
