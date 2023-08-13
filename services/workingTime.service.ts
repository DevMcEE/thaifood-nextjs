import workingTimeData from '../assets/workingTime';
import dayjs, { Dayjs } from 'dayjs';
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
import {
  DurationTimeUnit,
  IBuildStatusProps,
  MessageSplitter,
} from './workingTimeService.type';
import { capitalize } from '../utils/text.utils';

dayjs.extend(UTC);
dayjs.extend(timeZone);
dayjs.tz.setDefault('Europe/Tallinn');
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);

export class WorkingTimeService {
  private workingStartDateTime: Dayjs;
  private workingEndDateTime: Dayjs;
  private currentWorkingTimeData: IWorkingTime;
  private workingDays: IWorkingTime[];
  private currentWeekdayIndex: number;
  private nextWorkingTimeDate: IWorkingTime;

  constructor(private workingTime: IWorkingTime[] = workingTimeData) {}

  getStatus(): IWorkingStatus {
    this.currentWeekdayIndex = dayjs().day();

    this.workingDays = this.workingTime.filter(({ isOpen }) => isOpen);

    this.currentWorkingTimeData = this.workingTime.find(({ index }) => {
      return index === this.currentWeekdayIndex;
    });

    const [startHours, startMinutes] =
      this.currentWorkingTimeData.start.split(':');
    this.workingStartDateTime = dayjs()
      .clone()
      .hour(parseInt(startHours))
      .minute(parseInt(startMinutes));

    const [endHours, endMinutes] = this.currentWorkingTimeData.end.split(':');
    this.workingEndDateTime = dayjs()
      .clone()
      .hour(parseInt(endHours))
      .minute(parseInt(endMinutes));

    if (!this.workingDays.length) {
      return this.getStatusOnAllDaysClosed();
    }

    if (!this.currentWorkingTimeData.isOpen) {
      return this.getStatusOnClosedState();
    }

    if (dayjs().isSameOrBefore(this.workingStartDateTime)) {
      return this.getStatusOnOpenStateTimeBefore();
    }

    if (dayjs().isBetween(this.workingStartDateTime, this.workingEndDateTime)) {
      return this.getStatusOnOpenStateTimeBetween();
    }

    if (dayjs().isSameOrAfter(this.workingEndDateTime)) {
      return this.getStatusOnOpenStateTimeAfter();
    }
  }

  getStatusOnAllDaysClosed() {
    return {
      isOpen: false,
      message: this.buildStatusMessage({
        isOpenNow: false,
        hasNextWorkingDay: false,
        nextStatusTime: '',
      }),
      statusColor: WorkingStatusColor.red,
    };
  }

  getStatusOnOpenStateTimeBefore() {
    const timeDiff = this.workingStartDateTime.diff(dayjs());
    const timeDiffHours = dayjs.duration(timeDiff).asHours();

    return {
      isOpen: false,
      message: this.buildStatusMessage({
        isOpenNow: false,
        nextStatusTime: this.currentWorkingTimeData.start,
        nextStatusDetails: {
          duration: timeDiffHours,
          unit: DurationTimeUnit.hours,
        },
      }),
      statusColor: WorkingStatusColor.yellow,
    };
  }

  getStatusOnOpenStateTimeBetween() {
    const timeDiff = this.workingEndDateTime.diff(dayjs());
    const timeDiffAmountHours = Math.round(dayjs.duration(timeDiff).asHours());
    const timeDiffAmountMinutes = dayjs.duration(timeDiff).asMinutes();

    let timeDiffAmount = timeDiffAmountHours;
    let timeDiffUnit = DurationTimeUnit.hours;

    const isLessThan1Hour = timeDiffAmountHours < 1;

    if (isLessThan1Hour) {
      timeDiffAmount = timeDiffAmountMinutes;
      timeDiffUnit = DurationTimeUnit.minutes;
    }

    let nextStatusDetails;

    if (timeDiffAmountHours <= 3 || isLessThan1Hour) {
      nextStatusDetails = {
        duration: timeDiffAmount,
        unit: timeDiffUnit,
      };
    }

    return {
      isOpen: true,
      message: this.buildStatusMessage({
        isOpenNow: true,
        nextStatusTime: this.currentWorkingTimeData.end,
        nextStatusDetails,
      }),
      statusColor: isLessThan1Hour
        ? WorkingStatusColor.yellow
        : WorkingStatusColor.green,
    };
  }

  getStatusOnOpenStateTimeAfter() {
    this.nextWorkingTimeDate = this.workingDays.find(
      ({ index }) => index > this.currentWeekdayIndex || index === 0
    );
    let isItTomorrow = false;

    if (this.nextWorkingTimeDate) {
      const weekdaysIndexDiff = this.nextWorkingTimeDate.index - this.currentWeekdayIndex;
      isItTomorrow = weekdaysIndexDiff === 1 || weekdaysIndexDiff === -6;
    } else {
      // set first working day
      this.nextWorkingTimeDate = this.workingDays[0];
    }

    return {
      isOpen: false,
      message: this.buildStatusMessage({
        isOpenNow: false,
        nextStatusTime: this.nextWorkingTimeDate.start,
        isItTomorrow,
      }),
      statusColor: this.currentWorkingTimeData.isOpen
        ? WorkingStatusColor.gray
        : WorkingStatusColor.red,
    };
  }

  getStatusOnClosedState() {
    return this.getStatusOnOpenStateTimeAfter();
  }

  buildStatusMessage({
    isOpenNow,
    nextStatusDetails = null,
    nextStatusTime = '',
    splitter = MessageSplitter.dot,
    isItTomorrow = false,
    hasNextWorkingDay = true,
  }: IBuildStatusProps) {
    const openStatus = isOpenNow ? 'open' : 'closed';
    const nextStatus = isOpenNow ? 'closes' : 'opens';

    let openStatusMessage = '';

    if (
      !this.currentWorkingTimeData.isOpen &&
      this.currentWorkingTimeData.message
    ) {
      openStatusMessage = ` (${this.currentWorkingTimeData.message})`;
    }

    let nextStatusDitailsMessage = '';

    if (nextStatusDetails) {
      nextStatusDitailsMessage = `, in ${Object.values(nextStatusDetails).join(' ')}`;
    }

    if (!nextStatusDitailsMessage && this.nextWorkingTimeDate) {
      nextStatusDitailsMessage = `, ${capitalize(
        this.nextWorkingTimeDate.weekday
      )}`;
    }

    const nextStatusMessage = isItTomorrow
      ? `${nextStatus} ${nextStatusTime}, tomorrow`
      : `${nextStatus} ${nextStatusTime}${nextStatusDitailsMessage}`;

    return hasNextWorkingDay
      ? `${openStatus}${openStatusMessage} ${splitter} ${nextStatusMessage}`
      : `${openStatus}${openStatusMessage}`;
  }
}
