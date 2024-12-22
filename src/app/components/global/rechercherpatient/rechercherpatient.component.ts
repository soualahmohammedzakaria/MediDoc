import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

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

  constructor(private http: HttpClient, private toastr: ToastrService) {}

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

    this.http.get(`${environment.apiUrl}/dpi/rechercher/${this.nss}`, {
      headers: {
        Authorization: `Bearer ${this.data.access}`,
      }
    }).subscribe(
      (res: any) => {
        this.toastr.success(
          'Le dossier du patient a été trouvé avec succès',
          'Dossier trouvé!'
        );
        console.log(res);
      },
      (error) => {
        if (error.status === 301) {
          this.toastr.success(
            'Le dossier du patient a été trouvé avec succès',
            'Dossier trouvé!'
          );
        } else if (error.status === 404) {
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