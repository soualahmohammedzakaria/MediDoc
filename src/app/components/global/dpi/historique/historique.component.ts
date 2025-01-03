import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
    { label: 'Tous', type: 'year' },
  ];
  activeTimeFilter = 'year';

  // Medical History Data
  @Input() medicalHistory: any = [];
  @Input() filteredHistory: any = [];
  // Filter Selection
  selectFilter(filterType: string) {
    this.activeFilter = filterType;
    this.filterHistory();
  }

  // Time Filter Selection
  selectTimeFilter(timeType: string) {
    this.activeTimeFilter = timeType;
    this.filterHistory();
  }

  // Filter Logic
  filterHistory() {
    let filteredByType = this.activeFilter === 'all' ? [...this.medicalHistory] : this.medicalHistory.filter(
      (item: any) => item.type === this.activeFilter
    );
    console.log(filteredByType)
    const now = new Date();
    let filteredByTime = filteredByType.filter((item: any) => {
      const itemDate = new Date(item.date);
      console.log('Item Date:', itemDate);
      switch (this.activeTimeFilter) {
        case 'today':
          return itemDate.toDateString() === now.toDateString();
        case 'week':
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return itemDate >= oneWeekAgo && itemDate <= now;
        case 'month':
          const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return itemDate >= oneMonthAgo && itemDate <= now;
        default:
          return true;
      }
    });
    this.filteredHistory = filteredByTime;
  }

  isPopupVisible = false; // Toggle for showing/hiding the popup

  // Data object for the popup
  consultation = {
    title: 'Consultation Médicale',
    date: '13/09/2023 5:23pm',
    tools: 'Stéthoscope, Tensiomètre, Thermomètre.',
    tests: 'Analyse sanguine - Glycémie, Cholestérol',
    prescription: 'Ord_id_here',
    summary: `Douleurs ervention:\n• Examens initiaux (prise de sang, échographie)\n• Chirurgie de l’appendice (appendicectomie)\n\nAppendicite confirmée, intervention chirurgicale réussie. Le patient récupère normalement.\n\nLe patient a été libéré avec une ordonnance d’antalgiques et une recommandation de repos à domicile.`,
    medecin: ""
  };
  showPopup(id: number) {
    // check the type the id is for the consultation or care
    let historyItem = this.medicalHistory.find((item: any) => item.id === id);
    let type = historyItem ? historyItem.type : null;
    if (type === 'consultation') {
      console.log('Consultation', historyItem);
      this.consultation = historyItem;
      this.isPopupVisible = true;
    } else if (type === 'care') {
      console.log('Soins', historyItem);
      this.soinsData = historyItem;
      this.soinsPopupVisible = true;
    }
    // Logic to fetch data for the popup can be added here
  }
  // Close the popup
  closePopup() {
    this.isPopupVisible = false;
  }

  // Prevent click propagation to the backdrop
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  soinsPopupVisible = false; // Toggle for showing/hiding the soins popup
  closeSoinsPopup() {
    this.soinsPopupVisible = false;
  }
  soinsData = {
    title: 'Soins',
    date: '13/09/2023 5:23pm',
    administrationMedicaments: 'Stéthoscope, Tensiomètre, Thermomètre.',
    soinsInfirmiers: 'Analyse sanguine - Glycémie, Cholestérol',
    personnelMedical: {
      doctor: 'Dr. Pierre Martin (Chirurgien)',
      nurse: 'Infirmière Sophie Laurent'
    },
    observations: 'Douleurs abdominales aiguës, suspicion d\'appendicite',
    traitement: [
      'Examens initiaux (prise de sang, échographie)',
      'Chirurgie de l\'appendice (appendicectomie)'
    ],
    conclusion: 'Appendicite confirmée, intervention chirurgicale réussie. Le patient récupère normalement.',
    liberation: 'Le patient a été libéré avec une ordonnance d\'antalgiques et une recommandation de repos à domicile....',
    nurse: ""
  };

}

