// https://script.google.com/home/projects/1eD5vgnD11fszNvqTt5Z6IPD361WC5FFK2lF3FiZ5a11LPwBm1AJ4aWx5/edit

function myFunction() {
  const endDate = new Date(2023,1,28);
  const startDate = new Date(2023,0,30);

  run(startDate, endDate);
}

function print(total) {
  Logger.log('totalHours: ' + total.totalHours);  
  Logger.log('meeting: ' + total.meetingHours);  
  Logger.log('work: ' + total.workHours);  
  Logger.log('hoursPerWorkDay: ' + total.hoursPerWorkDay);  
  Logger.log('hoursPerDay: ' + total.hoursPerDay);  
  Logger.log('days: ' + total.days);  
  Logger.log('workedDays: ' + total.workedDays);  
}

function sumHours(reports) {
  const result = reports.reduce((acc, cur) => {
    acc.totalHours += cur.totalHours;
    acc.meetingHours += cur.meetingHours;
    acc.workHours += cur.workHours;
    if(cur.totalHours) {
      acc.workedDays++ 
    }
    return acc
  },{
    totalHours: 0,
    meetingHours: 0,
    workHours: 0,
    workedDays: 0,
  });

  result.days = reports.length;
  result.hoursPerDay = result.totalHours / result.days;
  result.hoursPerWorkDay = result.totalHours / result.workedDays;

  return result;
}

function run(startDate, endDate) {
  Logger.log('run startDate: ' + startDate);  
  Logger.log('run endDate: ' + endDate); 

  const reports = dailyReports(startDate, endDate)

  const total = sumHours(reports);
  print(total);
}

function lastMonthReport() {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth() -1, 1)
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  Logger.log('lastMonthReport startDate: ' + firstDayOfMonth);  
  Logger.log('lastMonthReport endDate: ' + lastDayOfMonth); 

  run(firstDayOfMonth, lastDayOfMonth);
}

function thisMonthReport() {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  Logger.log('lastMonthReport startDate: ' + firstDayOfMonth);  
  Logger.log('lastMonthReport endDate: ' + lastDayOfMonth); 

  run(firstDayOfMonth, lastDayOfMonth);
}

function dailyReports(startDate, endDate) {
 const calendar = CalendarApp.getCalendarsByName("eita")[0];
  Logger.log('dailyReports startDate: ' + startDate + ', endDate: ' + endDate);  

  let date = startDate;
  let reports = [];

  while (date <= endDate) {
    Logger.log('dailyReports while date: ' + date);  
    const report = dailyReport(calendar, date)
    date.setDate(date.getDate() + 1);
    reports.push(report);
  }

  return reports;
}

function dailyReport(calendar, day) {
 var events = calendar.getEventsForDay(day);

  let totalHours = 0;
  let workHours = 0;
  let meetingHours = 0;

 events.forEach(event => {
   const start = event.getStartTime();
   const end = event.getEndTime();

   const hours = (end - start)/3600000; //hours

   totalHours += hours;
    if(event.getTitle().startsWith('reunião:')) {
      meetingHours += hours;
    } else {
      workHours += hours;
    }

   Logger.log(event.getTitle() + ', hours: ' + hours );  
 })
 
 Logger.log('dailyReport day: ' + day + ' totalHours: ' + totalHours);  
return {totalHours, workHours, meetingHours}
}
