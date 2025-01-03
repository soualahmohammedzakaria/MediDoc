import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'ResultatExamDpi',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './resultat-exam.component.html',
  styleUrls: ['./resultat-exam.component.css'],
  animations: [
    trigger('toggleContent', [
      state(
        'closed',
        style({
          height: '0',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      transition('closed <=> open', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class ResultatExamComponent {
  title: string = 'Résultats des Examens';
  isOpen: boolean = false;
  isVisible: boolean = false;
  showImagePopup: boolean = false;
  showGraphPopup: boolean = false;
  selectedExam: any = null;

  @Input() prescriptions = [
    {
      id: '00001',
      date: '14 Feb 2019',
      category: 'Analyses Biologiques',
      examType: 'Bilan sanguin',
      results: { url: '', report: 'Rapport Bilan sanguin' },
      status: 'Terminé',
    },
    {
      id: '00002',
      date: '14 Feb 2019',
      category: 'Analyses Biologiques',
      examType: 'Numération Formule Sanguine (NFS)',
      results: '',
      status: 'Pas terminé',
    },
    // Add other prescriptions here...
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = ['Paramètre 1', 'Paramètre 2', 'Paramètre 3'];
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [{ data: [10, 20, 30], label: 'Valeurs' }],
  };
  public barChartType: ChartType = 'bar';

  showPopup(prescription: any) {
    if (prescription.status === 'Pas terminé') {
      this.isVisible = true;
    } else if (prescription.category === 'Examens d’Imagerie Médicale') {
      this.selectedExam = prescription.results;
      this.showImagePopup = true;
    } else {
      this.selectedExam = prescription;
      this.barChartData = {
        labels: [...prescription.results.map((result: any) => result.parametre)],
        datasets: [{ data: [...prescription.results.map((result: any) => result.valeur)], label: "valeurs" }],
      };
      this.showGraphPopup = true;
    }
  }

  closeAllPopups() {
    this.isVisible = false;
    this.showImagePopup = false;
    this.showGraphPopup = false;
  }
}
