import { Time } from "@angular/common";
import { ThemePalette } from "@angular/material/core";
import { ControlMethod } from "./ControlMethod.enum";
import { InMemoryDbService } from 'angular-in-memory-web-api';

export interface Schedule {
  name: string;
  completed: boolean;
  color: ThemePalette;
  start_time?: Time;
  end_time?: Time;
  dayofweek? : Schedule[];
}

export interface Intensity {
  // enable: boolean;
  level: number;
}

export interface Remote {
  // enable: boolean;
  switch: boolean;
  schedule?: Schedule;
  intensity?: Intensity;
}

export interface LightPole {
  id: number;
  devaddr: string;
  name: string;
  status: boolean;
  select: ControlMethod;
  method: {
    manual?: boolean,
    remote?: Remote,
  };
}

export const LightPoles: LightPole[] =
[
    {
      id: 0,
      devaddr: "27F36B6B",
      name: "LP1",
      status: true,
      select: ControlMethod.REMOTE,
      method: {
        remote: {
          switch: true,
        },
      },
    },
    {
      id: 1,
      devaddr: "00004090",
      name: "LP2",
      status: true,
      select: ControlMethod.REMOTE,
      method: {
        remote: {
          switch: true ,
          // schedule: {
          //   name: "all",
          //   completed: false,
          //   color: "primary",
          //   start_time: { hours: 10, minutes: 30 },
          //   end_time: { hours: 11, minutes: 30 },
          //   dayofweek: []
          // }
        }
      }
    },
    {
      id: 2,
      devaddr: "00004145",
      name: "LP3",
      status: true,
      select: ControlMethod.REMOTE,
      method: {
        remote: {
          switch: true,
          // intensity: {
          //   level: 80
          // }
        }
      },
    },
    {
      id: 3,
      devaddr: "00004051",
      name: "LP4",
      status: true,
      select: ControlMethod.REMOTE,
      method: {
        remote: {
          switch: true,
        },
        // manual: false
      }
    },
];

export const IP_SERVER: string = "172.17.13.64";
export const PORT: string = "1883";
export const SUB_TOPIC: string = "/v1/tns/devices/#";
export const PUB_TOPIC: string = "/v1/tns/devices/me/rpc/request/";
