// utils/exportExcel.js
import * as XLSX from 'xlsx';

/**
 * Export data to Excel file
 * @param {Array} data - Data array of objects to be exported
 * @param {string} fileName - Name of the output Excel file
 */
export const exportToExcel = (data, fileName = 'export.xlsx') => {
  if (!data || !data.length) {
    console.error('No data available to export');
    return;
  }

  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Write the workbook and trigger download
  XLSX.writeFile(workbook, fileName);
};
