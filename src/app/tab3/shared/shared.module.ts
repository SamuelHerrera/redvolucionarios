import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { RelativeTime } from '../pipes/relative-time';
import { ChatTime } from '../pipes/chat-time';
import { UsersListPage } from './users-list/users-list.page';

@NgModule({
  declarations: [
    RelativeTime,
    ChatTime, UsersListPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    RelativeTime,
    ChatTime, UsersListPage],
  entryComponents: [UsersListPage]
})
export class SharedModule { }
