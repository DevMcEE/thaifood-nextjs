import { IWeekdayWorkingData } from "../../components/mainPage/mainPage.type";

export default [
  {
    "index": 1,
    "weekday": "monday",
    "isOpen": true,
    "start": "11:00",
    "end": "20:15",
    "message": ""
  },
  {
    "index": 2,
    "weekday":"tuesday",
    "isOpen": true,
    "start": "11:00",
    "end": "20:15",
    "message": ""
  },
  {
    "index": 3,
    "weekday":"wednesday",
    "isOpen": true,
    "start": "11:00",
    "end": "17:00",
    "message": ""
  },
  {
    "index": 4,
    "weekday":"thursday",
    "isOpen": true,
    "start": "11:00",
    "end": "20:15",
    "message": ""
  },
  {
    "index": 5,
    "weekday":"friday",
    "isOpen": false,
    "start": "12:00",
    "end": "20:15",
    "message": "public holiday",
  }, 
  {
    "index": 6,
    "weekday":"saturday",
    "isOpen": true,
    "start": "12:00",
    "end": "20:15",
    "message": ""
  },
  {
    "index": 0,
    "weekday":"sunday",
    "isOpen": true,
    "start": "12:00",
    "end": "20:00",
    "message": ""
  }
] as IWeekdayWorkingData[];