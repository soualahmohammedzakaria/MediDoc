import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-radiologue',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // AngularFireModule,
    HttpClientModule,
  ],
  templateUrl: './radiologue.component.html',
})
export class RadiologueComponent implements OnInit {
  data: any;
  http = inject(HttpClient);
  isLoading: boolean = true;

  constructor(private toastr: ToastrService, private router: Router) { }

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
    const apiUrl = `${environment.apiUrl}/bilans/images-radiologiques/all/`;
    this.isLoading = true;
    this.http.get(apiUrl, { headers }).subscribe(
      (data: any) => {
        const transformedData = [
          ...data.map((item: any) => ({
            id: `0000${item.id_image_radiologique}`,
            date: item.date, // Assumes date is already in YYYY-MM-DD format
            category: 'Examens d’Imagerie Médicale',
            nssPatient: item.nss,
            typeExamen: item.type,
            results: {
              url: item.url,
              report: item.compte_rendu,
            },
            status: item.statut === 'terminé' ? 'Terminé' : 'Pas terminé',
          })),
        ];
        this.bilans = transformedData;
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
  showImagePopup: boolean = false;
  showfillPopup: boolean = false;
  selectedExam: any = null;
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
    this.currentBillanModif = bilan.nssPatient;
  }
  showPopup(prescription: any) {
    this.selectedExam = prescription.results;
    this.showImagePopup = true;
  }

  closeAllPopups() {
    this.showImagePopup = false;
    this.showfillPopup = false;
  }
  report: string = '';
  uploading: boolean = false;


  // uploadImage(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const filePath = `radiology/${new Date().getTime()}_${file.name}`;
  //     const fileRef = this.storage.ref(filePath);
  //     const task = this.storage.upload(filePath, file);

  //     this.uploading = true;
  //     task
  //       .snapshotChanges()
  //       .pipe(
  //         finalize(() => {
  //           this.uploading = false;
  //           fileRef.getDownloadURL().subscribe((url) => {
  //             console.log('Uploaded File URL:', url);
  //           });
  //         })
  //       )
  //       .subscribe();
  //   }
  // }

  submitForm() {
    console.log('Report:', this.report);
    alert('Bilan Radiologique soumis avec succès!');
  }
}
