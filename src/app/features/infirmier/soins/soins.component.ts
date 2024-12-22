import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'infirmier-soins',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, ReactiveFormsModule],
  templateUrl: './soins.component.html',
})
export class SoinsComponent implements OnInit {
  data: any;
  soinsForm: FormGroup;

  // Inject services
  http = inject(HttpClient);
  fb = inject(FormBuilder);

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form
    this.soinsForm = this.fb.group({
      soins: ['', [Validators.required, Validators.minLength(10)]],
      observations: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit() {
    // Decode data passed via query parameters
    this.route.queryParams.subscribe((params) => {
      this.data = params['data'] ? JSON.parse(atob(params['data'])) : null;
      if (!this.data) {
        this.router.navigate(['/landingpage']);
      }
    });
  }

  // Function to submit the form
  submitForm() {
    if (this.soinsForm.invalid) {
      this.toastr.error('Veuillez remplir tous les champs requis correctement', 'Champs invalides!');
      return;
    }

    const formData = {
      dpi: this.data.patient_id,
      soins: this.soinsForm.value.soins,
      observations: this.soinsForm.value.observations,
      id_infirmier: this.data.id,
    };

    console.log(formData);

    this.http.post(`${environment.apiUrl}/api/soins/ajouter`, formData, {
      headers: {
        Authorization: `Bearer ${this.data.access}`,
      }
    }).subscribe(
      (res: any) => {
        this.toastr.success(
          'Les soins ont été ajoutés avec succès',
          'Soins ajoutés!'
        );
      },
      (error) => {
        if (error.status === 404) {
          this.toastr.error(
            'Un patient avec ce NSS ou infirmier avec cet identifiant n\'a pas été trouvé',
            'NSS ou infirmier non trouvé!'
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
