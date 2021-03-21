import { Component, Inject, OnInit } from '@angular/core';
import { Schedule, LightPole, LightPoles } from '../lightpole';
import { ControlMethod } from "../ControlMethod.enum";
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatStartDate, MatDateRangeInput, MatEndDate} from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  lightPoles = LightPoles;
  selectedEntry: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSelectionChange(lp:LightPole) {
    this.selectedEntry = lp;
  }

  formatLabel(value: number) {
    if (value >= 100) {
      return Math.round(value / 100);
    }
    return value;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ScheduleDialog,
      {
        height: '480px',
        width: '400px',
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.lightPoles = result;
    });
  }

}

@Component({
  selector: 'schedule-dialog',
  templateUrl: './schedule-dialog.html',
  styleUrls: ['./control.component.css']
})
export class ScheduleDialog {

  schedule: Schedule = {
    name: "Alldays",
    completed: false,
    color: 'primary',
    start_time: {hours:11, minutes:30},
    end_time: {hours:15, minutes:30},
    dayofweek: [
      { name: "Sunday", completed: false, color: 'primary' },
      { name: "Monday", completed: false, color: 'primary' },
      { name: "Tuesday", completed: false, color: 'primary' },
      { name: "Wednesday", completed: false, color: 'primary' },
      { name: "Thurday", completed: false, color: 'primary' },
      { name: "Friday", completed: false, color: 'primary' },
      { name: "Satureday", completed: false, color: 'primary' },
    ]
  };

  allComplete: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ScheduleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Schedule) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateAllComplete() {
    this.allComplete = this.schedule.dayofweek != null && this.schedule.dayofweek.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.schedule.dayofweek == null) {
      return false;
    }
    return this.schedule.dayofweek.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.schedule.dayofweek == null) {
      return;
    }
    this.schedule.dayofweek.forEach(t => t.completed = completed);
  }
}



/**  Copyright 2021 EmOne. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
