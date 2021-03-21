import { Time } from "@angular/common";
import { ThemePalette } from "@angular/material/core";
import { ControlMethod } from "./ControlMethod.enum";

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
      name: "LP1",
      status: true,
      select: ControlMethod.REMOTE,
      method: {
        remote: {
          switch: true
        },
      },
    },
    {
      id: 1,
      name: "LP2",
      status: true,
      select: ControlMethod.SCHEDULE,
      method: {
        remote: {
          switch: true ,
          schedule: {
            name: "all",
            completed: false,
            color: "primary",
            start_time: { hours: 10, minutes: 30 },
            end_time: { hours: 11, minutes: 30 },
            dayofweek: []
          }
        }
      }
    },
    {
      id: 2,
      name: "LP3",
      status: true,
      select: ControlMethod.INTENSITY,
      method: {
        remote: {
          switch: true,
          intensity: {
            level: 80
          }
        }
      },
    },
    {
      id: 3,
      name: "LP4",
      status: false,
      select: ControlMethod.MANUAL,
      method: {
        manual: false
      }
    },
];
