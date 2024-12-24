import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InfoComponent } from './info/info.component';
import { HistoriqueComponent } from './historique/historique.component';
import { OrdannanceComponent } from './ordannance/ordannance.component';
import { ResultatExamComponent } from './resultat-exam/resultat-exam.component';
import { DocAdminComponent } from './doc-admin/doc-admin.component';

@Component({
  selector: 'dpi',
  standalone: true,
  imports: [
    CommonModule,
    InfoComponent,
    HistoriqueComponent,
    OrdannanceComponent,
    ResultatExamComponent,
    DocAdminComponent
  ],
  templateUrl: './dpi.component.html',
})
export class DpiComponent {

}
