import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'OrdannanceDpi',
  standalone: true, // If this is a standalone component
  imports: [CommonModule],
  templateUrl: './ordannance.component.html',
  styleUrl: './ordannance.component.css',
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
export class OrdannanceComponent {
  title: string = 'Informations Personnelles';
  isOpen: boolean = false;
  prescriptions = [
    {
      id: '00001',
      date: '14 Feb 2019',
      doctor: 'Darrell Caldwell',
      status: 'Valider',
    },
    {
      id: '00002',
      date: '14 Feb 2019',
      doctor: 'Darrell Caldwell',
      status: 'Non Valider',
    },
    {
      id: '00003',
      date: '14 Feb 2019',
      doctor: 'Darrell Caldwell',
      status: 'Non Valider',
    },
    {
      id: '00004',
      date: '14 Feb 2019',
      doctor: 'Darrell Caldwell',
      status: 'Valider',
    },
    {
      id: '00005',
      date: '14 Feb 2019',
      doctor: 'Darrell Caldwell',
      status: 'Non Valider',
    },
    {
      id: '00006',
      date: '14 Feb 2019',
      doctor: 'Darrell Caldwell',
      status: 'Non Valider',
    },
  ];
}
