/**
 * Krishbyl Broadband — website form handler (Google Apps Script)
 * ---------------------------------------------------------------
 * What it does:
 *   • Receives form submissions from new-connection.html & contact.html
 *   • Appends each submission as a row in your Google Sheet
 *     (one tab per form type: "New Connection", "Contact")
 *   • Emails you a notification for every submission
 *
 * HOW TO SET UP (one time, ~5 minutes):
 *   1. Go to https://sheets.google.com and create a new blank Sheet.
 *      Name it e.g. "Krishbyl Leads".
 *   2. In that Sheet, click  Extensions → Apps Script.
 *   3. Delete any sample code, paste THIS entire file, and Save.
 *   4. Click  Deploy → New deployment.
 *        - Type (gear icon):  Web app
 *        - Description:       Krishbyl form handler
 *        - Execute as:        Me (your account)
 *        - Who has access:    Anyone
 *      Click Deploy, then "Authorize access" and allow the permissions.
 *   5. Copy the "Web app URL" (ends with /exec).
 *   6. Paste that URL into assets/js/main.js  →  FORM_ENDPOINT.
 *   7. Re-deploy the website (git push). Done — test the form!
 *
 * To change where emails go, edit OWNER_EMAIL below.
 */

var OWNER_EMAIL = "krishbylbroadband@gmail.com";

// Columns captured (in this order) for every submission.
var FIELDS = ["name", "phone", "email", "address", "plan", "time", "subject", "msg", "page"];

function doPost(e) {
  try {
    var params = (e && e.parameter) ? e.parameter : {};

    // Ignore bots that filled the hidden honeypot field.
    if (params.company) {
      return _json({ ok: true, skipped: "honeypot" });
    }

    var type = (params.form_type || "Enquiry").toString().slice(0, 50);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(type) || ss.insertSheet(type);

    // Write a header row the first time this tab is used.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp"].concat(FIELDS));
      sheet.setFrozenRows(1);
    }

    var now = new Date();
    var row = [now].concat(FIELDS.map(function (f) { return params[f] || ""; }));
    sheet.appendRow(row);

    _notify(type, params, now);
    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

function _notify(type, params, when) {
  var subject = "New " + type + " request — Krishbyl Broadband";
  var lines = ["You received a new " + type + " request from the website:", ""];
  FIELDS.forEach(function (f) {
    if (params[f]) lines.push(f.toUpperCase() + ": " + params[f]);
  });
  lines.push("", "Received: " + when);

  var opts = { name: "Krishbyl Website" };
  // Let you reply straight to the customer if they left an email.
  if (params.email && /\S+@\S+\.\S+/.test(params.email)) opts.replyTo = params.email;

  MailApp.sendEmail(OWNER_EMAIL, subject, lines.join("\n"), opts);
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: lets you open the Web app URL in a browser to confirm it's live.
function doGet() {
  return ContentService.createTextOutput("Krishbyl Broadband form handler is running.");
}
