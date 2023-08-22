import { time } from 'console';
import {
  IWeekdayWorkingData, IWorkingTime
} from '../components/mainPage/mainPage.type';
import { capitalize } from '../utils/text.utils';

export class WorkingTimeService {
  [x: string]: any;
  constructor(
    private workingWeekDataArray: IWeekdayWorkingData[],
    private translator?: (key: string) => string
  ) {
    if (!Array.isArray(workingWeekDataArray)) {
      throw new TypeError('Invalid workingWeekDataArray type');
    }
  }

  getList(): IWorkingTime[] {
    const targetArray = [];

    for (const workingDay of this.workingWeekDataArray) {
      const { isOpen, start, end, comment, weekday } = workingDay;

      const newElement = {
        weekdays: this.t(weekday),
        timeRange: isOpen ? `${start} - ${end}` : this.t('closed'),
        comment: isOpen ? '' : comment
      };
      console.log({newElement})
      const targetElement = targetArray.pop() || newElement;

      if (targetElement.timeRange === newElement.timeRange &&
        targetElement.comment === newElement.comment) {
        const oldWeekDaysRangeStart = targetElement.weekdays.split(' - ')[0];
        targetElement.weekdays = [oldWeekDaysRangeStart, newElement.weekdays].join(' - ');

        targetArray.push(targetElement);
        continue;
      }

      targetArray.push(targetElement);
      targetArray.push(newElement);
    }

    return targetArray;
  }
  private t(key: string): string {
    if (this.translator) {
      return this.translator(`workingTime.${key}`);
    }

    return key;
  }
}