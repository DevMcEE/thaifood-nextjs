import workingTimeData from '../assets/workingTime';
import dayjs, { Dayjs } from 'dayjs';
import UTC from 'dayjs/plugin/utc';
import timeZone from 'dayjs/plugin/timezone';
import {
  IWorkingStatus,
  IWeekdayWorkingData,
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
  private currentWorkingStartDateTime: Dayjs;
  private currentWorkingEndDateTime: Dayjs;
  private currentWorkingDayData: IWeekdayWorkingData;
  private allOpenWorkingDaysDataArray: IWeekdayWorkingData[];
  private todaysWeekdayIndex: number;
  private nextWorkingDayData: IWeekdayWorkingData;

  constructor(private workingWeekDataArray: IWeekdayWorkingData[] = workingTimeData) {}

  getStatus(): IWorkingStatus {
    this.todaysWeekdayIndex = dayjs().day();
    this.allOpenWorkingDaysDataArray = this.workingWeekDataArray.filter(({ isOpen }) => isOpen);
    this.currentWorkingDayData = this.workingWeekDataArray.find(({ index }) => index === this.todaysWeekdayIndex);

    const [startHours, startMinutes] = this.currentWorkingDayData.start.split(':');
    this.currentWorkingStartDateTime = dayjs()
      .clone()
      .hour(parseInt(startHours))
      .minute(parseInt(startMinutes));

    const [endHours, endMinutes] = this.currentWorkingDayData.end.split(':');
    this.currentWorkingEndDateTime = dayjs()
      .clone()
      .hour(parseInt(endHours))
      .minute(parseInt(endMinutes));

    if (!this.allOpenWorkingDaysDataArray.length) {
      return this.getStatusOnAllDaysClosed();
    }

    if (!this.currentWorkingDayData.isOpen) {
      return this.getStatusOnClosedState();
    }

    if (dayjs().isSameOrBefore(this.currentWorkingStartDateTime)) {
      return this.getStatusOnOpenStateTimeBefore();
    }

    if (dayjs().isBetween(this.currentWorkingStartDateTime, this.currentWorkingEndDateTime)) {
      return this.getStatusOnOpenStateTimeBetween();
    }

    if (dayjs().isSameOrAfter(this.currentWorkingEndDateTime)) {
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
    const timeDiff = this.currentWorkingStartDateTime.diff(dayjs());
    const timeDiffHours = dayjs.duration(timeDiff).asHours();

    return {
      isOpen: false,
      message: this.buildStatusMessage({
        isOpenNow: false,
        nextStatusTime: this.currentWorkingDayData.start,
        nextStatusDetails: {
          duration: timeDiffHours,
          unit: DurationTimeUnit.hours,
        },
      }),
      statusColor: WorkingStatusColor.yellow,
    };
  }

  getStatusOnOpenStateTimeBetween() {
    const timeDiff = this.currentWorkingEndDateTime.diff(dayjs());
    const timeDiffAmountHours = Math.round(dayjs.duration(timeDiff).asHours());
    const timeDiffAmountMinutes = dayjs.duration(timeDiff).asMinutes();

    let timeDiffAmount = timeDiffAmountHours;
    let timeDiffUnit = DurationTimeUnit.hours;

    const isLessThanHour = timeDiffAmountHours < 1;

    if (isLessThanHour) {
      timeDiffAmount = timeDiffAmountMinutes;
      timeDiffUnit = DurationTimeUnit.minutes;
    }

    let nextStatusDetails;

    if (timeDiffAmountHours <= 3 || isLessThanHour) {
      nextStatusDetails = {
        duration: timeDiffAmount,
        unit: timeDiffUnit,
      };
    }

    return {
      isOpen: true,
      message: this.buildStatusMessage({
        isOpenNow: true,
        nextStatusTime: this.currentWorkingDayData.end,
        nextStatusDetails,
      }),
      statusColor: isLessThanHour
        ? WorkingStatusColor.yellow
        : WorkingStatusColor.green,
    };
  }

  getStatusOnOpenStateTimeAfter() {
    this.nextWorkingDayData = this.allOpenWorkingDaysDataArray.find(
      ({ index }) => index > this.todaysWeekdayIndex || index === 0
    );
    let isItTomorrow = false;

    if (this.nextWorkingDayData) {
      const weekdaysIndexDiff = this.nextWorkingDayData.index - this.todaysWeekdayIndex;
      isItTomorrow = weekdaysIndexDiff === 1 || weekdaysIndexDiff === -6;
    } else {
      // set first working day
      this.nextWorkingDayData = this.allOpenWorkingDaysDataArray[0];
    }

    return {
      isOpen: false,
      message: this.buildStatusMessage({
        isOpenNow: false,
        nextStatusTime: this.nextWorkingDayData.start,
        isItTomorrow,
      }),
      statusColor: this.currentWorkingDayData.isOpen
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
      !this.currentWorkingDayData.isOpen &&
      this.currentWorkingDayData.message
    ) {
      openStatusMessage = ` (${this.currentWorkingDayData.message})`;
    }

    let nextStatusDetailsMessage = '';

    if (nextStatusDetails) {
      nextStatusDetailsMessage = `, in ${Object.values(nextStatusDetails).join(' ')}`;
    }

    if (!nextStatusDetailsMessage && this.nextWorkingDayData) {
      nextStatusDetailsMessage = `, ${capitalize(
        this.nextWorkingDayData.weekday
      )}`;
    }

    const nextStatusMessage = isItTomorrow
      ? `${nextStatus} ${nextStatusTime}, tomorrow`
      : `${nextStatus} ${nextStatusTime}${nextStatusDetailsMessage}`;

    return hasNextWorkingDay
      ? `${openStatus}${openStatusMessage} ${splitter} ${nextStatusMessage}`
      : `${openStatus}${openStatusMessage}`;
  }
}
