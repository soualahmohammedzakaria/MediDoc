import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'HistoriqueDpi',
  standalone: true, // If this is a standalone component
  imports: [CommonModule], // Add CommonModule to imports
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css',
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
export class HistoriqueComponent {
  isOpen = false;

  // Filter Buttons
  filterButtons = [
    { label: 'Tout', type: 'all' },
    { label: 'Soins', type: 'care' },
    { label: 'Consultations', type: 'consultation' },
  ];
  activeFilter = 'all';

  // Time Buttons
  timeButtons = [
    { label: "Aujourd'hui", type: 'today' },
    { label: 'Semaine', type: 'week' },
    { label: 'Mois', type: 'month' },
    { label: 'Année', type: 'year' },
  ];
  activeTimeFilter = 'year';

  // Medical History Data
  medicalHistory = [
    { id: 1, title: "Admission à l'hôpital", date: '13/09/2023 5:23pm', type: 'care' },
    { id: 2, title: 'Consultation Médicale', date: '13/09/2023 5:23pm', type: 'consultation' },
    { id: 3, title: 'Consultation Médicale', date: '13/09/2023 5:23pm', type: 'consultation' },
    { id: 4, title: 'Soins', date: '13/09/2023 5:23pm', type: 'care' },
    { id: 5, title: "Sortie de l'hôpital", date: '13/09/2023 5:23pm', type: 'care' },
  ];
  filteredHistory = [...this.medicalHistory];

  // Filter Selection
  selectFilter(filterType: string) {
    this.activeFilter = filterType;
    this.filterHistory();
  }

  // Time Filter Selection
  selectTimeFilter(timeType: string) {
    this.activeTimeFilter = timeType;
    // Logic for time filtering can be added here
  }

  // Filter Logic
  filterHistory() {
    if (this.activeFilter === 'all') {
      this.filteredHistory = [...this.medicalHistory];
    } else {
      this.filteredHistory = this.medicalHistory.filter(
        (item) => item.type === this.activeFilter
      );
    }
  }
}
