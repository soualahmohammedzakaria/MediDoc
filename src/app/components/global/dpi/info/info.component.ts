import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { environment } from "../../../../../environments/environment" // Import the environment file

@Component({
  selector: 'InfoPersonal',
  standalone: true, // If this is a standalone component
  imports: [CommonModule], // Add CommonModule to imports
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  animations: [
    trigger('toggleContent', [
      state(
        'closed',
        style({
          height: '0',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      transition('closed <=> open', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class InfoComponent{
  title: string = 'Informations Personnelles';
  isOpen: boolean = false;

  @Input() patientData: any = {
    name: "Bouab Sami",
    email: "patient.dpi@gmail.com",
    gender: "Masculin",
    date_of_birth: {
      date: "12/05/1985",
      age: 38
    },
    social_security_number: "123-45-6789",
    phone: "+33 6 12 34 56 78",
    address: "45 rue de la Paix, 75001 Paris",
    emergency_contact: {
      name: "Zladi Idriss",
      phone: "+33 6 98 76 54 32"
    },
    blood_type: "AB+",
    primary_physician: "John John",
    insurance: "Harmonie Mutuelle",
    known_allergies: ["Allergie aux arachides", "Intolérant au lactose", "Allergie aux chats"],
    chronic_conditions: ["Hypertension", "Asthme", "Diabète"]
  };

  constructor(private http: HttpClient) { }
}
