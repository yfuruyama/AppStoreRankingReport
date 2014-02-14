AppStoreRankingReport
======================
This tool reports AppStore ranking of an app to Google Spreadsheet periodically.

![screenshot](https://raw.github.com/addsict/AppStoreRankingReport/master/img/appstorerank.png)

How to use
----------
1. Create a new Spreadsheet on your Google Drive.
1. Open the Script Editor and past this script.
1. Edit `APPSTORE_FEED_URL`, `APP_NAME` and `REPORT_INTERVAL` variables for your needs.
1. Create a trigger by running `createTimeTrigger` function once on the script editor.
1. Run `report` function once in order to allow script authorization.
