import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificat-medical-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './certificat-medical-modal.component.html',
})
export class CertificatMedicalModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CertificatMedicalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  generatePdf(formData: { duree: string; dateDebut: string; remarques: string }) {
    // Create a container element for the HTML template
    const container = document.createElement('div');
    container.style.position = 'absolute'; // Hide the container
    container.style.top = '-10000px'; // Position it off-screen to avoid display issues
    container.style.left = '-10000px';
  
    // Populate the container with the HTML content
    container.innerHTML = `
      <div style="padding: 20px; width: 600px; font-size: 16px;" class="poppins-font">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="../../../../assets/images/common/logo_named.png" alt="MediDoc" style="width: 80px; height: auto;" />
        </div>
        <div style="margin-bottom: 20px;">
          <h1 style="text-align: center; font-size: 24px;"><strong>Certificat Médical</strong></h1>
        </div>
        <div style="margin-bottom: 10px;">
          <strong>Nom du Médecin:</strong> ${this.data.nom}<br />
          <strong>Spécialité:</strong> ${this.data.specialite}<br />
          <strong>Nom du Patient:</strong> ${this.data.patient_nom}<br />
          <strong>NSS du Patient:</strong> ${this.data.patient_nss}<br />
          <strong>Adresse:</strong> BPM68 16270, Oued Smar, Alger<br />
        </div>
        <div style="margin: 20px 0;">
          <p>
            Je, <strong>${this.data.nom}</strong>, témoigne que le patient 
            <strong>${this.data.patient_nom}</strong> a passé une prise en charge médicale chez notre hôpital. 
            La durée de son arrêt de travail et de ses soins est de <strong>${formData.duree}</strong>. 
            L'arrêt commence à partir du <strong>${new Date(formData.dateDebut).toLocaleDateString()}</strong>.
          </p>
        </div>
        <div style="margin-bottom: 20px;">
          <strong>Remarques:</strong><br />
          <em>${formData.remarques || 'Aucune remarque'}</em>
        </div>
        <div style="text-align: right; margin-top: 50px;">
          <p>Fait à Alger, le <strong>${new Date().toLocaleDateString()}</strong></p>
          <p><strong>${this.data.nom}</strong></p>
        </div>
      </div>
    `;
  
    // Append the container to the document body
    document.body.appendChild(container);
  
    // Convert HTML to PDF using html2canvas
    html2canvas(container).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('certificat-medical.pdf');
  
      // Remove the container from the DOM
      document.body.removeChild(container);
  
      // Close the dialog
      this.dialogRef.close();
    }).catch((error) => {
      console.error('Error generating PDF:', error);
    });
  }  
}