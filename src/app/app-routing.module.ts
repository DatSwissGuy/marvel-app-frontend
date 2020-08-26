import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './pages/characters/characters.component';
import { CharacterComponent } from './pages/character/character.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';


const routes: Routes = [
  {path: '', component: CharactersComponent},
  {path: 'characters', component: CharactersComponent},
  {path: 'character/:id', redirectTo: '/character/:id/comics', pathMatch: 'full'},
  {path: 'character/:id/:tab', component: CharacterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', redirectTo: '/profile/favorites', pathMatch: 'full'},
  {path: 'profile/:tab', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
