import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-laborantin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BaseChartDirective,
    HttpClientModule,
  ],
  templateUrl: './laborantin.component.html',
})
export class LaborantinComponent implements OnInit {
  data: any;
  http = inject(HttpClient);
  isLoading: boolean = true;
  constructor(private toastr: ToastrService, private router: Router) {
  }
  ngOnInit() {
    const userCookie = this.getUserCookie();
    if (!userCookie) {
      this.router.navigate(['/landingpage']);
      return;
    }
    this.data = userCookie;
    console.log(userCookie);
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${userCookie.access}`,
      'Content-Type': 'application/json',
    });
    const apiUrl = `${environment.apiUrl}/bilans/analyses-biologiques/all/`;
    this.isLoading = true;
    this.http.get(apiUrl, { headers }).subscribe(
      (data: any) => {
        const transformedData = [
          ...data.map((item: any) => ({
            id: `0000${item.id_analyse_biologique}`,
            date: item.date, // Update with actual date if available
            category: 'Analyses Biologiques',
            typeExamen: item.type,
            results: item.parametres,
            nssPatient: item.nss,
            status: item.statut === 'terminé' ? 'Terminé' : 'Pas Terminé',
          })),
        ];
        this.bilans = transformedData;
        console.log('Patient bilans:', this.bilans);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading patient bilans:', error);
        this.toastr.error('Échec du chargement des ordonnances du patient.');
        this.isLoading = false;
      }
    );
  }

  private getUserCookie() {
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find(cookie => cookie.trim().startsWith('user_data='));
    if (userCookie) {
      const userData = userCookie.split('=')[1];
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
    return null;
  }

  title: string = 'Bilans';
  isOpen: boolean = false;
  activeStatus: 'Terminé' | 'Pas Terminé' = 'Terminé';
  showGraphPopup: boolean = false;
  showfillPopup: boolean = false;
  selectedExam: any = null;
  url: string = '';
  uploadedFileName = '';
  bilans = [
    {
      date: '2024-12-27',
      typeExamen: 'IRM',
      nssPatient: '123-45-6789',
      status: 'Terminé'
      , results: {
        url: 'https://www.example.com/irm-image',
        report: 'Rapport IRM'
      }
    },
  ];

  timeButtons = [
    { label: "Aujourd'hui", type: 'today' },
    { label: 'Semaine', type: 'week' },
    { label: 'Mois', type: 'month' },
    { label: 'Tout', type: 'all' }
  ];

  activeTimeFilter = 'all';
  searchQuery = '';

  selectTimeFilter(timeType: string) {
    this.activeTimeFilter = timeType;
  }

  setStatus(status: 'Terminé' | 'Pas Terminé') {
    this.activeStatus = status;
  }

  getFilteredBilans() {
    const now = new Date();
    let startDate: Date | null = null;

    switch (this.activeTimeFilter) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date();
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date();
        startDate.setDate(now.getDate() - 30);
        break;
      case 'all':
      default:
        startDate = null;
        break;
    }
    return this.bilans.filter(bilan => {
      const bilanDate = new Date(bilan.date);
      const matchesTime = startDate ? bilanDate >= startDate : true;
      const matchesStatus = bilan.status === this.activeStatus;
      const matchesSearch = this.searchQuery ? bilan.nssPatient.includes(this.searchQuery) : true;

      return matchesTime && matchesStatus && matchesSearch;
    });
  }

  viewResults(nssPatient: string) {
    console.log(`Viewing results for patient: ${nssPatient}`);
  }
  currentBillanModif: any = null;

  fillBilan(bilan: any) {
    this.showfillPopup = true;
    this.currentBillanModif = bilan;
  }
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
    console.log("prescription", prescription);
    this.selectedExam = prescription;
    this.barChartData = {
      labels: [...prescription.results.map((result: any) => result.parametre)],
      datasets: [{ data: [...prescription.results.map((result: any) => result.valeur)], label: "valeurs" }],
    };
    this.showGraphPopup = true;
  }

  closeAllPopups() {
    this.showGraphPopup = false;
    this.showfillPopup = false;
  }
  report: string = '';
  form: any = {
    iron: null,
    glycemia: null,
    creatinine: null,
    insulin: null,
    cholesterol: null,
    triglycerides: null,
  };
  uploading: boolean = false;
  submitForm() {
    const payload = {
      id_analyse_biologique: this.currentBillanModif.id, // Correct ID for the analysis
      parametres: [
        { parametre: "Fer", valeur: this.form.iron || null },
        { parametre: "Glycémie", valeur: this.form.glycemia || null },
        { parametre: "Créatinine", valeur: this.form.creatinine || null },
        { parametre: "Insuline", valeur: this.form.insulin || null },
        { parametre: "Cholestérol", valeur: this.form.cholesterol || null },
        { parametre: "Triglycérides", valeur: this.form.triglycerides || null },
      ].filter((param) => param.valeur !== null), // Remove any parameters without values
    };
    if (payload.parametres.length === 0) {
      this.toastr.error('Veuillez saisir au moins un paramètre.');
      return;
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.data.access}`,
      'Content-Type': 'application/json',
    });

    const apiUrl = `${environment.apiUrl}/bilans/remplir-analyse-biologique/`;

    this.http.put(apiUrl, payload, { headers }).subscribe(
      (data) => {
        console.log('Analyse Biologique soumise avec succès:', data);
        this.toastr.success('Analyse Biologique soumise avec succès!');
        this.showfillPopup = false;
        this.ngOnInit();
      },
      (error) => {
        console.error('Erreur lors de la soumission:', error);
        this.toastr.error('Échec de la soumission de l\'analyse biologique.');
      }
    );
  }

}