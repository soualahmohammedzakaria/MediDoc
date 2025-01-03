import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'AdministrationDoc',
  imports: [CommonModule],
  templateUrl: './doc-admin.component.html',
  styleUrl: './doc-admin.component.css',
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
export class DocAdminComponent {
  isOpen: boolean = false;
  title: string = 'Documents Administratifs';

  documents = [
    {
      name: "Certificat médical 23-04-2023",
      size: "120 KB",
      link: "#",
    },
    {
      name: "Certificat médical 20-05-2024",
      size: "130 KB",
      link: "#",
    },
    {
      name: "Facture hospitalisation",
      size: "150 KB",
      link: "#",
    },
  ];
}
