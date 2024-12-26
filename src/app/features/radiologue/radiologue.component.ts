import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-radiologue',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './radiologue.component.html',
})
export class RadiologueComponent implements OnInit {
  data: any;
  http = inject(HttpClient);

  constructor(private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    const userCookie = this.getUserCookie();
    if (!userCookie) {
      this.router.navigate(['/landingpage']);
      return;
    }
    this.data = userCookie;
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

  bilans = [
    {
      date: '14 Feb 2019',
      typeExamen: 'IRM',
      nssPatient: '123-45-6789',
      status: 'Terminé'
    },
    {
      date: '14 Feb 2019',
      typeExamen: 'IRM',
      nssPatient: '123-45-6789',
      status: 'Pas Terminé'
    },
    {
      date: '14 Feb 2019',
      typeExamen: 'Scanner',
      nssPatient: '123-45-6789',
      status: 'Terminé'
    },
    {
      date: '14 Feb 2019',
      typeExamen: 'Radiographie Standard',
      nssPatient: '123-45-6789',
      status: 'Pas Terminé'
    },
    {
      date: '14 Feb 2019',
      typeExamen: 'Échographie cardiaque',
      nssPatient: '123-45-6789',
      status: 'Terminé'
    },
    {
      date: '14 Feb 2019',
      typeExamen: 'Échographie cardiaque',
      nssPatient: '123-45-6789',
      status: 'Pas Terminé'
    }
  ];

  timeButtons = [
    { label: "Aujourd'hui", type: 'today' },
    { label: 'Semaine', type: 'week' },
    { label: 'Mois', type: 'month' },
    { label: 'Année', type: 'year' }
  ];

  activeTimeFilter = 'year';

  selectTimeFilter(timeType: string) {
    this.activeTimeFilter = timeType;
  }

  setStatus(status: 'Terminé' | 'Pas Terminé') {
    this.activeStatus = status;
  }

  getFilteredBilans() {
    return this.bilans.filter(bilan => {
      if (this.activeStatus === 'Terminé') {
        return bilan.status === 'Terminé';
      }
      return bilan.status === 'Pas Terminé';
    });
  }

  viewResults(nssPatient: string) {
    console.log(`Viewing results for patient: ${nssPatient}`);
  }

  fillBilan(nssPatient: string) {
    console.log(`Filling bilan for patient: ${nssPatient}`);
  }
}