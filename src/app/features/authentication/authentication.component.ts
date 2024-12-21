import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'authentication',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, HttpClientModule],
  templateUrl: './authentication.component.html',
})
export class Authentication {
  email: string = '';
  password: string = '';
  role: string = 'personnel';
  buttonText: string = 'Connectez-vous en tant que patient';
  isLoading: boolean = false;

  constructor(private toastr: ToastrService) {}

  http = inject(HttpClient);

  toggleRole() {
    this.role = this.role === 'patient' ? 'personnel' : 'patient';
    this.buttonText =
      this.role === 'patient'
        ? 'Connectez-vous en tant que personnel'
        : 'Connectez-vous en tant que patient';
  }

  authenticate() {
    this.isLoading = true;

    const formData = {
      email: this.email,
      password: this.password,
      role: this.role,
    };

    this.http.post(`${environment.apiUrl}/accounts/login/`, formData).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.toastr.success(`Rebonjour, ${res.user.nom}`, 'Connexion réussie!');
      },
      (error) => {
        this.isLoading = false;
        if (error.status === 401) {
          this.toastr.error('Vos informations sont invalides', 'Accès non autorisé!');
        } else {
          this.toastr.error('Désole, une erreur s\'est produite', 'Erreur!');
        }
      }
    );
  }
}