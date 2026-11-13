/**
 * OMNIS — Google Sheets order backend (Google Apps Script web app).
 *
 * Setup: see docs/google-sheets-orders.md
 *  1. Create a Google Sheet → Extensions → Apps Script → paste this file.
 *  2. Project Settings → Script properties → add  SECRET = <long random string>
 *     (the same value as ORDERS_SHEET_SECRET on the website).
 *  3. Deploy → New deployment → Web app → Execute as: Me · Who has access: Anyone.
 *  4. Copy the /exec URL into ORDERS_SHEET_URL on the website.
 *
 * The website talks to this script with POST {secret, action, ...} and gets JSON back.
 * Actions: list · get · create · updateStatus · delete · ping
 */

var SHEET_NAME = "Commandes";
var HEADERS = [
  "id", "createdAt", "status", "fullName", "phone", "governorate", "city", "address", "notes",
  "products", "quantity", "subtotal", "shippingFee", "total", "paymentMethod",
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "itemsJson",
];
var STATUSES = ["Nouveau", "En préparation", "Expédié", "Livré", "Annulé"];

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: "bad_json" });
  }
  var secret = PropertiesService.getScriptProperties().getProperty("SECRET");
  if (!secret || body.secret !== secret) return json_({ ok: false, error: "unauthorized" });

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = sheet_();
    switch (body.action) {
      case "ping":
        return json_({ ok: true });
      case "list":
        return json_({ ok: true, orders: readAll_(sheet) });
      case "get":
        return json_({ ok: true, order: find_(sheet, body.id, body.phone) });
      case "create":
        return json_(create_(sheet, body.order));
      case "updateStatus":
        return json_(updateStatus_(sheet, body.id, body.status));
      case "delete":
        return json_(remove_(sheet, body.id));
      default:
        return json_({ ok: false, error: "unknown_action" });
    }
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("OMNIS orders endpoint is running.");
}

// ---------- helpers ----------

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#FFC83D");
    // Keep ids and phone numbers as plain text (no number auto-formatting).
    sheet.getRange("A:A").setNumberFormat("@");
    sheet.getRange("E:E").setNumberFormat("@");
    // Status dropdown.
    var rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
    sheet.getRange(2, 3, sheet.getMaxRows() - 1, 1).setDataValidation(rule);
  }
  return sheet;
}

function readAll_(sheet) {
  var last = sheet.getLastRow();
  if (last < 2) return [];
  var values = sheet.getRange(2, 1, last - 1, HEADERS.length).getValues();
  var orders = values.filter(function (r) { return r[0]; }).map(rowToOrder_);
  orders.sort(function (a, b) { return a.createdAt < b.createdAt ? 1 : -1; }); // newest first
  return orders;
}

function rowToOrder_(r) {
  var o = {};
  HEADERS.forEach(function (h, i) { o[h] = r[i]; });
  var items = [];
  try { items = JSON.parse(o.itemsJson || "[]"); } catch (e) {}
  var utm = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(function (k) {
    if (o[k]) utm[k] = String(o[k]);
  });
  return {
    id: String(o.id),
    createdAt: o.createdAt instanceof Date ? o.createdAt.toISOString() : String(o.createdAt),
    status: String(o.status || "Nouveau"),
    fullName: String(o.fullName),
    phone: String(o.phone),
    governorate: String(o.governorate),
    city: String(o.city),
    address: String(o.address),
    notes: String(o.notes),
    paymentMethod: String(o.paymentMethod),
    items: items,
    subtotal: Number(o.subtotal),
    shippingFee: Number(o.shippingFee),
    total: Number(o.total),
    utm: Object.keys(utm).length ? utm : undefined,
  };
}

function rowIndex_(sheet, id) {
  var last = sheet.getLastRow();
  if (last < 2 || !id) return -1;
  var ids = sheet.getRange(2, 1, last - 1, 1).getValues();
  var needle = String(id).toLowerCase();
  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]).toLowerCase() === needle) return i + 2;
  }
  return -1;
}

function find_(sheet, id, phone) {
  var orders = readAll_(sheet);
  for (var i = 0; i < orders.length; i++) {
    var o = orders[i];
    if ((id && o.id.toLowerCase() === String(id).toLowerCase()) || (phone && o.phone === phone)) return o;
  }
  return null;
}

function create_(sheet, o) {
  if (!o || !o.id) return { ok: false, error: "missing_order" };
  if (rowIndex_(sheet, o.id) !== -1) return { ok: false, error: "duplicate" };
  var utm = o.utm || {};
  var row = [
    o.id, o.createdAt, o.status || "Nouveau", o.fullName, o.phone, o.governorate, o.city, o.address, o.notes || "",
    (o.items || []).map(function (i) { return i.quantity + "× " + i.name; }).join(", "),
    (o.items || []).reduce(function (s, i) { return s + i.quantity; }, 0),
    o.subtotal, o.shippingFee, o.total, o.paymentMethod,
    utm.utm_source || "", utm.utm_medium || "", utm.utm_campaign || "", utm.utm_content || "", utm.utm_term || "",
    JSON.stringify(o.items || []),
  ];
  sheet.appendRow(row);
  return { ok: true };
}

function updateStatus_(sheet, id, status) {
  if (STATUSES.indexOf(status) === -1) return { ok: false, error: "bad_status" };
  var row = rowIndex_(sheet, id);
  if (row === -1) return { ok: false, error: "not_found" };
  sheet.getRange(row, 3).setValue(status);
  return { ok: true, order: rowToOrder_(sheet.getRange(row, 1, 1, HEADERS.length).getValues()[0]) };
}

function remove_(sheet, id) {
  var row = rowIndex_(sheet, id);
  if (row === -1) return { ok: false, error: "not_found" };
  sheet.deleteRow(row);
  return { ok: true };
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
