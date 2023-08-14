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
  INextStatusDatails,
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

  constructor(
    private workingWeekDataArray: IWeekdayWorkingData[],
    private translator?: (key: string) => string
    ) {
      if (!Array.isArray(workingWeekDataArray)) {
        throw new TypeError('Invalid workingWeekDataArray type');
      }
    }

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

  private getStatusOnAllDaysClosed(): IWorkingStatus {
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

  private getStatusOnOpenStateTimeBefore() {
    let nextStatusDetails = this.getNextStatusDetails(this.currentWorkingStartDateTime, 2);
    const isLessThanHour = nextStatusDetails && nextStatusDetails.unit === DurationTimeUnit.minutes;

    return {
      isOpen: false,
      message: this.buildStatusMessage({
        isOpenNow: false,
        nextStatusTime: this.currentWorkingDayData.start,
        nextStatusDetails,
      }),
      statusColor: nextStatusDetails 
        ? WorkingStatusColor.yellow
        : WorkingStatusColor.gray,
    };
  }

  private getStatusOnOpenStateTimeBetween(): IWorkingStatus {
    let nextStatusDetails = this.getNextStatusDetails(this.currentWorkingEndDateTime);
    const isLessThanHour = nextStatusDetails && nextStatusDetails.unit === DurationTimeUnit.minutes;

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

  private getStatusOnOpenStateTimeAfter(): IWorkingStatus {
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

  private getStatusOnClosedState(): IWorkingStatus {
    return this.getStatusOnOpenStateTimeAfter();
  }

  private getNextStatusDetails(nextStatusDateTime: Dayjs, hoursBeforeToStartShowingDetails = 3): INextStatusDatails | undefined {
    const timeDiff = nextStatusDateTime.diff(dayjs());
    const timeDiffAmountHours = Math.round(dayjs.duration(timeDiff).asHours());
    const timeDiffAmountMinutes =  Math.round(dayjs.duration(timeDiff).asMinutes());

    let timeDiffAmount = timeDiffAmountHours;
    let timeDiffUnit = DurationTimeUnit.hours;

    const isLessThanHour = timeDiffAmountHours < 1;

    if (isLessThanHour) {
      timeDiffAmount = timeDiffAmountMinutes;
      timeDiffUnit = DurationTimeUnit.minutes;
    }

    let nextStatusDetails: INextStatusDatails;

    if (timeDiffAmountHours <= hoursBeforeToStartShowingDetails) {
      nextStatusDetails = {
        duration: timeDiffAmount,
        unit: this.t(timeDiffUnit) as DurationTimeUnit,
      };
    }

    return nextStatusDetails;
  }
  private buildStatusMessage({
    isOpenNow,
    nextStatusDetails = null,
    nextStatusTime = '',
    splitter = MessageSplitter.dot,
    isItTomorrow = false,
    hasNextWorkingDay = true,
  }: IBuildStatusProps): string {
    const openStatus = isOpenNow ? this.t('open') : this.t('closed');
    const nextStatus = isOpenNow ?  this.t('closes') :  this.t('opens');

    let openStatusMessage = '';

    if (
      !this.currentWorkingDayData.isOpen &&
      this.currentWorkingDayData.message
    ) {
      openStatusMessage = ` (${this.currentWorkingDayData.message})`;
    }

    let nextStatusDetailsMessage = '';

    if (nextStatusDetails) {
      nextStatusDetailsMessage = `, ${this.t('inBefore')}${Object.values(nextStatusDetails).join(' ')}${this.t('inAfter')}`.trim();
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

  private t(key: string) {
    if(this.translator) {
      return this.translator(`workingTime.${key}`);
    }

    return key;
  }
}
