import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'rechercher-patient',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './rechercherpatient.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RechercherPatientComponent {
  @Input() data: any;
  nss: string = ''; // Holds the NSS entered by the user
  loading: boolean = false; // To handle loading state

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  // Method to search for a patient by NSS
  searchByNSS(): void {
    console.log('NSS:', this.nss);
    if (!this.nss) {
      this.toastr.error('Veuillez entrer un NSS valide.', 'Erreur');
      return;
    }

    this.loading = true;

    // API call to fetch patient data
    this.http.get(`https://your-api-url.com/patients/${this.nss}`).subscribe({
      next: (response) => {
        console.log('Patient Data:', response);
        this.toastr.success('Patient trouvé avec succès.', 'Succès');
        this.loading = false;
        // Handle the response (e.g., show patient data in the UI)
      },
      error: (error) => {
        console.error('Error fetching patient data:', error);
        this.toastr.error('Aucun patient trouvé avec ce NSS.', 'Erreur');
        this.loading = false;
      },
    });
  }

  // Method to handle QR code scanning (mocked for now)
  searchByQRCode(qrData: string): void {
    console.log('NSS:', this.nss);
    if (!qrData) {
      this.toastr.error('Aucun QR code détecté.', 'Erreur');
      return;
    }

    this.nss = qrData; // Assuming the QR code contains the NSS
    this.searchByNSS(); // Reuse the NSS search logic
  }
}