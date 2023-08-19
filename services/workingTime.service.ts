import { time } from 'console';
import {
  IWeekdayWorkingData, IWorkingTime
} from '../components/mainPage/mainPage.type';
import { capitalize } from '../utils/text.utils';
import { RuleSetQuery } from 'webpack';

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
    let allTimeRangesAndWeekdays = []
    let currentArrayNumber: number = 0;
    let allWeekdays = []
    const timeRangesOfAllWeekdaysLength = this.getAllTimeRangesOfWeekdays().length
    for (let i = 0; i < timeRangesOfAllWeekdaysLength; i++) {
      if (allTimeRangesAndWeekdays.length === 0) {
        allTimeRangesAndWeekdays.push({
          weekdays: '',
          timeRange: '',
          comment: '',
        })
        allWeekdays.push({
          weekdays: []
        })
        allWeekdays[currentArrayNumber].weekdays.push(this.getAllTimeRangesOfWeekdays()[i].weekday);
        allTimeRangesAndWeekdays[currentArrayNumber].timeRange = this.getAllTimeRangesOfWeekdays()[i].timeRange;
        allTimeRangesAndWeekdays[currentArrayNumber].comment = this.getAllTimeRangesOfWeekdays()[i].comment;
      } else if (this.getAllTimeRangesOfWeekdays()[i].timeRange === allTimeRangesAndWeekdays[currentArrayNumber].timeRange && this.getAllTimeRangesOfWeekdays()[i].comment === allTimeRangesAndWeekdays[currentArrayNumber].comment) {
        allWeekdays[currentArrayNumber].weekdays.push(this.getAllTimeRangesOfWeekdays()[i].weekday);
      } else {
        currentArrayNumber += 1
        allTimeRangesAndWeekdays.push({
          weekdays: '',
          timeRange: '',
          comment: '',
        })
        allWeekdays.push({
          weekdays: []
        })
        allWeekdays[currentArrayNumber].weekdays.push(this.getAllTimeRangesOfWeekdays()[i].weekday);
        allTimeRangesAndWeekdays[currentArrayNumber].timeRange = this.getAllTimeRangesOfWeekdays()[i].timeRange;
        allTimeRangesAndWeekdays[currentArrayNumber].comment = this.getAllTimeRangesOfWeekdays()[i].comment;
      }
    }
    const lenghtOfallTimeRangesAndWeekDays = allWeekdays.length
    for (let i = 0; i < lenghtOfallTimeRangesAndWeekDays; i++) {
      let arrayWeekdays = allWeekdays[i].weekdays
      let weekdaysLength = allWeekdays[i].weekdays.length;
      allTimeRangesAndWeekdays[i].weekdays = `${weekdaysLength !== 1 ? arrayWeekdays[0] + ' - ' + arrayWeekdays[weekdaysLength - 1] : arrayWeekdays[0]}`;
  }
  return allTimeRangesAndWeekdays;
  }
  private t(key: string): string {
    if (this.translator) {
      return this.translator(`workingTime.${key}`);
    }

    return key;
  }
  private getAllTimeRangesOfWeekdays() {
    let timeRange: string;
    let comment: string;
    let timeRangesOfAllWeekdays = [];
    for (let i = 0; i < 7; i++) {
      if (this.workingWeekDataArray[i].isOpen !== false) {
        timeRange = this.workingWeekDataArray[i].start + ' - ' + this.workingWeekDataArray[i].end;
        timeRangesOfAllWeekdays.push({
          weekday: this.workingWeekDataArray[i].weekday,
          timeRange: timeRange,
          comment: ''
        });
      } else {
        comment = this.workingWeekDataArray[i].comment
        timeRangesOfAllWeekdays.push({
          weekday: this.workingWeekDataArray[i].weekday,
          timeRange: 'closed',
          comment: comment
        });
      }
    }
    return timeRangesOfAllWeekdays;
  }
}