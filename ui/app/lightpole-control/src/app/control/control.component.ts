import { Component, Inject, OnInit } from '@angular/core';
import { Schedule, LightPole, LightPoles, IP_SERVER, PORT, SUB_TOPIC, PUB_TOPIC } from '../lightpole';
// import { ControlMethod } from "../ControlMethod.enum";
// import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { MatCheckbox } from '@angular/material/checkbox';
// import { MatStartDate, MatDateRangeInput, MatEndDate} from '@angular/material/datepicker';
// import { MatInput } from '@angular/material/input';
import { EventMqttService } from '../service/event.mqtt.service';
import { MqttClient, IClientOptions } from 'mqtt';
import * as mqtt from 'mqtt';
// import { WebsocketService } from '../service/websocket.service';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// import { MQTTService } from 'ionic-mqtt';
import { webSocket } from "rxjs/webSocket";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('admin:admin'),
    // 'access-control-allow-origin': '*',
    // "access-control-allow-headers":"content-type"
  }),
  // observe:'event',
  reportProgress: true,
  // responseType: 'json'
};

// const clientOption:IClientOptions = {
//   host:
// }

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  errorMessage = "";
  lightPoles = LightPoles;
  selectedEntry: any;
  constructor(public dialog: MatDialog,
    private http: HttpClient) {

  //  this.mq = mqtt.connect("mqtt://172.17.13.64:1883");
  }

  ngOnInit(): void {

    // this.mq.on('connect', function () {
    //   console.log('mqtt connected');
    //  });

    // this.mq.on('message', function (topic, message) {
    //   // message is Buffer
    //   console.log(message.toString())
    // })
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

  onClickTurnOn(devid: string){
    console.log('Turn ON :' + devid);
    let url = "http://172.17.13.64:8088" + PUB_TOPIC + devid;
    let downlink = {"devaddr": devid, "port": 2, "data":"00"};
    // this.mq.publish(PUB_TOPIC + devid, downlink);
    this.http.post<any>(url,
                  downlink, httpOptions)
                  // .pipe(
                  // //   retry(3),
                  //   catchError(this.handleError)
                  //   );
                  .subscribe(
                    {
                      error: error => {
                        this.errorMessage = error.message;
                        console.error('There was an error!', error);
                      }

                    }
                  )
  }

  onClickTurnOff(devid: string) {
    console.log('Turn OFF :' + devid);
    let url = "http://172.17.13.64:8088" + PUB_TOPIC + devid;
    let downlink = {"devaddr":devid, "port": 2, "data":"0F"};
    // this.mq.publish(PUB_TOPIC + devid, downlink);
    this.http.post<any>(url,
                  downlink, httpOptions)
                  // .pipe(
                  // //   retry(3),
                  //   catchError(this.handleError)
                  // );
                  .subscribe(
                    {
                      error: error => {
                        this.errorMessage = error.message;
                        console.error('There was an error!', error);
                      }

                    }
                  )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
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
