const SHEET_NAME = 'Estimate Requests';
const NOTIFICATION_EMAIL = 'info@superiorconstructiongroup.org'; // Optional: set to '' to disable email notifications.

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Full Name', 'Phone', 'Property Address', 'Service Needed', 'Project Details']);
    }

    const p = e.parameter || {};
    const row = [
      new Date(),
      p.name || '',
      p.phone || '',
      p.property_address || '',
      p.service || '',
      p.project_details || ''
    ];

    sheet.appendRow(row);

    if (NOTIFICATION_EMAIL) {
      const subject = 'New Free Estimate Request - Superior Construction Group';
      const body = [
        'A new free estimate request was submitted.',
        '',
        'Full Name: ' + (p.name || ''),
        'Phone: ' + (p.phone || ''),
        'Property Address: ' + (p.property_address || ''),
        'Service Needed: ' + (p.service || ''),
        'Project Details: ' + (p.project_details || '')
      ].join('\n');
      MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
    }

    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: String(error)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
