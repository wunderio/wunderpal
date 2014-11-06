/**
 * Request handler for a get request to this scripts URL.
 * @see  For more info read https://developers.google.com/apps-script/guides/content
 */
function doGet(request) {
  // Use the Spreadsheet API to open a given spreadsheet and read the rows of the first sheet
  var datastore = SpreadsheetApp.openById("1ktfyqSrFXYwlYOV4qvesAfZjccfrex_ZIxEqY67HRd0");
  SpreadsheetApp.setActiveSpreadsheet(datastore);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.setActiveSheet(ss.getSheets()[0]);
  var values = readRows(sheet);
  var result = {
    datastore: values
  };
  // return the object as JSON content
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Post request handler for a post request to this scripts URL.
 * @see  For more info read https://developers.google.com/apps-script/guides/content
 */
function doPost(request) {


}

/**
 * HELPER: Retrieves all the rows in the active spreadsheet that contain data and logs the
 * values for each row.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function readRows(sheet) {
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  return values;
};
