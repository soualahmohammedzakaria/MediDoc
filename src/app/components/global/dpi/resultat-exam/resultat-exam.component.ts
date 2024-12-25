import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'ResultatExamDpi',
  standalone: true, // If this is a standalone component
  imports: [CommonModule], // Add CommonModule to imports
  templateUrl: './resultat-exam.component.html',
  styleUrl: './resultat-exam.component.css',
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
  prescriptions = [
    {
      id: '00001',
      date: '14 Feb 2019',
      category: 'Analyses Biologiques',
      examType: 'Bilan sanguin',
      results: 'Voir Résultats',
      status: 'Terminé',
    },
    {
      id: '00002',
      date: '14 Feb 2019',
      category: 'Analyses Biologiques',
      examType: 'Numération Formule Sanguine (NFS)',
      results: 'Voir Résultats',
      status: 'Pas terminé',
    },
    {
      id: '00003',
      date: '14 Feb 2019',
      category: 'Analyses Biologiques',
      examType: 'Bilan Hépatique',
      results: 'Voir Résultats',
      status: 'Terminé',
    },
    {
      id: '00004',
      date: '14 Feb 2019',
      category: 'Examens d’Imagerie Médicale',
      examType: 'Radiographie',
      results: 'Voir Résultats',
      status: 'Terminé',
    },
    {
      id: '00005',
      date: '14 Feb 2019',
      category: 'Examens d’Imagerie Médicale',
      examType: 'Échographie cardiaque',
      results: 'Voir Résultats',
      status: 'Pas terminé',
    },
    {
      id: '00006',
      date: '14 Feb 2019',
      category: 'Analyses Biologiques',
      examType: 'Bilan Lipidique',
      results: 'Voir Résultats',
      status: 'Terminé',
    },
  ];

  timeButtons = [
    { label: "Aujourd'hui", type: 'today' },
    { label: 'Semaine', type: 'week' },
    { label: 'Mois', type: 'month' },
    { label: 'Année', type: 'year' },
  ];
  typeButtons = [
    { label: 'Tout', type: 'all' },
    { label: 'Ridiologique', type: 'radio' },
    { label: 'Biologique', type: 'biolo' },
  ];
  activeTimeFilter = 'year';
  activeTypeFilter = 'all';
  // Time Filter Selection
  selectTimeFilter(timeType: string) {
    this.activeTimeFilter = timeType;
    // Logic for time filtering can be added here
  }
  selectTypeFilter(type: string) {
    this.activeTypeFilter = type;
    // Logic for time filtering can be added here
  }
  isVisible = false;
  showPopup() {
    this.isVisible = true;
    // this.prescription = prescription;
  }
  closeErrorPopup() {
    this.isVisible = false;
  }
}
