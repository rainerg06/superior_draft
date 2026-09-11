SUPERIOR CONSTRUCTION GROUP - STATIC WEBSITE + GOOGLE SHEETS

This version removes the PHP/MySQL admin dashboard. The website can be deployed on free static hosting (such as Netlify, GitHub Pages, or Cloudflare Pages) while estimate requests are stored in Google Sheets.

WHAT CHANGED
- Removed PHP/MySQL request handling and admin dashboard.
- Free Estimate modal now asks for Property Address instead of Email.
- Requests are sent to Google Sheets through Google Apps Script.
- Optional email notification is included in the Apps Script.

SET UP GOOGLE SHEETS
1. Open Google Sheets and create a new spreadsheet.
2. Name it something like: Superior Construction Group - Estimate Requests.
3. Open Extensions > Apps Script.
4. Delete the default code and paste the code from:
   google-apps-script/Code.gs
5. Make sure the Apps Script is attached to the spreadsheet you created.
6. In Code.gs, check NOTIFICATION_EMAIL. Leave it as the company email if you want an email alert for every request, or change it to '' to disable alerts.
7. Click Deploy > New deployment.
8. Select Web app.
9. Set Execute as: Me.
10. Set Who has access: Anyone.
11. Click Deploy and authorize the script when Google asks.
12. Copy the Web app URL. It normally ends with /exec.

CONNECT THE WEBSITE TO THE SHEET
1. Open js/script.js.
2. Find:
   const GOOGLE_SCRIPT_URL='PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
3. Replace the placeholder with your Web app URL, for example:
   const GOOGLE_SCRIPT_URL='https://script.google.com/macros/s/YOUR_ID/exec';
4. Save the file.
5. Upload the website to your static hosting service.

IMPORTANT
- Do not put Google account passwords or private API keys in the website files.
- The Google Apps Script Web App URL is intended to be public because the website needs to send form submissions to it.
- Keep the Google Sheet itself private.
- The first test submission may require Google authorization/deployment to be completed correctly.

WEBSITE HOSTING
You still need a place for the HTML/CSS/JS files to be served online, but you do NOT need traditional PHP/MySQL hosting for this version. A free static host can be used and your existing domain can be connected to it.

FORM FIELDS
- Full Name
- Phone
- Property Address
- Service Needed
- Project Details

OPTIONAL EMAIL ALERTS
If NOTIFICATION_EMAIL is set to the company email, Google Apps Script will also send a notification email when a new request arrives. The Google Sheet remains the main request list.


SERVICE DETAILS UPDATE
The Services section now uses animated zoom-in detail cards for all 10 services. Each Learn More button opens the matching service information, with a Get a Free Estimate button. The layout is responsive for phones.


Testimonials: Added static Google review cards using the supplied review screenshots. Reviewer names are displayed using first names only. The View All Reviews on Google button uses the supplied Google share link.
