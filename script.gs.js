/**
* Send email report from calendar events
*
* Uses recipients in another doc, please dont format the doc,
* use just one simple line with recipientes separated by commas (,)
* Ex: asdf@asdf.com, example@example.com
*
* 20131030 - 1.0 get events and send email
* 20131031 - 1.0.1 totalDuration
* 20131101 - 1.1 recipient in another doc
* 20131103 - 1.1.1 dont send empty emails, date on subject
*
*/

// TODO:
// totalDuration ✔
// weekly report
// monthly report
// spreadsheet
// recipient in another place  ✔
// github
// i18n

// MAYBE:
// html email

var config = {
  docId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
};
var today = new Date();
var email = Session.getActiveUser().getEmail();
var calendar = getCalendar();
var doc = DocumentApp.openById(config.docId);
var recipient = doc.getBody().getText();

function test() {}

function getYesterday() {
  return new Date(today.getYear(), today.getMonth(), today.getDate() - 1);
}

function getCalendar() {
  return CalendarApp.getCalendarById(email.toString());
}

function getEvents(date) {
  return calendar.getEventsForDay(date);
}

function report(events, date) {
  var event = {};
  var header = '\n';
  var body = '\n';
  var footer = '\n';
  var totalDuration = 0;
  var reportDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getYear();

  header += 'Relatório de atividades do dia ' + reportDate ;
  header += '\n';
  header += 'Número de tarefas realizadas: ' + events.length;
  header += '\n';

  for (var i = 0; i < events.length; i++ ) {
    event.start = events[i].getStartTime();
    event.inicio = event.start.getHours() + ':' + event.start.getMinutes();
    if (event.start.getMinutes() < 10) { event.inicio += '0'; }
    event.end = events[i].getEndTime();
    event.fim = event.end.getHours() + ':' + event.end.getMinutes();
    if (event.end.getMinutes() < 10) { event.fim += '0'; }
    event.duration = ((events[i].getEndTime() - events[i].getStartTime())/3600000);
    totalDuration += event.duration;

    body += events[i].getTitle();
    body += '\n';
    body += '  início: ' + event.inicio;
    body += '\n';
    body += '  fim: ' + event.fim;
    body += '\n';
    body += '  duração: ' + event.duration + 'h';
    body += '\n';
    body += '\n';
  }

  header += 'Total de horas: ' + totalDuration;
  header += '\n';

  footer += 'Total de horas: ' + totalDuration;
  footer += '\n';

  if ( events.length === 0 ) {
    Logger.log('no events for ' + reportDate);
    return false;
  }

  //Logger.log(header + body + footer);
  GmailApp.sendEmail(recipient, 'Relatório de atividades do dia ' + reportDate, header + body + footer);
}

function yesterdayReport() {
  var date = getYesterday();
  var events = getEvents(date);
  report(events, date);
}

function todayReport() {
  var date = new Date();
  var events = getEvents(date);
  report(events, date);
}
