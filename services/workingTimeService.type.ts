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
  nextStatusDetails?: {
    duration: number;
    unit: DurationTimeUnit;
  };
  splitter?: string;
  isItTomorrow?: boolean;
  hasNextWorkingDay?: boolean;
}