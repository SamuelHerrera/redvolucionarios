import { Injectable, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tab3PageModule } from '../tab3.module';

@Injectable()
export class ModalService {

  constructor(
    private modalController: ModalController
  ) { }

  async presentModal(ModalPage, params) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: params
    });
    return await modal.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
