export enum WeekDay {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday'
}
export interface IWorkingTime {
  index: number,
  isOpen: boolean,
  start: string,
  end: string,
  message: string,
  weekday: WeekDay
}
export type WorkingTimesType = Record<WeekDay, IWorkingTime>
export enum WorkingStatusColor {
  green = 'green',
  yellow = 'yellow',
  gray = 'gray', 
  red = 'red'
}
export interface IWorkingStatus {
  isOpen: boolean,
  message: string,
  statusColor: WorkingStatusColor
}