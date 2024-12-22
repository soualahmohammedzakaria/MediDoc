import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'creedpi',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './creerdpi.component.html',
  styleUrls: ['./creerdpi.component.css'],
})
export class Creerdpi implements OnInit {
  data: any;

  // Inject FormBuilder service
  private _formBuilder = inject(FormBuilder);

  // Inject HttpClient service
  //http = inject(HttpClient);

  // Define FormGroups
  firstFormGroup = this._formBuilder.group({
    patient_nom: ['', Validators.required],
    prenom: ['', Validators.required],
    nss: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    medecin_traitant: ['', Validators.required],
    date_naissance: ['', Validators.required],
    sexe: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    telephone: [
      '',
      // Phone number pattern: optional '+' followed by 10 to 13 digits
      [Validators.required, Validators.pattern(/^\+?\d{9,13}$/)],
    ],
    personne_contact: ['', Validators.required],
    adresse: ['', Validators.required],
    mutuelle: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    patient_email: ['', [Validators.required, Validators.email]],
    patient_password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  });

  isLinear = false; // Linear navigation

  constructor(private toastr: ToastrService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Decode data passed via query parameters
    this.route.queryParams.subscribe((params) => {
      this.data = params['data'] ? JSON.parse(atob(params['data'])) : null;
      console.log('Data:', this.data);
    });
  }

  // Final form submission
  submitForm() {
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid
    ) {
      // Verify password match
      if (
        this.thirdFormGroup.value.patient_password !==
        this.thirdFormGroup.value.confirmPassword
      ) {
        this.toastr.error(
          'Le mots de passe et sa confirmation ne sont différents',
          'Mot de passe invalide!'
        );
        return;
      }

      const formData = {
        patient_nom: `${this.firstFormGroup.value.patient_nom} ${this.firstFormGroup.value.prenom}`,
        patient_email: this.thirdFormGroup.value.patient_email,
        patient_password: this.thirdFormGroup.value.patient_password,
        nss: this.firstFormGroup.value.nss?.toString(),
        date_naissance: this.firstFormGroup.value.date_naissance,
        telephone: this.secondFormGroup.value.telephone?.toString(),
        adresse: this.secondFormGroup.value.adresse,
        mutuelle: this.secondFormGroup.value.mutuelle,
        personne_contact: this.secondFormGroup.value.personne_contact,
        sexe: this.firstFormGroup.value.sexe,
        medecin_traitant: this.firstFormGroup.value.medecin_traitant,
      };

      /*this.http
        .post(`${environment.apiUrl}/dpi/creer/`, formData)
        .subscribe(
          (res: any) => {
            // success here
            this.toastr.success(
              'Le dossier du patient a été créé avec succès',
              'Dossier patient créé!'
            );
            this.firstFormGroup.reset();
            this.secondFormGroup.reset();
            this.thirdFormGroup.reset();
          },
          (error) => {
            this.toastr.error('Désole, une erreur s\'est produite', 'Erreur!');
          }
        );*/
    } else {
      this.toastr.error(
        'Veuillez remplir tous les champs du formulaire correctement',
        'Champs invalides!'
      );
    }
  }
}
