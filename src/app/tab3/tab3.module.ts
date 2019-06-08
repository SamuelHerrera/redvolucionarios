import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3RoutingModule } from './tab3.router.module';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './shared/auth.guard';
import { UsersListPage } from './shared/users-list/users-list.page';
import { ModalService } from './services/modal.service';
import { UidService } from './services/uid.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab3RoutingModule,
    SharedModule
  ],
  providers: [
    AuthGuard,
    ModalService,
    UidService
  ],
  declarations: [Tab3Page],
  entryComponents: [UsersListPage]
})

export class Tab3PageModule { }
