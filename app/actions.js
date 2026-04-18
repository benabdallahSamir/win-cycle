"use server";

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

/**
 * Server Action to submit form data to Google Sheets
 * @param {Object} formData 
 */
export async function submitToGoogleSheets(formData) {
  try {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!email || !privateKey || !sheetId) {
      console.error("Missing Google Sheets environment variables");
      return { success: false, error: "فشل في تسجيل البيانات: إعدادات الخادم غير مكتملة." };
    }

    // Clean private key: replace literal \n with newlines and remove extra quotes if they exist
    privateKey = privateKey.trim().replace(/\\n/g, "\n");
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.substring(1, privateKey.length - 1).trim();
    }

    // Initialize auth
    const serviceAccountAuth = new JWT({
      email: email,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);

    // Load document info
    await doc.loadInfo();
    
    // Get the first sheet
    const sheet = doc.sheetsByIndex[0];

    // Initialize headers if they don't exist
    try {
      await sheet.loadHeaderRow();
    } catch (e) {
      // If error, it means sheet is empty, so we set the headers
      await sheet.setHeaderRow(["ID", "Name", "Wilaya", "Phone", "Email", "Gender", "Birth Date", "Registered At"]);
    }

    // Get all rows to check for uniqueness
    const rows = await sheet.getRows();
    
    // Check if name or email already exists
    const isDuplicate = rows.find(row => 
      row.get("Name") === formData.fullName || 
      row.get("Email") === formData.email
    );

    if (isDuplicate) {
      const field = isDuplicate.get("Name") === formData.fullName ? "الاسم" : "البريد الإلكتروني";
      return { success: false, error: `عذراً، هذا ${field} مسجل لدينا مسبقاً.` };
    }

    // Append row
    await sheet.addRow({
      "ID": Date.now(),
      "Name": formData.fullName,
      "Wilaya": formData.wilaya,
      "Phone": formData.phone,
      "Email": formData.email,
      "Gender": formData.gender,
      "Birth Date": formData.birthDate,
      "Registered At": new Date().toLocaleString("ar-DZ")
    });

    return { success: true };
  } catch (error) {
    console.error("Google Sheets Error:", error);
    return { success: false, error: "حدث خطأ أثناء الاتصال بـ Google Sheets. يرجى المحاولة لاحقاً." };
  }
}
