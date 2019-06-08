import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: 'chat',
    component: Tab3Page,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: './home/home.module#HomePageModule',
          }
        ],
      },
      {
        path: 'chat/:id',
        loadChildren: './chat/chat.module#ChatPageModule',
      },
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: './login/login.module#LoginPageModule'
          }
        ]
      },
      {
        path: 'users-list',
        children: [
          {
            path: '',
            loadChildren: './users-list/users-list.module#UsersListPageModule'
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: './settings/settings.module#SettingsPageModule'
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'chat/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class Tab3RoutingModule { }
