import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl,FormArray} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMsgComponent } from '../success-msg/success-msg.component';
import { FailureMsgComponent } from '../failure-msg/failure-msg.component';
import { SignaturePad } from 'angular2-signaturepad';
import { FormService } from '../shared/form.service';
import { SubmitMsgComponent } from '../submit-msg/submit-msg.component';
import { Router } from '@angular/router';
import { UpdateMsgComponent } from '../update-msg/update-msg.component';



interface gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-section-a',
  templateUrl: './section-a.component.html',
  styleUrls: ['./section-a.component.css']
})
export class SectionAComponent implements OnInit {

  step :any = 1;

  form1 = this.formService.Form1.controls;
  fontStyleControl = new FormControl();
  checkboxList = [
    'To diagnose intra-uterine and or ectopic pregnancy and confirm viability',
      'Estimation of gestational age (dating)',
      'Vaginal bleeding OR leaking',
      'Suspected pregnancy with IUCD in-situ or suspected pregnancy following contraceptive failure OR MTP failure',
      'Follow-up of cases of abortion',
      'Assessment of cervical canal and diameter of internal os',
      'Discrepancy between uterine size and period of amenorrhea',
      'Any suspected adenexal or uterine pathology OR abnormality',
      'Detection of chromosomal abnormalities, fetal structural defects and other abnormalities and their follow-up',
      'To evaluate fetal presentation and position',
      'Assessment of liquor amnii',
      'Preterm labor OR preterm premature rupture of membranes',
      'Evaluation of placental position, thickness, grading and abnormalities (placenta praevia, retro placental haemorrhage, abnormal adherence etc',
      'Evaluation of umbilical cord presentation, insertion, nuchal encirclement, number of vessels and presence of true knot',
      'Evaluation of previous Caesarean Section scars',
      'Evaluation of fetal growth parameters, fetal weight and fetal well being',
      'Color flow mapping and duplex Doppler studies',
      'Ultrasound guided procedures such as medical termination of pregnancy, external cephalic version etc and their follow-up',
      'Adjunct to diagnostic and therapeutic invasive interventions such as chorionic villus sampling (CVS),amniocenteses, feel blood sampling, fetal skin biopsy, amnio-infusion, intrauterine infusion, placement of shunts etc',
      'Observation of intra-partum events',
      'Medical or surgical conditions complicating pregnancy',
      'Research OR scientific studies in recognized institutions',
];



  genders: gender[] = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'},
    {value: 'others', viewValue: 'Others'},
  ];


  signatureImg: string;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 700,
    'canvasHeight': 300
  };

  constructor(private dialog:MatDialog,public formService:FormService,private router:Router) { }


  ngOnInit(): void {
   this.formService.getFormList();
     // console.log(this.formArray);
  }

  onClickReset(){
    this.formService.Form1.reset();
  }

  gotoPrevious(){
    this.step = this.step -1;
  }

  gotSec2(){
    this.step = 2;
  }

  gotSec1(){
    this.step = 1;
  }
  gotSec3(){
    this.step = 3;
  }
  gotSec4(){
    this.step = 4;
  }
  gotoNext(){
    if (this.step == 1){
      if (this.formService.Form1.get('sectionA').valid){
        const dialogRef = this.dialog.open(SuccessMsgComponent);

        dialogRef.afterClosed().subscribe((result) => {
          if (result == true){
          this.step = this.step + 1;
          }
        });
      }
      else{
        const dialogRef = this.dialog.open(FailureMsgComponent);
      }
    }
    if (this.step == 2){
      if (this.formService.Form1.get('sectionB').valid){
        const dialogRef = this.dialog.open(SuccessMsgComponent);

        dialogRef.afterClosed().subscribe((result) => {
          if (result == true){
            this.step = this.step + 1;
          }
        });
      }
      else{
        const dialogRef = this.dialog.open(FailureMsgComponent);
      }
    }
    if (this.step == 3){
      if (this.formService.Form1.get('sectionC').valid){
        const dialogRef = this.dialog.open(SuccessMsgComponent);

        dialogRef.afterClosed().subscribe((result) => {
          if (result == true){
            this.step = this.step + 1;
          }
        });
      }
      else{
        const dialogRef = this.dialog.open(FailureMsgComponent);
      }
    }
  }

  onAdd(){
    if (this.step == 1){
      const dialogRef = this.dialog.open(UpdateMsgComponent);
         dialogRef.afterClosed().subscribe((result) => {
         if (result == true){
           this.formService.updateUser(this.formService.Form1.value);
           this.router.navigate(['/']);
         }
       });
    }else if(this.step == 2){
      const dialogRef = this.dialog.open(UpdateMsgComponent);
        dialogRef.afterClosed().subscribe((result) => {
          if (result == true){
            this.formService.updateUser(this.formService.Form1.value);
            this.router.navigate(['/']);
          }
        });
    }else if(this.step == 3){
      const dialogRef = this.dialog.open(UpdateMsgComponent);
        dialogRef.afterClosed().subscribe((result) => {
          if (result == true){
            this.formService.updateUser(this.formService.Form1.value);
            this.router.navigate(['/']);
          }
        });
    }else if(this.step == 4) {
      if (this.formService.Form1.get('sectionD').valid){
        if (this.formService.Form1.get('sectionA').valid){
          if (this.formService.Form1.get('sectionB').valid){
            if (this.formService.Form1.get('sectionC').valid){

              if (this.formService.Form1.get('$key').value == null){
                const dialogRef = this.dialog.open(SubmitMsgComponent);
                dialogRef.afterClosed().subscribe((result) => {
                  if (result == true){
                    this.formService.insertUser(this.formService.Form1.value);
                    this.router.navigate(['/']);
                  }
                });
              }else {
                const dialogRef = this.dialog.open(UpdateMsgComponent);
                dialogRef.afterClosed().subscribe((result) => {
                  if (result == true){
                    this.formService.updateUser(this.formService.Form1.value);
                    this.router.navigate(['/']);
                  }
                });
              }

            }else{
             this.dialog.open(FailureMsgComponent);
              this.step = 3;
            }
          }else{
            this.dialog.open(FailureMsgComponent);
            this.step = 2;
          }
        }else{
          this.dialog.open(FailureMsgComponent);
          this.step = 1;
        }



        //console.log(this.formService.Form1.value);

      }
      else{
        this.dialog.open(FailureMsgComponent);
      }
    }
  }
  //sectionB

  onClickultrasound(){
    const a1 = this.formService.Form1.get('sectionB');
    (<FormArray>a1.get('otherProcedure')).removeAt(0)
  }

  onClickBtn(){
    const control = new FormControl(null);
    const a2 = this.formService.Form1.get('sectionB');
    if (a2.get('otherProcedure').value.length < 1){
      const a1 = this.formService.Form1.get('sectionB');
      (<FormArray>a1.get('otherProcedure')).push(control);
    }

  }

  getControls() {
    const a1 = this.formService.Form1.get('sectionB');
    return (<FormArray>a1.get('otherProcedure')).controls;
  }

  // sectionD

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }
  clearSignature() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
  }
}
