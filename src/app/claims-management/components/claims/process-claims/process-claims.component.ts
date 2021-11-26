import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-process-claims',
  templateUrl: './process-claims.component.html',
  styleUrls: ['./process-claims.component.css']
})
export class ProcessClaimsComponent implements OnInit {

  @Input() claim: any;

  data: any = [
    {'Dose': 1, 'Service': 'Specialist Initial Consultation	','Cost': '1,000'},
    {'Dose': 1, 'Service': 'Antenatal Care	','Cost': '5,000'},
    {'Dose': 1, 'Service': 'Aspirations/Paracentesis	','Cost': '1,000'},
    {'Dose': 1, 'Service': 'Aspirations/Paracentesis	','Cost': '1,000'},
    {'Dose': 1, 'Service': 'Echocardiography	','Cost': '3,000'},
    {'Dose': 1, 'Service': 'Echocardiography	','Cost': '3,000'},
    {'Dose': 1, 'Service': 'Gastric Lavage	','Cost': '1,000'},
    {'Dose': 1, 'Service': 'Gastric Lavage	','Cost': '1,000'},
    {'Dose': 1, 'Service': 'Lumbar Puncture	','Cost': '2,000'},
    {'Dose': 1, 'Service': 'Lumbar Puncture	','Cost': '2,000'},
    {'Dose': 1, 'Service': 'Comprehensive Psychiatric Assessment	','Cost': '2,000'},
    {'Dose': 1, 'Service': 'Psychometric Assessment, Scoring & Interpretation	','Cost': '2,000'},
    {'Dose': 1, 'Service': 'Behaviour Modifications	','Cost': '2,000'},
    {'Dose': 1, 'Service': 'Sleep (REM) Deprivation therapy	','Cost': '3,500'},
    {'Dose': 1, 'Service': 'Electroencephalography	','Cost': '3,000'},
    {'Dose': 1, 'Service': 'Exchange Blood Transfusion	','Cost': '8,000'},
    {'Dose': 1, 'Service': 'Subdural Tap	','Cost': '2,000'},
    {'Dose': 1, 'Service': 'Periapical	','Cost': '1,000'},
    {'Dose': 1, 'Service': 'Bitewings	','Cost': '1,000'},
    {'Dose': 1, 'Service': 'Panoramic View	','Cost': '1,500'},
    {'Dose': 1, 'Service': 'Simple Extraction	','Cost': '2,000'},
    {'Dose': 1, 'Service': 'Pulpal Treatment For Children	','Cost': '3,000'},
    {'Dose': 1, 'Service': 'Surgical Extraction	','Cost': '5,000'},
    {'Dose': 1, 'Service': 'Periodontal Gum Treatment	','Cost': '2,500'},
    {'Dose': 1, 'Service': 'Fissure Selant	','Cost': '1,500'},
    {'Dose': 1, 'Service': 'Specialist Review	','Cost': '500'},
    {'Dose': 1, 'Service': 'Group 1, General Surgery	','Cost': '5,000'},
    {'Dose': 1, 'Service': 'Group 2, General Surgery	','Cost': '10,000'},
    {'Dose': 1, 'Service': 'Group 3, General Surgery	','Cost': '20,000'},
    {'Dose': 1, 'Service': 'Group 4, General Surgery	','Cost': '35,000'},
    {'Dose': 1, 'Service': 'Group 5, General Surgery	','Cost': '50,000'},
    {'Dose': 1, 'Service': 'Group 6, General Surgery	','Cost': '60,000'},
    {'Dose': 1, 'Service': 'Group 1, Orthopaedic Surgeries	','Cost': '15,000'},
    {'Dose': 1, 'Service': 'Group 2, Orthopaedic Surgeries	','Cost': '25,000'},
    {'Dose': 1, 'Service': 'Group 3, Orthopaedic Surgeries	','Cost': '40,000'},
    {'Dose': 1, 'Service': 'Group 1, Otorhinolaryngology	','Cost': '5,000'},
    {'Dose': 1, 'Service': 'Group 2, Otorhinolaryngology	','Cost': '8,500'},
    {'Dose': 1, 'Service': 'Group 1, Ophthalmology	','Cost': '12,000'},
    {'Dose': 1, 'Service': 'Group 2, Ophthalmology	','Cost': '30,000'},
    {'Dose': 1, 'Service': 'Root Canal Treatment	','Cost': '3,000'},
    {'Dose': 1, 'Service': '1 Root	','Cost': '3,000'},
    {'Dose': 1, 'Service': '2 Roots	','Cost': '5,000'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  approve(event: any): void {
    event.path[2].classList.add('bg-success')
    if(event.path[2].classList.contains('bg-secondary')){
      event.path[2].classList.remove('bg-secondary')
    }
    // console.log(event);
  }

  reject(event: any): void {
    event.path[2].classList.add('bg-secondary')
    if(event.path[2].classList.contains('bg-success')){
      event.path[2].classList.remove('bg-success')
    }
    // console.log(event)
  }

}
