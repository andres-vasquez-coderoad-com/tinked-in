import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';

import {Tab1PageRoutingModule} from './tab1-routing.module';
import {TinderUiComponent} from '../components/tinder-ui/tinder-ui.component';
import {HammerModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HammerModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page, TinderUiComponent]
})
export class Tab1PageModule {
}
