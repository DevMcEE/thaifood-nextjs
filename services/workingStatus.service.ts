import dayjs, { Dayjs } from 'dayjs';
import UTC from 'dayjs/plugin/utc';
import timeZone from 'dayjs/plugin/timezone';
import {
  IWorkingStatus,
  IWeekdayWorkingData,
  WorkingStatusColor,
} from '../components/mainPage/mainPage.type';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import duration from 'dayjs/plugin/duration';
import {
  IBuildStatusProps,
  MessageSplitter,
} from './workingTimeService.type';
import { capitalize } from '../utils/text.utils';
import { DateTime, Settings, Interval } from 'luxon';

Settings.defaultZone = 'Europe/Tallinn';

dayjs.extend(UTC);
dayjs.extend(timeZone);
dayjs.tz.setDefault('Europe/Tallinn');
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);

export class WorkingStatusService {
  static getStatus() {
    throw new Error('Method not implemented.');
  }
  private currentWorkingStartDateTime: DateTime;
  private currentWorkingEndDateTime: DateTime;
  private currentWorkingDayData: IWeekdayWorkingData;
  private allOpenWorkingDaysDataArray: IWeekdayWorkingData[];
  private todaysWeekdayIndex: number;
  private nextWorkingDayData: IWeekdayWorkingData;

  private detailedTimeoutBeforeWorkingStatusChangedHours = +process.env.DETAILED_TIMEOUT_BEFORE_WORKING_STATUS_CHANGED_STARTS_BEFORE_HOURS || 3;

  constructor(
    private workingWeekDataArray: IWeekdayWorkingData[],
    private translator?: (key: string) => string
  ) {
    if (!Array.isArray(workingWeekDataArray) || workingWeekDataArray.length !== 7) {
      throw new TypeError('Invalid workingWeekDataArray type');
    }
  }

  getStatus(): IWorkingStatus {
    this.todaysWeekdayIndex = DateTime.now().weekday;
    this.allOpenWorkingDaysDataArray = this.workingWeekDataArray.filter(
      ({ isOpen }) => isOpen
    );
    this.currentWorkingDayData = this.workingWeekDataArray.find(
      ({ index }) => index === this.todaysWeekdayIndex
    );

    this.currentWorkingStartDateTime = DateTime.fromISO(this.currentWorkingDayData.start);//this.getCurrentDateTime(this.currentWorkingDayData.start);
    this.currentWorkingEndDateTime = DateTime.fromISO(this.currentWorkingDayData.end);

    if (!this.allOpenWorkingDaysDataArray.length) {
      return this.getStatusOnAllDaysClosed();
    }

    if (!this.currentWorkingDayData.isOpen) {
      return this.getStatusOnClosedState();
    }

    if (DateTime.now() <= this.currentWorkingStartDateTime) {
      return this.getStatusOnOpenStateTimeBefore();
    }

    if ( this.currentWorkingStartDateTime < DateTime.now() && DateTime.now() < this.currentWorkingEndDateTime) {
      return this.getStatusOnOpenStateTimeBetween();
    }

    if (DateTime.now() >= this.currentWorkingEndDateTime) {
      return this.getStatusOnOpenStateTimeAfter();
    }
  }

  private getStatusOnAllDaysClosed(): IWorkingStatus {
    return {
      isOpen: false,
      comment: this.buildStatusMessage({
        isOpenNow: false,
        hasNextWorkingDay: false,
        nextStatusTime: '',
      }),
      statusColor: WorkingStatusColor.red,
    };
  }

  private getStatusOnOpenStateTimeBefore(): IWorkingStatus {
    let nextStatusDetails = this.getNextStatusDetails(this.currentWorkingStartDateTime);

    return {
      isOpen: false,
      comment: this.buildStatusMessage({
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
    const isLessThanHour = this.currentWorkingEndDateTime.diff(DateTime.now()).as('hours') < 1;

    return {
      isOpen: true,
      comment: this.buildStatusMessage({
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
      comment: this.buildStatusMessage({
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

  private getNextStatusDetails(
    nextStatusDateTime: DateTime,
    hoursBeforeToStartShowingDetails = this.detailedTimeoutBeforeWorkingStatusChangedHours
  ): string {
    const { hours, minutes } = nextStatusDateTime.diff(DateTime.now(),['hours','minutes']).toObject();

    if(hours > hoursBeforeToStartShowingDetails - 1){
      return '';
    }
  
    const hoursResult = hours > 0 ? hours + this.t('hours') : '';
    const minutesResult = minutes > 0 ? Math.round(minutes) + this.t('minutes') : '';

    return `${hoursResult} ${minutesResult}`.trim();
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
    const nextStatus = isOpenNow ? this.t('closes') : this.t('opens');

    let openStatusMessage = '';

    if (
      !this.currentWorkingDayData.isOpen &&
      this.currentWorkingDayData.comment
    ) {
      openStatusMessage = ` (${this.currentWorkingDayData.comment})`;
    }

    let nextStatusDetailsMessage = '';

    if (nextStatusDetails) {
      nextStatusDetailsMessage = `, ${this.t('inBefore')}${
        nextStatusDetails}${this.t('inAfter')}`.trim();
    }

    if (!nextStatusDetailsMessage && this.nextWorkingDayData) {
      nextStatusDetailsMessage = `, ${capitalize(
        this.nextWorkingDayData.weekday
      )}`;
    }

    const nextStatusMessage = isItTomorrow
      ? `${nextStatus} ${nextStatusTime}, ${this.t('tomorrow')}`
      : `${nextStatus} ${nextStatusTime}${nextStatusDetailsMessage}`;

    return hasNextWorkingDay
      ? `${openStatus}${openStatusMessage} ${splitter} ${nextStatusMessage}`
      : `${openStatus}${openStatusMessage}`;
  }

  private t(key: string) {
    if (this.translator) {
      return this.translator(`workingTime.${key}`);
    }

    return key;
  }
}
