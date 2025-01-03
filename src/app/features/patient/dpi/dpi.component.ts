import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DpiComponent } from '../../../components/global/dpi/dpi.component';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'patient-dpi',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    DpiComponent
  ],
  templateUrl: './dpi.component.html',
})
export class PatientDpiComponent implements OnInit {
  data: any;
  patientData: any;
  @Input() nss: string = '';
  historiqueMedical: any;
  ordonnances: any;
  bilans: any;
  // Inject HttpClient service
  http = inject(HttpClient);
  loading = true;
  constructor(private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    const userCookie = this.getUserCookie();
    if (!userCookie || !userCookie.access) {
      this.router.navigate(['/landingpage']);
      return;
    }
    this.data = userCookie;
    let apiUrl ;
    if(this.nss){
      apiUrl = `${environment.apiUrl}/dpi/consulter/${this.nss}/`;
    }else{
      apiUrl=`${environment.apiUrl}/dpi/consulterPatient/`;
    }
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${userCookie.access}`,
      'Content-Type': 'application/json',
    });
    this.http.get(apiUrl, { headers }).subscribe(
      (data: any) => {
        this.patientData = data;
        this.nss = JSON.stringify(data.nss);
        console.log('Patient data loaded successfully:', data);
        //get consultation 
        apiUrl = `${environment.apiUrl}/consultations/getConsultationByPatient/${data.nss}/`;
        this.http.get(apiUrl, { headers }).subscribe(
          (data: any) => {
            apiUrl = `${environment.apiUrl}/soins/dpi/${this.nss}/`;
            this.http.get(apiUrl, { headers }).subscribe(
              (data2: any) => {
                this.historiqueMedical =
                  data.map((consultation: any) => ({
                    id: consultation.id_consultation,
                    title: 'Consultation Médicale',
                    date: consultation.date,
                    summary: consultation.resume || '',
                    prescription: consultation.prescription || '',
                    tests: [
                      ...(consultation.analyses_biologiques || []).map((a: any) => `Analyse biologique: ${a}`),
                      ...(consultation.images_radiologiques || []).map((r: any) => `Image radiologique: ${r}`)
                    ].join(', '),
                    tools: '', // Add relevant tools if applicable
                    type: 'consultation',
                    medecin: consultation.medecin || '', // Add relevant doctor information if available
                  }));
                this.historiqueMedical = [...this.historiqueMedical, ...data2.map((soin: any) => ({
                  id: soin.id_soin,
                  title: 'Soins',
                  date: soin.date,
                  summary: soin.resume || '',
                  prescription: soin.prescription || '',
                  tools: '', // Add relevant tools if applicable
                  type: 'care',
                  medecin: soin.medecin || '', // Add relevant doctor information if available
                }))];
                this.loading = false;
                console.log('Patient soins loaded successfully:', data);
              },
              (error) => {
                console.log('Error loading patient soins:', error.message);
                this.toastr.error('Failed to load patient soins.');
              }
            );

            console.log('Patient consultation loaded successfully:', data);
          },
          (error) => {
            console.log('Error loading patient consultation:', error.message);
            console.log(error);
            this.toastr.error('Failed to load patient consultation.');
          }
        );

        // get ordonnances
        apiUrl = `${environment.apiUrl}/ordonnances/?nss=${data.nss}`;
        this.http.get(apiUrl, { headers }).subscribe(
          (data: any) => {
            this.ordonnances = data;
            console.log('Patient ordonnances loaded successfully:', data);
          },
          (error) => {
            console.log('Error loading patient ordonnances:', error.message);
            this.toastr.error('Failed to load patient ordonnances.');
          }
        );
        apiUrl = `${environment.apiUrl}/bilans/images-radiologiques/?nss=1234`;
        this.http.get(apiUrl, { headers }).subscribe(
          (data: any) => {
            apiUrl = `${environment.apiUrl}/bilans/analyses-biologiques/?nss=1234`;
            this.http.get(apiUrl, { headers }).subscribe(
              (data2: any) => {
                const transformedData = [
                  ...data.map((item: any) => ({
                    id: `0000${item.id_image_radiologique}`,
                    date: '14 Feb 2019', // Update with actual date if available
                    category: 'Examens d’Imagerie Médicale',
                    examType: item.type,
                    results: {
                      url: item.url,
                      report: item.compte_rendu,
                    },
                    status: item.statut === 'terminé' ? 'Terminé' : 'Pas terminé',
                  })),
                  ...data2.map((item: any) => ({
                    id: `0000${item.id_analyse_biologique}`,
                    date: '14 Feb 2019', // Update with actual date if available
                    category: 'Analyses Biologiques',
                    examType: item.type,
                    results: item.parametres,
                    status: item.statut === 'terminé' ? 'Terminé' : 'Pas terminé',
                  })),
                ];
        
                this.bilans = transformedData;
                console.log('Patient bilans loaded successfully:', transformedData);
              },
              (error) => {
                console.log('Error loading patient bilans:', error.message);
                this.toastr.error('Failed to load patient bilans.');
              }
            );
            console.log('Patient ordonnances loaded successfully:', data);
          },
          (error) => {
            console.log('Error loading patient ordonnances:', error.message);
            this.toastr.error('Failed to load patient ordonnances.');
          }
        );
        
      },
      (error) => {
        console.log('Error loading patient data:', error.message);
        this.toastr.error('Failed to load patient data.');
      }
    );
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
}
