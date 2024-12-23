import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DpiComponent } from '../../../components/global/dpi/dpi.component';

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
  
    // Inject HttpClient service
    http = inject(HttpClient);
  
    constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router) {}
  
    ngOnInit() {
      // Decode data passed via query parameters
      this.route.queryParams.subscribe((params) => {
        this.data = params['data'] ? JSON.parse(atob(params['data'])) : null;
        console.log(this.data);
        if (!this.data) {
          this.router.navigate(['/landingpage']);
        }
      });
    }
}
