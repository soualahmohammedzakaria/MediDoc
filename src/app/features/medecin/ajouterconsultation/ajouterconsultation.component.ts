import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-ajouterconsultation',
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './ajouterconsultation.component.html',
})
export class AjouterConsultationComponent implements OnInit {
  data: any;
  medicaments: any;
  patient: any;
  resume: string = '';
  isModalVisible = false;
  isOrdonnanceModalVisible = false; // For ordonnance modal
  modalTitle = '';
  selectOptions: string[] = [];
  typeBio = '';
  typeRadio = '';
  diagnostic = 'b';
  ordonnance: { nom: string; dose: string; duree: string }[] = []; // Ordonnance data
  newOrdonnance = { nom: '', dose: '', duree: '' }; // For form inputs

  http = inject(HttpClient);
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.patient = params['data'] ? JSON.parse(atob(params['data'])) : null;
      if (!this.patient) {
        this.router.navigate(['/landingpage']);
      }
    });
    const userCookie = this.getUserCookie();
    if (!userCookie || !userCookie.access) {
      this.router.navigate(['/landingpage']);
      return;
    }
    this.data = userCookie;

    this.http.get(`${environment.sgphUrl}/medicaments`).subscribe(
      (res: any) => {
        this.medicaments = res;
      },
      (error) => {
        this.router.navigate(['/landingpage']);
        this.toastr.error("Désole, une erreur s'est produite", 'Erreur!');
      }
    );
  }

  submit() {
    if (this.diagnostic === 'b') {
      const formData = {
        resume: this.resume,
        dpi: this.patient.nss,
        analyses_biologiques: this.typeBio ? [{ type: this.typeBio }] : [],
        images_radiologiques: this.typeRadio ? [{ type: this.typeRadio }] : [],
      };
      this.http
        .post(
          `${environment.apiUrl}/consultations/creerConsultationAvecBilan/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.data.access}`,
            },
          }
        )
        .subscribe(
          (res: any) => {
            this.toastr.success(
              'La consultation a été ajoutée avec succès',
              'Consultation ajoutée!'
            );
          },
          (error) => {
            this.router.navigate(['/landingpage']);
            this.toastr.error("Désole, une erreur s'est produite", 'Erreur!');
          }
        );
    } else if (this.diagnostic === 'o') {
      const formData = {
        resume: this.resume,
        dpi: this.patient.nss,
        ordonnance: { medicaments: this.ordonnance },
      }
      this.http
        .post(
          `${environment.apiUrl}/consultations/creerConsultationAvecOrdonnance/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.data.access}`,
            },
          }
        )
        .subscribe(
          (res: any) => {
            this.toastr.success(
              'La consultation a été ajoutée avec succès',
              'Consultation ajoutée!'
            );
          },
          (error) => {
            this.router.navigate(['/landingpage']);
            this.toastr.error("Désole, une erreur s'est produite", 'Erreur!');
          }
        );
    }
  }

  handleButtonClick(type: string) {
    if (type === 'Annuler Bilan Biologique') {
      this.typeBio = '';
      return;
    }
    if (type === 'Annuler Bilan Radiologique') {
      this.typeRadio = '';
      return;
    }
    this.typeBio = type === 'Rédiger Bilan Biologique' ? 'FNS' : this.typeBio;
    this.typeRadio =
      type === 'Rédiger Bilan Radiologique' ? 'IRM' : this.typeRadio;
    this.modalTitle = type;
    this.selectOptions =
      type === 'Rédiger Bilan Biologique'
        ? ['FNS', 'FFS', 'CRP', 'VS']
        : ['IRM', 'Echographie', 'Scanner', 'Radiographie'];
    this.isModalVisible = true;
  }

  openOrdonnanceModal() {
    this.isOrdonnanceModalVisible = true;
  }

  closeOrdonnanceModal() {
    let tempOrdonnance: any;
    tempOrdonnance = this.ordonnance;

    tempOrdonnance = tempOrdonnance.map((med: any) => {
      return {
        nom: med.nom,
        dose: parseFloat(med.dose.match(/^\d+/)?.[0] || '0'),
        duree_prise: parseFloat(med.duree.match(/^\d+/)?.[0] || '0'),
      };
    });

    this.http
      .post(`${environment.sgphUrl}/verifierordonnance`, {
        ordonnance: tempOrdonnance,
      })
      .subscribe(
        (res: any) => {
          if (res.valide) {
            this.toastr.success('Votre ordonnance est valide', 'SGPH succès!');
            this.isOrdonnanceModalVisible = false;
            this.diagnostic = 'o';
          } else {
            this.toastr.error(
              res.erreur || 'Une erreur est survenue',
              'SGPH erreur!'
            );
          }
        },
        (error) => {
          if (error.error && error.error.erreur) {
            this.toastr.error(error.error.erreur, 'SGPH erreur!');
          } else {
            this.toastr.error('Une erreur est survenue', 'SGPH erreur!');
          }
        }
      );
  }

  addOrdonnance() {
    if (
      this.newOrdonnance.nom &&
      this.newOrdonnance.dose &&
      this.newOrdonnance.duree
    ) {
      this.ordonnance.push({ ...this.newOrdonnance });
      this.newOrdonnance = { nom: '', dose: '', duree: '' }; // Reset form
      this.toastr.success('Médicament ajouté avec succès', 'Succès!');
    } else {
      this.toastr.error('Veuillez remplir tous les champs', 'Erreur!');
    }
  }

  deleteOrdonnance(index: number) {
    this.ordonnance.splice(index, 1);
    this.toastr.success('Médicament supprimé', 'Succès!');
  }

  closeModal() {
    this.isModalVisible = false;
    this.diagnostic = 'b';
  }

  private getUserCookie() {
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('user_data=')
    );
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
}
