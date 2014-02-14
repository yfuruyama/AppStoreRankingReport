/*******************************************************/
/* AppStore Ranking Report Tool for Google Spreadsheet */
/*******************************************************/

// RSS feed url for AppStore
// You can generate feed url at https://rss.itunes.apple.com/jp/?urlDesc=%2Fgenerator
// ATTENSION: Replace the end of feed url with '/json'
var APPSTORE_FEED_URL = 'https://itunes.apple.com/jp/rss/topfreeapplications/limit=300/json'

// App Name
var APP_NAME = 'Twitter';

// Interval between reporting(minutes)
var REPORT_INTERVAL = 60;


////////////////////////////////////////////////////////////////////////////////////////////
function report() {
  var feed = getRankingFeed();
  if (!feed) return -1;

  var entry = feed['feed']['entry'];
  var rank = searchAppRank(APP_NAME, entry);

  var now = new Date();
  Logger.log('[%s]Rank: %s', now, rank);

  writeRankToSheet(now, rank);

  return 0;
}

/* AppStore Ranking */
function getRankingFeed(limit) {
  var response = UrlFetchApp.fetch(APPSTORE_FEED_URL);
  if (response.getResponseCode() !== 200) return null;

  var content = response.getContentText();
  return JSON.parse(content);
}

function searchAppRank(app, entries) {
  for (var i = 0, l = entries.length; i < l; i++) {
    var entry = entries[i];
    var name = entry['im:name']['label'];
    if (name === app) {
      return i + 1;
    }
  }
  // outside ranking
  return 300;
}

/* Spreadsheet */
function writeRankToSheet(date, rank) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var lastRow = sheet.getLastRow() + 1;

  write(sheet, lastRow, 1, date);
  write(sheet, lastRow, 2, rank);
}

function write(sheet, row, column, data) {
  var range = sheet.getRange(row, column);
  range.setValue(data);
}

/* Trigger Settings */
function createTimeTrigger() {
  var reportTrigger = ScriptApp.newTrigger('report')
      .timeBased()
      .everyMinutes(REPORT_INTERVAL)
      .create();
  
  Logger.log('Unique ID of Trigger: %s', reportTrigger.getUniqueId());
}
