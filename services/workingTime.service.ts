import workingTimeData from "../assets/workingTime"
import dayjs from 'dayjs';
import UTC from 'dayjs/plugin/utc';
import timeZone from 'dayjs/plugin/timezone';
import { IWorkingStatus, IWorkingTime, WorkingStatusColor } from "../pages/mainPage.type";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import duration from 'dayjs/plugin/duration';

dayjs.extend(UTC);
dayjs.extend(timeZone);
dayjs.tz.setDefault("Europe/Tallinn");
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);

export class WorkingTimeService {
  constructor(private workingTime: IWorkingTime[] = workingTimeData) {
  }
  getStatus(): IWorkingStatus {
    const currentWeekdayIndex = dayjs().day();

    let workingTimeData: IWorkingTime = this.workingTime
      .find(({ index }) => {
        return index === currentWeekdayIndex
      });

    const workingStartDateTime = dayjs()
      .clone()
      .hour(parseInt(workingTimeData.start.split(':')[0]))
      .minute(parseInt(workingTimeData.start.split(':')[1]))
    const workingEndDateTime = dayjs()
      .clone()
      .hour(parseInt(workingTimeData.end.split(':')[0]))
      .minute(parseInt(workingTimeData.end.split(':')[1]))

    if (!workingTimeData.isOpen || dayjs().isSameOrAfter(workingEndDateTime)) {
      const workingDays: IWorkingTime[] = this.workingTime
        .filter(({ isOpen }) => isOpen);
      let nextWorkingDateMessage = '';
      let nextWorkingDayData = workingDays
        .find(({ index }) => index > currentWeekdayIndex || index === 0);

      if (nextWorkingDayData) {
        const weekdaysIndexDiff = nextWorkingDayData.index - currentWeekdayIndex;
        let isItTomorrow = weekdaysIndexDiff === 1 || weekdaysIndexDiff === -6;
        nextWorkingDateMessage = isItTomorrow
          ? `opens tomorrow at ${nextWorkingDayData.start}`
          : `opens at ${nextWorkingDayData.start}, on ${nextWorkingDayData.weekday}`
      } else {
        nextWorkingDateMessage = `opens at ${workingDays[0].start}, ${workingDays[0].weekday}`
      }
      return {
        isOpen: false,
        message: `closed${workingTimeData.message
          ? ` (${workingTimeData.message})` : ''}, ${nextWorkingDateMessage}`,
        statusColor: workingTimeData.isOpen ? WorkingStatusColor.gray : WorkingStatusColor.red
      }
    }

    if (dayjs().isSameOrBefore(workingStartDateTime)) {
      const timeDiff = workingStartDateTime.diff(dayjs());
      const timeDiffHours = dayjs.duration(timeDiff).asHours();
      return {
        isOpen: false,
        message: `closed, opens at ${workingTimeData.start} (in ${timeDiffHours} hours)`,
        statusColor: WorkingStatusColor.yellow
      }
    }
    if (dayjs().isBetween(workingStartDateTime, workingEndDateTime)) {
      const timeDiff = workingEndDateTime.diff(dayjs());
      const timeDiffHours = dayjs.duration(timeDiff).asHours();
      return {
        isOpen: true,
        message: `open (closes at ${workingTimeData.end}${timeDiffHours <= 3
          ? `, in ${timeDiffHours} hours`
          : ''
          })`,
        statusColor: WorkingStatusColor.green
      }
    }
  }
}