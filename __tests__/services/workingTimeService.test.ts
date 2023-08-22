import workingTime from '../../__mocks__/dataSets/workingTime';
import { WorkingTimeService } from '../../services/workingTime.service';

// mock
const translator = (key: string) => {
  const [_, text] = key.split('.');

  return text;
}

describe('WorkingTimeService.getList', () => {
  let workingTimeService:WorkingTimeService, testData;
  beforeAll(() => {
    testData = workingTime.map((weekdayData) => {
      return {
        ...weekdayData,
        isOpen: true,
        comment: '',
        start: "11:00",
        end: "20:15",
      }
    });
  })
  beforeEach(() =>{
   // workingTimeService = new WorkingTimeService(testData, translator)
  });
  afterEach(() =>{
    workingTimeService = undefined;
  });
  describe('1. when all weekdays have same start and end times', () => {
    beforeAll(() => {
     
      workingTimeService = new WorkingTimeService(testData,  translator)
    })
    it('should show all weekdays as a single group', () => {
      const list = workingTimeService.getList();
      expect(list.length).toBe(1);
      expect(list[0]).toMatchObject({
        weekdays: 'monday - sunday',
        timeRange: '11:00 - 20:15',
        comment: '',
      })
    })
  })

  describe('2. when sat and sun have different working time', () => {
    beforeAll(() => {
      const newTestData = testData.map((weekdayData) => {
        let start = weekdayData.start;
        let end = weekdayData.end;
        if (weekdayData.weekday === 'saturday') {
          start = '15:15';
          end = '20:20';
        }
        if (weekdayData.weekday === 'sunday') {
          start = '16:16';
          end = '21:21';
        }

        return {
          ...weekdayData,
          isOpen: true,
          start,
          end,
        }
      });
      workingTimeService = new WorkingTimeService(newTestData,  translator)
    })
    it('should show sat and sun as separate groups', () => {
      const list = workingTimeService.getList();
      expect(list.length).toBe(3);
      expect(list[0]).toMatchObject({
        weekdays: 'monday - friday',
        timeRange: '11:00 - 20:15',
        comment: '',
      })
      expect(list[1]).toMatchObject({
        weekdays: 'saturday',
        timeRange: '15:15 - 20:20',
        comment: '',
      })
      expect(list[2]).toMatchObject({
        weekdays: 'sunday',
        timeRange: '16:16 - 21:21',
        comment: '',
      })
    })
  })
  describe('3. when sun is closed', () => {
    beforeAll(() => {
      const newTestData = testData.map((weekdayData) => {
        return {
          ...weekdayData,
          isOpen: weekdayData.weekday !== 'sunday',
        }
      });
      workingTimeService = new WorkingTimeService(newTestData,  translator)
    })
    it('should show sun as a separate group', () => {
      const list = workingTimeService.getList();
      expect(list.length).toBe(2);
      expect(list[0]).toMatchObject({
        weekdays: 'monday - saturday',
        timeRange: '11:00 - 20:15',
        comment: '',
      })
      expect(list[1]).toMatchObject({
        weekdays: 'sunday',
        timeRange: 'closed',
        comment: '',
      })
    })
  })
  describe('4. when sat and sun are closed and have different comments', () => {
    beforeAll(() => {
      const newTestData = testData.map((weekdayData) => {
        return {
          ...weekdayData,
          isOpen: weekdayData.weekday !== 'saturday' && weekdayData.weekday !== 'sunday',
          comment: weekdayData.weekday + ' comment'
        }
      });
      workingTimeService = new WorkingTimeService(newTestData,  translator)
    })
    it('should show sat and sun separate groups', () => {
      const list = workingTimeService.getList();
      expect(list.length).toBe(3);
      expect(list[0]).toMatchObject({
        weekdays: 'monday - friday',
        timeRange: '11:00 - 20:15',
        comment: '',
      })
      expect(list[1]).toMatchObject({
        weekdays: 'saturday',
        timeRange: 'closed',
        comment: 'saturday comment',
      })
      expect(list[2]).toMatchObject({
        weekdays: 'sunday',
        timeRange: 'closed',
        comment: 'sunday comment',
      })
    })
  })
  describe('5. when wed and sat are closed and have different comments', () => {
    beforeAll(() => {
      const newTestData = testData.map((weekdayData) => {
        return {
          ...weekdayData,
          isOpen: weekdayData.weekday !== 'wednesday' && weekdayData.weekday !== 'saturday',
          comment: weekdayData.weekday + ' comment'
        }
      });
      workingTimeService = new WorkingTimeService(newTestData,  translator)
    })
    it('should show wed and sat separate groups', () => {
      const list = workingTimeService.getList();
      expect(list.length).toBe(5);
      expect(list[0]).toMatchObject({
        weekdays: 'monday - tuesday',
        timeRange: '11:00 - 20:15',
        comment: '',
      })
      expect(list[1]).toMatchObject({
        weekdays: 'wednesday',
        timeRange: 'closed',
        comment: 'wednesday comment',
      })
      expect(list[2]).toMatchObject({
        weekdays: 'thursday - friday',
        timeRange: '11:00 - 20:15',
        comment: '',
      })
      expect(list[3]).toMatchObject({
        weekdays: 'saturday',
        timeRange: 'closed',
        comment: 'saturday comment',
      })
      expect(list[4]).toMatchObject({
        weekdays: 'sunday',
        timeRange: '11:00 - 20:15',
        comment: '',
      })
    })
  })
  describe('6. when sat and sun are closed or have same comments', () => {
    beforeAll(() => {
      const newTestData = testData.map((weekdayData) => {
        return {
          ...weekdayData,
          isOpen: weekdayData.weekday !== 'saturday' && weekdayData.weekday !== 'sunday',
          comment: weekdayData.weekday !== 'saturday' && weekdayData.weekday !== 'sunday' ? weekdayData.weekday + ' comment' : 'weekend comment'
        }
      });
      workingTimeService = new WorkingTimeService(newTestData,  translator)
    })
    it('should show sat and sun separate groups', () => {
      const list = workingTimeService.getList();
      expect(list.length).toBe(2);
      expect(list[0]).toMatchObject({
        weekdays: 'monday - friday',
        timeRange: '11:00 - 20:15',
        comment: '',
      })
      expect(list[1]).toMatchObject({
        weekdays: 'saturday - sunday',
        timeRange: 'closed',
        comment: 'weekend comment',
      })
    })
  })
  describe('7. when wen is different and sun is closed', () => {
    beforeAll(() => {
      const newTestData = testData.map((weekdayData) => {
        let start = weekdayData.start;
        let end = weekdayData.end;
        if (weekdayData.weekday === 'wednesday') {
          start = '15:15';
          end = '20:20';
        }

        return {
          ...weekdayData,
          isOpen: weekdayData.weekday !== 'sunday',
          comment: 'weekend comment',
          start,
          end,
        }
      });
      workingTimeService = new WorkingTimeService(newTestData,  translator)
    })
    it('should show separate wen and sun, other - grouped', () => {
      const list = workingTimeService.getList();
      expect(list.length).toBe(4);
      expect(list[0]).toMatchObject({
        weekdays: 'monday - tuesday',
        timeRange: '11:00 - 20:15',
        comment: '',
      })
      expect(list[1]).toMatchObject({
        weekdays: 'wednesday',
        timeRange: '15:15 - 20:20',
        comment: '',
      })
      expect(list[2]).toMatchObject({
        weekdays: 'thursday - saturday',
        timeRange: '11:00 - 20:15',
      })
      expect(list[3]).toMatchObject({
        weekdays: 'sunday',
        timeRange: 'closed',
        comment: 'weekend comment',
      })
    })
  })
  
})

