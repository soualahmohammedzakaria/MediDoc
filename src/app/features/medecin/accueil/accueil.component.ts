import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  
    constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router) {}
  
    ngOnInit() {
      /*// Decode data passed via query parameters
      this.route.queryParams.subscribe((params) => {
        this.data = params['data'] ? JSON.parse(atob(params['data'])) : null;
        if (!this.data) {
          this.router.navigate(['/landingpage']);
        }
      });*/
    }
}
