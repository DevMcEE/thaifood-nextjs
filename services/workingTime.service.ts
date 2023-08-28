import {
  IWeekdayWorkingData, IWorkingTime
} from '../components/mainPage/mainPage.type';

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

      const lastElement = targetArray.pop();

      if (
        lastElement &&
        lastElement.timeRange === newElement.timeRange &&
        lastElement.comment === newElement.comment
      ) {
        // merge last element with new one
        // split the first part of weekdays range
        const oldWeekDaysRangeStart = lastElement.weekdays.split(' - ')[0];
        // join with new elements single weekday
        lastElement.weekdays = [oldWeekDaysRangeStart, newElement.weekdays].join(' - ');

        targetArray.push(lastElement);

        continue;
      }

      if (lastElement) {
        targetArray.push(lastElement);
      }

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