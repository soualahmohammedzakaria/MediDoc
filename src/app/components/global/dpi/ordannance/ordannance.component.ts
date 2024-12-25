import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'OrdannanceDpi',
  standalone: true, // If this is a standalone component
  imports: [CommonModule],
  templateUrl: './ordannance.component.html',
  styleUrl: './ordannance.component.css',
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
export class OrdannanceComponent {
  title: string = 'Ordonnances';
  isOpen: boolean = false;
  prescriptions = [
    {
      id: '00001',
      date: '14 Feb 2019',
      doctor: 'Darrell Caldwell',
      status: 'Valider',
    },
    {
      id: '00002',
      date: '14 Feb 2019',
      doctor: 'Darrell Caldwell',
      status: 'Non Valider',
    },
    {
      id: '00003',
      date: '14 Feb 2019',
      doctor: 'Darrell Caldwell',
      status: 'Non Valider',
    },
    {
      id: '00004',
      date: '14 Feb 2019',
      doctor: 'Darrell Caldwell',
      status: 'Valider',
    },
    {
      id: '00005',
      date: '14 Feb 2019',
      doctor: 'Darrell Caldwell',
      status: 'Non Valider',
    },
    {
      id: '00006',
      date: '14 Feb 2019',
      doctor: 'Darrell Caldwell',
      status: 'Non Valider',
    },
  ];
  timeButtons = [
    { label: "Aujourd'hui", type: 'today' },
    { label: 'Semaine', type: 'week' },
    { label: 'Mois', type: 'month' },
    { label: 'Année', type: 'year' },
  ];
  activeTimeFilter = 'year';
  // Time Filter Selection
  selectTimeFilter(timeType: string) {
    this.activeTimeFilter = timeType;
    // Logic for time filtering can be added here
  }
  isVisible = false;

  prescription = {
    id: '00003',
    date: '13/09/2023',
    medicines: [
      {
        name: 'Paracétamol',
        dosage: '500 mg',
        duration: '5 jours',
        frequency: '3 fois/jour',
        instructions: 'À prendre après les repas',
      },
      {
        name: 'Ibuprofène',
        dosage: '200 mg',
        duration: '5 jours',
        frequency: '3 fois/jour',
        instructions: 'Ne pas dépasser 3 fois par jour',
      },
      // Add more medicines as needed
    ],
  };
  showPopup(id: string) {
    // get the data of the prescription from teh backend 
    this.isVisible = true;
    // this.prescription = this.prescription
  }
  // Open/Close Popup
  togglePopup() {
    this.isVisible = false;
  }
}
