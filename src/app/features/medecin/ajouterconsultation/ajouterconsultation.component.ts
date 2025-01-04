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
  templateUrl: './ajouterconsultation.component.html'
})
export class AjouterConsultationComponent implements OnInit {
  data: any;
  medicaments: any;
  patient: any;
  isModalVisible = false;
  modalTitle = '';
  selectOptions: string[] = [];
  typeBio = '';
  typeRadio = '';

  // Inject HttpClient service
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
    this.typeRadio = type === 'Rédiger Bilan Radiologique' ? 'IRM' : this.typeRadio;
    this.modalTitle = type;
    this.selectOptions =
      type === 'Rédiger Bilan Biologique'
        ? ['FNS', 'FFS', 'CRP', 'VS']  
        : ['IRM', 'Echographie', 'Scanner', 'Radiographie'];
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
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