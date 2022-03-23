import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteMsgComponent } from '../delete-msg/delete-msg.component';
import { FormService } from '../shared/form.service';
import { FailureMsgComponent } from '../failure-msg/failure-msg.component';
import {jsPDF} from 'jspdf'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild("pdfContent",{static:false}) el!: ElementRef
  fontStyleControl = new FormControl();
  formArray = [];


  constructor(public formService:FormService,private router:Router, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.formService.getFormList().subscribe(
      list => {
        this.formArray = list.map((item) => {
          return {
            $key:item.key,
            expand:false,
            ...item.payload.val()
          };
        });
      }
    );

  }

  onDelete($key){
    const dialogRef = this.dialog.open(DeleteMsgComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true){
        this.formService.deleteUser($key);
      }
    });

  }

  onClickForm(){
    this.formService.Form1.reset();
  }

  generatePDF(user){
    this.formService.populateData(user)
    if (this.formService.Form1.get("sectionA").valid
    && this.formService.Form1.get('sectionB').valid
    && this.formService.Form1.get('sectionC').valid
    && this.formService.Form1.get('sectionD').valid
    ){

      let pdf = new jsPDF('p','pt','a4')

      pdf.html(this.el.nativeElement,{
        callback: (pdf) =>{
          pdf.save("FormF.pdf")
          // this.formService.Form1.get('sectionA').reset()
        },
        margin:20
      })


    }
    else{
      const dialogRef = this.dialog.open(FailureMsgComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

    }
    console.log(    this.formService.populateData(user)    )
    console.log(this.formService.Form1.get("sectionA").value)
  }

}
