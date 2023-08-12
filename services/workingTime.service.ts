import workingTimeData from '../assets/workingTime';
import dayjs from 'dayjs';
import UTC from 'dayjs/plugin/utc';
import timeZone from 'dayjs/plugin/timezone';
import {
  IWorkingStatus,
  IWorkingTime,
  WorkingStatusColor,
} from '../pages/mainPage.type';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import duration from 'dayjs/plugin/duration';

dayjs.extend(UTC);
dayjs.extend(timeZone);
dayjs.tz.setDefault('Europe/Tallinn');
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);

export class WorkingTimeService {
  constructor(private workingTime: IWorkingTime[] = workingTimeData) {}
  getStatus(): IWorkingStatus {
    const currentWeekdayIndex = dayjs().day();

    let workingTimeData: IWorkingTime = this.workingTime.find(({ index }) => {
      return index === currentWeekdayIndex;
    });

    const [startHours, startMinutes] = workingTimeData.start.split(':');
    const workingStartDateTime = dayjs()
      .clone()
      .hour(parseInt(startHours))
      .minute(parseInt(startMinutes));
    
    const [endHours, endMinutes] = workingTimeData.end.split(':');
    const workingEndDateTime = dayjs()
      .clone()
      .hour(parseInt(endHours))
      .minute(parseInt(endMinutes));

    // day is cLosed or time after end
    if (!workingTimeData.isOpen || dayjs().isSameOrAfter(workingEndDateTime)) {
      const workingDays: IWorkingTime[] = this.workingTime.filter(
        ({ isOpen }) => isOpen
      );

      let nextWorkingDateMessage = '';
      let nextWorkingDayData = workingDays.find(
        ({ index }) => index > currentWeekdayIndex || index === 0
      );

      if (nextWorkingDayData) {
        const weekdaysIndexDiff =
          nextWorkingDayData.index - currentWeekdayIndex;
        let isItTomorrow = weekdaysIndexDiff === 1 || weekdaysIndexDiff === -6;
        nextWorkingDateMessage = isItTomorrow
          ? `opens tomorrow at ${nextWorkingDayData.start}`
          : `opens at ${nextWorkingDayData.start}, on ${nextWorkingDayData.weekday}`;
      } else {
        nextWorkingDateMessage = `opens at ${workingDays[0].start}, ${workingDays[0].weekday}`;
      }
      return {
        isOpen: false,
        message: `closed${
          workingTimeData.message ? ` (${workingTimeData.message})` : ''
        }, ${nextWorkingDateMessage}`,
        statusColor: workingTimeData.isOpen
          ? WorkingStatusColor.gray
          : WorkingStatusColor.red,
      };
    }

    if (dayjs().isSameOrBefore(workingStartDateTime)) {
      const timeDiff = workingStartDateTime.diff(dayjs());
      const timeDiffHours = dayjs.duration(timeDiff).asHours();
  
      return {
        isOpen: false,
        message: `closed, opens at ${workingTimeData.start} (in ${timeDiffHours} hours)`,
        statusColor: WorkingStatusColor.yellow,
      };
    }

    if (dayjs().isBetween(workingStartDateTime, workingEndDateTime)) {
      const timeDiff = workingEndDateTime.diff(dayjs());

      const timeDiffAmountHours = dayjs.duration(timeDiff).asHours();
      const timeDiffAmountMinutes = dayjs.duration(timeDiff).asMinutes()
      
      let timeDiffAmount = timeDiffAmountHours;
      let timeDiffUnit = ' hours';
      
      const isLessThan1Hour = timeDiffAmountHours < 1;

      if (isLessThan1Hour) {
        timeDiffAmount = timeDiffAmountMinutes;
        timeDiffUnit = ' minutes';
      }
    
      return {
        isOpen: true,
        message: `open (closes at ${workingTimeData.end}${
          timeDiffAmountHours <= 3 || isLessThan1Hour ? `, in ${timeDiffAmount}${timeDiffUnit}` : ''
        })`,
        statusColor: isLessThan1Hour 
          ? WorkingStatusColor.yellow
          : WorkingStatusColor.green,
      };
    }
  }
}
