import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthGuard } from './auth/is-auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'moya-web'},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'moya-web', loadChildren: () => import('./moya-web/moya-web.module').then(m => m.MoyaWebModule), canLoad: [IsAuthGuard]},
  {path: '**', redirectTo: 'moya-web'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 