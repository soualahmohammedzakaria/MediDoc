import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-laborantin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './laborantin.component.html',
})
export class LaborantinComponent implements OnInit {
  data: any;
  http = inject(HttpClient);
  
  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.data = params['data'] ? JSON.parse(atob(params['data'])) : null;
      console.log(this.data);
      if (!this.data) {
        this.router.navigate(['/landingpage']);
      }
    });
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