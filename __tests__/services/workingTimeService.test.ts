import dayjs from 'dayjs';
import UTC from 'dayjs/plugin/utc';
import timeZone from 'dayjs/plugin/timezone';
import workingTime from '../../__mocks__/dataSets/workingTime';
import { WorkingStatusColor } from "../../pages/mainPage.type";
import { WorkingTimeService } from "../../services/workingTime.service"

dayjs.extend(UTC)
dayjs.extend(timeZone)
dayjs.tz.setDefault("Europe/Tallinn");

describe('workingTimeServices', () => {
  const workingTimeService = new WorkingTimeService(workingTime)
  describe('when time 13:00 in the middle of working day on monday', () => {
    beforeAll(() => {
      const dateTime = dayjs().day(1).hour(13).minute(0)
      jest
        .useFakeTimers()
        .setSystemTime(dateTime.toDate());
    })
    it('should show open status', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: true,
        message: 'open (closes at 20:15)',
        statusColor: WorkingStatusColor.green
      })
    })
  })
  describe('when time 13:00 in the middle of working day on monday', () => {
    beforeAll(() => {
      const dateTime = dayjs().day(1).hour(18).minute(15)
      jest
        .useFakeTimers()
        .setSystemTime(dateTime.toDate());
    })
    it('should show open status', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: true,
        message: 'open (closes at 20:15, in 2 hours)',
        statusColor: WorkingStatusColor.green
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
        message: 'closed, opens tomorrow at 11:00',
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
            : weekdayData.isOpen
        }
      })
      workingTimeService = new WorkingTimeService(testData)
    })
    it('should show closed status', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: false,
        message: 'closed, opens at 11:00, on thursday',
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
      workingTimeService = new WorkingTimeService()
    })
    it('should show closed status', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: false,
        message: 'closed, opens at 11:00 (in 2 hours)',
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
      console.log('day', dayjs().day())
    })
    it('should show closed status', () => {
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: false,
        message: 'closed (public holiday), opens tomorrow at 12:00',
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
      console.log(testData)
      workingTimeService = new WorkingTimeService(testData)
    })
    it('should show closed status', () => {
      console.log(workingTimeService.getStatus())
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: false,
        message: 'closed (public holiday), opens at 12:00, on saturday',
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
      console.log(testData)
      workingTimeService = new WorkingTimeService(testData)
    })
    it('should show closed status', () => {
      console.log(workingTimeService.getStatus())
      expect(workingTimeService.getStatus()).toMatchObject({
        isOpen: false,
        message: 'closed (public holiday), opens at 11:00, monday',
        statusColor: WorkingStatusColor.red
      })
    })
  })
})