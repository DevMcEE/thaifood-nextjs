import { time } from 'console';
import {
  IWeekdayWorkingData, IWorkingTime
} from '../components/mainPage/mainPage.type';
import { capitalize } from '../utils/text.utils';

export class WorkingTimeService {
  constructor(
    private workingWeekDataArray: IWeekdayWorkingData[],
    private translator?: (key: string) => string
  ) {
    if (!Array.isArray(workingWeekDataArray)) {
      throw new TypeError('Invalid workingWeekDataArray type');
    }
  }

  getList(): IWorkingTime[] {
    const differencesBetweenAllTimeRangesArray = this.getDifferencesBetweenAllTimeRanges();
    const weekdaysInformation = []

    const lenghtOfallTimeRangesAndWeekDays = differencesBetweenAllTimeRangesArray.types.length

    for (let i = 0; i < lenghtOfallTimeRangesAndWeekDays; i++) {
      let comment = differencesBetweenAllTimeRangesArray.types[i].comment;
      let information: string;
      let weekdays = differencesBetweenAllTimeRangesArray.types[i].weekdays;
      let timeRange = differencesBetweenAllTimeRangesArray.types[i].timeRange;
      let weekdaysLength = differencesBetweenAllTimeRangesArray.types[i].weekdays.length;
      if (timeRange === undefined) {
        information = `${weekdaysLength !== 1 ? weekdays[0] + ' - ' + weekdays[weekdaysLength - 1] : weekdays[0]}: ${comment === 'closed' ? 'closed' : 'closed ' + '(' + comment + ')'}`;
        weekdaysInformation.push(information);
      } else {
        information = `${weekdaysLength !== 1 ? weekdays[0] + ' - ' + weekdays[weekdaysLength - 1] : weekdays[0]}: ${timeRange}`;
        weekdaysInformation.push(information);
      }

    }
    return weekdaysInformation;
  }
  private t(key: string) {
    if (this.translator) {
      return this.translator(`workingTime.${key}`);
    }

    return key;
  }
  private getAllTimeRangesOfWeekdays() {
    let arrayNumber = 0;
    let timeRange: string;
    let comment: string;
    let timeRangesOfAllWeekdays = [];
    for (arrayNumber; arrayNumber < 7; arrayNumber++) {
      if (this.workingWeekDataArray[arrayNumber].isOpen !== false) {
        timeRange = this.workingWeekDataArray[arrayNumber].start + '-' + this.workingWeekDataArray[arrayNumber].end;

        timeRangesOfAllWeekdays.push({
          weekday: this.workingWeekDataArray[arrayNumber].weekday,
          timeRange: timeRange
        });
      } else {
        comment = this.workingWeekDataArray[arrayNumber].comment
        timeRangesOfAllWeekdays.push({
          weekday: this.workingWeekDataArray[arrayNumber].weekday,
          comment: comment
        });
      }
    }
    return timeRangesOfAllWeekdays;
  }
  private getDifferencesBetweenAllTimeRanges() {
    let allTimeRangesAndWeekDays = {
      types: [
        {
          weekdays: [],
          timeRange: '',
          comment: ''
        }
      ],
    }
    let currentArrayNumber: number = 0;
    const timeRangesOfAllWeekdaysLength = this.getAllTimeRangesOfWeekdays().length
    for (let i = 0; i < timeRangesOfAllWeekdaysLength; i++) {
      if (allTimeRangesAndWeekDays.types[currentArrayNumber].weekdays.length === 0) {
        allTimeRangesAndWeekDays.types[currentArrayNumber].weekdays.push(this.getAllTimeRangesOfWeekdays()[i].weekday)
        allTimeRangesAndWeekDays.types[currentArrayNumber].timeRange = this.getAllTimeRangesOfWeekdays()[i].timeRange;
        allTimeRangesAndWeekDays.types[currentArrayNumber].comment = this.getAllTimeRangesOfWeekdays()[i].comment;
      } else if

        (allTimeRangesAndWeekDays.types[currentArrayNumber].timeRange === this.getAllTimeRangesOfWeekdays()[i].timeRange && allTimeRangesAndWeekDays.types[currentArrayNumber].comment === this.getAllTimeRangesOfWeekdays()[i].comment) {
        allTimeRangesAndWeekDays.types[currentArrayNumber].weekdays.push(this.getAllTimeRangesOfWeekdays()[i].weekday);
      } else {
        currentArrayNumber = currentArrayNumber + 1;
        allTimeRangesAndWeekDays.types.push({
          weekdays: [],
          timeRange: '',
          comment: ''
        });
        allTimeRangesAndWeekDays.types[currentArrayNumber].weekdays.push(this.getAllTimeRangesOfWeekdays()[i].weekday);
        allTimeRangesAndWeekDays.types[currentArrayNumber].timeRange = this.getAllTimeRangesOfWeekdays()[i].timeRange;
        allTimeRangesAndWeekDays.types[currentArrayNumber].comment = this.getAllTimeRangesOfWeekdays()[i].comment === '' ? 'closed' : this.getAllTimeRangesOfWeekdays()[i].comment;
      }
    }
    return allTimeRangesAndWeekDays;
  }
}
