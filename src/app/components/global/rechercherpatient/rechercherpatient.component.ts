import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

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
  nss: string = '';

  @ViewChild('nssInput') nssInputRef!: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}

  ngAfterViewInit(): void {
    this.setFocus();
  }

  // Method to ensure input remains focused
  setFocus(): void {
    setTimeout(() => {
      if (this.nssInputRef && this.nssInputRef.nativeElement) {
        this.nssInputRef.nativeElement.focus();
      }
    });
  }

  searchByNSS(): void {
    if (!this.nss) {
      this.toastr.error('Veuillez entrer un NSS valide', 'NSS invalide!');
      return;
    }

    this.http.get(`${environment.apiUrl}/dpi/rechercher/${this.nss}/`, {
      headers: {
        Authorization: `Bearer ${this.data.access}`,
      }
    }).subscribe(
      (res: any) => {
        if (this.data.user.role === 'infirmier') {
          this.router.navigate(['/infirmier/soins'], { queryParams: { data: btoa(JSON.stringify({ nom: this.data.user.nom, access: this.data.access, patient_nss: this.nss, patient_nom: (res.nom || "Nom du patient")})) } });
        } else if (this.data.user.role === 'medecin') {
          this.router.navigate(['/medecin'], { queryParams: { data: btoa(JSON.stringify({ nom: this.data.user.nom, access: this.data.access, specialite: this.data.user.specialite, patient_nss: this.nss, patient_nom: (res.nom || "Nom du patient")})) } });
        }
        this.toastr.success(
          'Le dossier du patient a été trouvé avec succès',
          'Dossier trouvé!'
        );
      },
      (error) => {
        if (error.status === 404) {
          this.toastr.error(
            'Un patient avec ce NSS n\'a pas été trouvé',
            'NSS non trouvé!'
          );
        } else {
          console.log(error);
          this.toastr.error(
            'Désole, une erreur s\'est produite',
            'Erreur!'
          );
        }
      }
    );
  }
}