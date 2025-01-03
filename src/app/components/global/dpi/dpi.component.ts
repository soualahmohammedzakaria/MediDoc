import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class DpiComponent implements OnInit {
  isPopupVisible: boolean = false;


  showPopup() {
    this.isPopupVisible = true;
    console.log('showPopup triggered:', this.isPopupVisible);
  }

  hidePopup() {
    this.isPopupVisible = false;
    console.log('hidePopup triggered:', this.isPopupVisible);
  }
  @Input() patientData: any = {};
  @Input() qrCodeValue: string = '1234567890';
  @Input() HistoriqueMedical: any;
  @Input() prescriptions: any = [];
  @Input() bilans: any = [];
  ngOnInit() {
    console.log('DPI component initialized:', this.HistoriqueMedical);
  }
}
