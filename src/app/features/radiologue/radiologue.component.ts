import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-radiologue',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './radiologue.component.html',
})
export class RadiologueComponent implements OnInit {
  data: any;
  http = inject(HttpClient);
  isLoading: boolean = true;
  storage = inject(Storage);
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
  showImagePopup: boolean = false;
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

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `radiology/${new Date().getTime()}_${file.name}`;
      const storageRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
      this.uploadedFileName = file.name;
      console.log(this.uploadedFileName)
      this.uploading = true;
      uploadTask.on('state_changed',
        (snapshot) => {
          // You can handle progress here if needed
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Upload failed:', error);
          // Handle error appropriately
        },
        () => {
          this.uploading = false;
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.url = downloadURL;
            console.log('File available at', downloadURL, this.url);
            this.uploading = false;
            // Handle successful upload, e.g., save URL to your backend
          });
        }
      );
    }
  }
  submitForm() {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.data.access}`,
      'Content-Type': 'application/json',
    });
    const apiUrl = `${environment.apiUrl}/bilans/remplir-image-radiologique/`;
    this.http.put(apiUrl, {
      id_image_radiologique: this.currentBillanModif.id,
      url: this.url,
      compte_rendu: this.report,
    }, { headers }).subscribe(
      (data: any) => {
        console.log('Bilan Radiologique soumis avec succès:', data);
        this.toastr.success('Bilan Radiologique soumis avec succès!');
        this.showfillPopup = false;
        this.ngOnInit();
      },
      (error) => {
        console.error('Error submitting Radiology report:', error);
        this.toastr.error('Échec de la soumission du Bilan Radiologique.');
      }
    );
  }
}
