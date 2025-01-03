import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'OrdannanceDpi',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ordannance.component.html',
  styleUrls: ['./ordannance.component.css'],
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
  isVisible: boolean = false;
  activeTimeFilter: string = 'all';
  idFilter: string = '';
  @Input() filteredHistory: any;
  @Input() prescriptions = [
    {
      id_ordonnance: '100',
      date: '14 Feb 2019',
      nom_medecin: 'Darrell Caldwell',
      status: 'valide',
      medicaments: [
        {
          nom: 'Ibuprofen',
          dose: '200mg',
          frequence: '1',
          duree: '1 week',
        },
      ],
    },
  ];
  prescription = {
    id_ordonnance: '00001',
    date: '14 Feb 2019',
    nom_medecin: 'Darrell Caldwell',
    status: 'valide',
    medicaments: [
      {
        nom: 'Ibuprofen',
        dose: '200mg',
        frequence: '1',
        duree: '1 week',
      },
    ],
  };
  timeButtons = [
    { label: "Aujourd'hui", type: 'today' },
    { label: 'Semaine', type: 'week' },
    { label: 'Mois', type: 'month' },
    { label: 'Tous', type: 'all' },
  ];

  // Time Filter Selection
  selectTimeFilter(timeType: string) {
    this.activeTimeFilter = timeType;
    this.filterPrescriptions();
  }

  // Filtering Logic
  filterPrescriptions() {
    // Step 1: Filter by time
    const now = new Date();
    const filteredByTime = this.prescriptions.filter((prescription) => {
      const prescriptionDate = new Date(prescription.date);
      switch (this.activeTimeFilter) {
        case 'today':
          return prescriptionDate.toDateString() === now.toDateString();
        case 'week':
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return prescriptionDate >= oneWeekAgo && prescriptionDate <= now;
        case 'month':
          const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return prescriptionDate >= oneMonthAgo && prescriptionDate <= now;
        default:
          return true;
      }
    });

    // Step 2: Filter by ID (partial match)
    const filteredById = this.idFilter.trim()
      ? filteredByTime.filter((prescription) =>
        prescription.id_ordonnance.toString().includes(this.idFilter.trim())
      )
      : filteredByTime;

    this.filteredHistory = filteredById;
    console.log('Filtered Prescriptions:', this.filteredHistory);
  }

  // Show Popup
  showPopup(id: string) {
    const foundPrescription = this.prescriptions.find(
      (prescription) => prescription.id_ordonnance === id
    );
    if (foundPrescription) {
      this.prescription = { ...foundPrescription };
    }
    this.isVisible = true;
  }

  // Toggle Popup Visibility
  togglePopup() {
    this.isVisible = false;
  }
}
