import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Tab5Component } from '../tab5/tab5.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
// import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: Tab1Page },
      { path: 'tab5', component: Tab5Component },
    ])
  ],
  declarations: [Tab1Page, Tab5Component],
  providers: [SocialSharing]
})
export class Tab1PageModule { }
