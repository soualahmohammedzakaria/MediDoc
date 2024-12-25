import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InfoComponent } from './info/info.component';
import { HistoriqueComponent } from './historique/historique.component';
import { OrdannanceComponent } from './ordannance/ordannance.component';
import { ResultatExamComponent } from './resultat-exam/resultat-exam.component';
import { DocAdminComponent } from './doc-admin/doc-admin.component';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'dpi',
  imports: [
    CommonModule,
    InfoComponent,
    HistoriqueComponent,
    OrdannanceComponent,
    ResultatExamComponent,
    DocAdminComponent,
    QRCodeComponent
  ],
  templateUrl: './dpi.component.html',
})
export class DpiComponent {
  isPopupVisible: boolean = false;
  qrCodeValue: string = '1234567890';

  showPopup() {
    this.isPopupVisible = true;
    console.log('showPopup triggered:', this.isPopupVisible);
  }

  hidePopup() {
    this.isPopupVisible = false;
    console.log('hidePopup triggered:', this.isPopupVisible);
  }
}
