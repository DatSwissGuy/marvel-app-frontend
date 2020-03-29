import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './pages/characters/characters.component';
import { CharacterComponent } from './pages/character/character.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {path: '', component: CharactersComponent},
  {path: 'characters', component: CharactersComponent},
  {path: 'character/:id', redirectTo: '/character/:id/comics', pathMatch: 'full'},
  {path: 'character/:id/:tab', component: CharacterComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
