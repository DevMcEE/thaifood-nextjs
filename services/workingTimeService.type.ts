export enum DurationTimeUnit {
  hours = 'hours',
  minutes = 'minutes'
}

export enum MessageSplitter {
  dot = '·',
}

export interface IBuildStatusProps {
  isOpenNow: boolean;
  nextStatusTime: string;
  nextStatusDetails?:INextStatusDatails;
  splitter?: string;
  isItTomorrow?: boolean;
  hasNextWorkingDay?: boolean;
}

export interface INextStatusDatails {
  duration: number;
  unit: DurationTimeUnit;
}