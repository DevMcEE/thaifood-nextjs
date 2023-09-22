export enum DurationTimeUnit {
  hours = 'h',
  minutes = 'm'
}

export enum MessageSplitter {
  dot = '·',
}

export interface IBuildStatusProps {
  isOpenNow: boolean;
  nextStatusTime: string;
  nextStatusDetails?:string;
  splitter?: string;
  isItTomorrow?: boolean;
  hasNextWorkingDay?: boolean;
}

export interface INextStatusDatails {
  durationInMinutes: number;
  durationInHours?: number;
  unitHours?: DurationTimeUnit;
  unitMinutes: DurationTimeUnit;
}