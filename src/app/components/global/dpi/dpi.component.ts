import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InfoComponent } from './info/info.component';
import { HistoriqueComponent } from './historique/historique.component';
import { OrdannanceComponent } from './ordannance/ordannance.component';

@Component({
  selector: 'dpi',
  standalone: true,
  imports: [
    CommonModule,
    InfoComponent,
    HistoriqueComponent,
    OrdannanceComponent
  ],
  templateUrl: './dpi.component.html',
})
export class DpiComponent {

}
