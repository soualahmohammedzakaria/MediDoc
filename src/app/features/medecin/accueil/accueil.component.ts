import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CertificatMedicalModalComponent } from '../../../components/medecin/certificat-medical-modal/certificat-medical-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { spec } from 'node:test/reporters';

@Component({
  selector: 'medecin-accueil',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './accueil.component.html',
})
export class MedecinAccueilComponent implements OnInit {
  data: any;
  
    // Inject HttpClient service
    http = inject(HttpClient);
  
    constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {}
  
    ngOnInit() {
      // Decode data passed via query parameters
      this.route.queryParams.subscribe((params) => {
        this.data = params['data'] ? JSON.parse(atob(params['data'])) : null;
        if (!this.data) {
          this.router.navigate(['/landingpage']);
        }
      });
    }

    handleClick(action: string): void {
      if(action === "Consulter Dossier Patient"){
        // Redirect to the Consulter DPI screen with medecin name, specialite, the patient's NSS and access token.
      } else if(action === "Ajouter Une Consultation"){
        // Redirect to the Ajouter Consultation screen with medecin name, specialite, the patient's NSS and access token.
      } else if (action === 'Délivrer Certificat Médical') {
        const data = {
          patient_nss: this.data.patient_nss,
          patient_nom: this.data.patient_nom,
          nom: this.data.nom,
          specialite: this.data.specialite,
        }
        this.dialog.open(CertificatMedicalModalComponent, {
          width: '800px',
          data: data,
        });
      } else{
        this.router.navigate(['/landingpage']);
        this.toastr.error('Action non reconnue', 'Erreur interne!');
      }
    }
}
