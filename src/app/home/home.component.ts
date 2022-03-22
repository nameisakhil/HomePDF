import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteMsgComponent } from '../delete-msg/delete-msg.component';
import { FormService } from '../shared/form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

}
