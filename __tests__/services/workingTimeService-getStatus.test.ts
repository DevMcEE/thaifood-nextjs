import dayjs from 'dayjs';
import UTC from 'dayjs/plugin/utc';
import timeZone from 'dayjs/plugin/timezone';
import workingTime from '../../__mocks__/dataSets/workingTime';
import { WorkingStatusColor } from "../../pages/mainPage.type";
import { WorkingTimeService } from "../../services/workingTime.service"

dayjs.extend(UTC)
dayjs.extend(timeZone)
dayjs.tz.setDefault("Europe/Tallinn");

// mock
const translator = (key: string) => {
  const [_, text] = key.split('.');

  if (text === 'inBefore') return 'in ';
  if (text === 'inAfter') return '';

  return text;
}

describe('WorkingTimeService.getStatus', () => {
  let workingTimeService;
  beforeEach(() =>{
    workingTimeService = new WorkingTimeService(workingTime, translator)
  });
  afterEach(() =>{
    workingTimeService = undefined;
  });
  describe('1.1 when time 13:00 in the middle of working day on monday', () => {
    beforeAll(() => {
      const dateTime = dayjs().day(1).hour(13).minute(0)
      jest
        .useFakeTimers()
        .setSystemTime(dateTime.toDate());
    })
    it('should show open status', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: true,
        message: 'open · closes 20:15',
        statusColor: WorkingStatusColor.green
      })
    })
  })
  describe('1.2 when time is 2 hours 15min before close (monday)', () => {
    beforeAll(() => {
      const dateTime = dayjs().day(1).hour(18).minute(0)
      jest
        .useFakeTimers()
        .setSystemTime(dateTime.toDate());
    })
    it('should show open status and closes in 2 hours', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: true,
        message: 'open · closes 20:15, in 2 hours',
        statusColor: WorkingStatusColor.green
      })
    })
  })
  describe('1.2 when time is 2 hours 45 min before close (monday)', () => {
    beforeAll(() => {
      const dateTime = dayjs().day(1).hour(17).minute(25)
      jest
        .useFakeTimers()
        .setSystemTime(dateTime.toDate());
    })
    it('should show open status and closes in 3 hours', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: true,
        message: 'open · closes 20:15, in 3 hours',
        statusColor: WorkingStatusColor.green
      })
    })
  })
  describe('1.3 when time is less than 1 hour before close (monday)', () => {
    beforeAll(() => {
      const dateTime = dayjs().day(1).hour(20).minute(0)
      jest
        .useFakeTimers()
        .setSystemTime(dateTime.toDate());
    })
    it('should show open status and closes in 15 minutes', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: true,
        message: 'open · closes 20:15, in 15 minutes',
        statusColor: WorkingStatusColor.yellow
      })
    })
  })
  describe('when time 1 hour after end of working day on wednesday', () => {
    beforeAll(() => {
      const dateTime = dayjs().day(1).hour(21).minute(0)
      jest
        .useFakeTimers()
        .setSystemTime(dateTime.toDate());
    })
    it('should show closed status', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: false,
        message: 'closed · opens 11:00, tomorrow',
        statusColor: WorkingStatusColor.gray
      })
    })
  })
  describe('when time 1 hour after end of working day on wednesday', () => {
    let workingTimeService;
    beforeAll(() => {
      const dateTime = dayjs().day(1).hour(21).minute(0)
      jest
        .useFakeTimers()
        .setSystemTime(dateTime.toDate());
      const testData = workingTime.map((weekdayData) => {
        return {
          ...weekdayData,
          isOpen: [2, 3].includes(weekdayData.index)
            ? false
            : weekdayData.isOpen,
          message: ![2, 3].includes(weekdayData.index) && weekdayData.isOpen ? 'Public holiday' : weekdayData.message
        }
      });

      workingTimeService = new WorkingTimeService(testData,  translator)
    })
    it('should show closed status', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: false,
        message: 'closed · opens 11:00, Thursday',
        statusColor: WorkingStatusColor.gray
      })
    })
  })
  describe('when time 2 hours before start on thursday', () => {
    let workingTimeService;
    beforeAll(() => {
      const dateTime = dayjs().day(4).hour(9).minute(0)
      jest
        .useFakeTimers()
        .setSystemTime(dateTime.toDate());
      workingTimeService = new WorkingTimeService(workingTime, translator)
    })
    it('should show closed status', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: false,
        message: 'closed · opens 11:00, in 2 hours',
        statusColor: WorkingStatusColor.yellow
      })
    })
  })
  describe('when time 1h 15min before start on thursday', () => {
    let workingTimeService;
    beforeAll(() => {
      const dateTime = dayjs().day(4).hour(9).minute(45)
      jest
        .useFakeTimers()
        .setSystemTime(dateTime.toDate());
      workingTimeService = new WorkingTimeService(workingTime, translator)
    });
    it('should show closed status', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: false,
        message: 'closed · opens 11:00, in 1 hours',
        statusColor: WorkingStatusColor.yellow
      })
    })
  })
  describe('when time 25min before start on thursday', () => {
    let workingTimeService;
    beforeAll(() => {
      const dateTime = dayjs().day(4).hour(10).minute(45)
      jest
        .useFakeTimers()
        .setSystemTime(dateTime.toDate());
      workingTimeService = new WorkingTimeService(workingTime, translator)
    });
    it('should show closed status', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: false,
        message: 'closed · opens 11:00, in 15 minutes',
        statusColor: WorkingStatusColor.yellow
      })
    })
  })
  describe('when it is closed due to public holiday', () => {
    beforeAll(() => {
      const dateTime = dayjs().day(5).hour(13).minute(0)
      jest
        .useFakeTimers()
        .setSystemTime(dateTime.toDate());
    })
    it('should show closed status', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: false,
        message: 'closed (public holiday) · opens 12:00, tomorrow',
        statusColor: WorkingStatusColor.red
      })
    })
  })
  describe('when it is closed due to public holiday', () => {
    let workingTimeService;
    beforeAll(() => {
      const dateTime = dayjs().day(4).hour(13).minute(0)
      jest
        .useFakeTimers()
        .setSystemTime(dateTime.toDate());
      const testData = workingTime.map((weekdayData) => {
        return {
          ...weekdayData,
          isOpen: [4, 5].includes(weekdayData.index)
            ? false
            : weekdayData.isOpen,
          message: 'public holiday'
        }
      })
      workingTimeService = new WorkingTimeService(testData, translator)
    })
    it('should show closed status', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: false,
        message: 'closed (public holiday) · opens 12:00, Saturday',
        statusColor: WorkingStatusColor.red
      })
    })
  })
  describe('when it is closed due to public holiday', () => {
    let workingTimeService;
    beforeAll(() => {
      const dateTime = dayjs().day(5).hour(13).minute(0)
      jest
        .useFakeTimers()
        .setSystemTime(dateTime.toDate());
      const testData = workingTime.map((weekdayData) => {
        return {
          ...weekdayData,
          isOpen: [5, 6, 0].includes(weekdayData.index)
            ? false
            : weekdayData.isOpen
        }
      })
      workingTimeService = new WorkingTimeService(testData, translator)
    })
    it('should show closed status', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: false,
        message: 'closed (public holiday) · opens 11:00, Monday',
        statusColor: WorkingStatusColor.red
      })
    })
  })
  describe('when all days are closed in the data', () => {
    let workingTimeService;
    beforeAll(() => {
      const dateTime = dayjs().day(5).hour(13).minute(0)
      jest
        .useFakeTimers()
        .setSystemTime(dateTime.toDate());
      const testData = workingTime.map((weekdayData) => {
        return {
          ...weekdayData,
          isOpen: false
        }
      })
      workingTimeService = new WorkingTimeService(testData, translator)
    })
    it('should show closed status', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: false,
        message: 'closed (public holiday)',
        statusColor: WorkingStatusColor.red
      })
    })
  })
})

