function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
    .setTitle("اختبارات الأجزاء")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// جلب بيانات الصور مع اسم الموضع ورقم الصفحة
function getAllImageData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("الصور");
  if (!sheet) return {};
  const data = sheet.getRange(2,1,sheet.getLastRow()-1,4).getValues(); // 4 أعمدة: الرقم المدمج - الرابط - اسم الموضع - رقم الصفحة
  let result = {};
  data.forEach(row => {
    const key = String(row[0]).padStart(4,'0'); // مثال: 0101
    const url = row[1];
    const name = row[2]; // اسم الموضع
    const page = row[3]; // رقم الصفحة
    if(key && url) result[key] = { url, name, page };
  });
  return result;
}

// تسجيل دخول (دائمًا يضيف صف جديد حتى من نفس الجهاز)
function logUserEnter() {
  const sheet = SpreadsheetApp.openById("1zQCT0JjhCKJFvliWbwPXc_vFpuVvPbtqEgl8wd253T0").getSheetByName("usersCounter");
  const time = new Date();
  sheet.appendRow(["زائر", time, "", ""]);
  return sheet.getLastRow(); // رقم الصف الجديد
}

// تسجيل خروج
function logUserExit(rowNumber) {
  const sheet = SpreadsheetApp.openById("1zQCT0JjhCKJFvliWbwPXc_vFpuVvPbtqEgl8wd253T0").getSheetByName("usersCounter");
  const exitTime = new Date();
  const entryTime = sheet.getRange(rowNumber, 2).getValue();
  const durationSec = (exitTime - new Date(entryTime)) / 1000;
  const minutes = Math.floor(durationSec / 60);
  const seconds = Math.floor(durationSec % 60);
  const durationFormatted = minutes + " دقيقة " + seconds + " ثانية";
  sheet.getRange(rowNumber, 3).setValue(exitTime);
  sheet.getRange(rowNumber, 4).setValue(durationFormatted);
}

// إرجاع عدد الزوار الكلي
function getUsersCount() {
  const sheet = SpreadsheetApp.openById("1zQCT0JjhCKJFvliWbwPXc_vFpuVvPbtqEgl8wd253T0").getSheetByName("usersCounter");
  return sheet.getLastRow() - 1;
}
